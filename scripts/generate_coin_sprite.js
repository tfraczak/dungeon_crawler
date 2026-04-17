/*
 * Procedurally generates the gold-coin sprite sheet.
 *
 * Output: src/assets/images/coin/coin.png  (128 x 16, 8 frames of 16x16)
 *
 * Eight-frame spin around the vertical axis. Width per frame follows
 * |cos(theta)| for theta in {0, 45, 90, 135, 180, 225, 270, 315} so the coin
 * reads as a continuous rotation: front -> tilt -> edge -> back -> tilt ->
 * edge -> front. A large "C" is stamped on the front-facing frames only.
 *
 * Zero-dependency: uses Node's built-in `zlib` + `Buffer` to hand-encode the
 * PNG. Run with:  node scripts/generate_coin_sprite.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const FRAME_W = 16;
const FRAME_H = 16;
const FRAME_COUNT = 8;
const SHEET_W = FRAME_W * FRAME_COUNT;
const SHEET_H = FRAME_H;

// ---------------------------------------------------------------------------
// Palette — classic gold-coin tones. "." is transparent; other keys map to
// the single-char glyphs used by the shading / letter overlays below.
// ---------------------------------------------------------------------------
const PALETTE = {
  ".": [0, 0, 0, 0],
  O: [92, 54, 14, 255],      // outline: deep brown-gold
  d: [178, 116, 24, 255],    // shadow gold
  y: [244, 196, 48, 255],    // mid gold (main body)
  Y: [255, 224, 112, 255],   // highlight gold
  W: [255, 250, 210, 255],   // shine (near-white warm)
  // The "C" letter reads as gently embossed rather than ink-stamped: a
  // medium gold a shade darker than the body so it's legible without
  // feeling like a black decal, then an extra `Y` highlight pixel is
  // stamped at the upper-left corner of the letter per-frame to suggest a
  // raised edge catching the upper-left light.
  c: [168, 104, 22, 255],    // "C" letter (medium dark gold)
};

// ---------------------------------------------------------------------------
// Frame silhouettes.
//
// Each shape is an array of [minX, maxX] pairs covering rows y=1..14 (y=0 and
// y=15 are always transparent padding). Widths follow |cos(theta)| for a
// continuous spin; the three unique shapes (full, tilt, edge) are reused at
// symmetric angles.
// ---------------------------------------------------------------------------

// r_x ≈ 7, full face. 14-diameter circle centered on (7.5, 7.5).
const FULL = [
  [5, 10], [4, 11], [3, 12], [2, 13],
  [1, 14], [1, 14], [1, 14], [1, 14],
  [1, 14], [1, 14],
  [2, 13], [3, 12], [4, 11], [5, 10],
];

// r_x ≈ 5, 45°/315° tilt. Ellipse with the same vertical radius.
const TILT = [
  [6, 9],  [5, 10], [4, 11], [4, 11],
  [3, 12], [3, 12], [3, 12], [3, 12],
  [3, 12], [3, 12],
  [4, 11], [4, 11], [5, 10], [6, 9],
];

// r_x ≈ 1 — edge-on sliver. Two pixels wide down the middle.
const EDGE = [
  [7, 8], [7, 8], [7, 8], [7, 8],
  [7, 8], [7, 8], [7, 8], [7, 8],
  [7, 8], [7, 8],
  [7, 8], [7, 8], [7, 8], [7, 8],
];

// ---------------------------------------------------------------------------
// Shine burst overlays. Each list augments the base shading with bright
// pixels timed to the spin so the coin pulses visibly through the loop.
//
// The burst is anchored at the existing upper-left shine spot — (4,4) on
// the full face, (5,4) on the tilted face. On f0 the arms of the `+` stamp
// over the outline for a "breaking out of the coin" flash; on f1/f7 only
// the vertical arm survives as a shoulder glimmer; f4 gets an independent
// center-of-back sparkle.
// ---------------------------------------------------------------------------
const BURST_FULL_PEAK = [        // f0
  { x: 4, y: 2, key: "W" }, // top arm (overwrites outline)
  { x: 4, y: 6, key: "W" }, // bottom arm
  { x: 2, y: 4, key: "W" }, // left arm (overwrites outline)
  { x: 6, y: 4, key: "W" }, // right arm
  { x: 3, y: 3, key: "Y" }, // diagonal glint
];
const BURST_TILT_FADING = [      // f1
  { x: 5, y: 2, key: "W" },
  { x: 5, y: 6, key: "W" },
];
const BURST_TILT_RISING = [      // f7
  { x: 5, y: 2, key: "W" }, // single top-arm glimmer as burst builds
];
const BURST_FULL_BACK = [        // f4 — small "+" sparkle at center of back
  { x: 8, y: 7, key: "Y" },
  { x: 7, y: 8, key: "Y" },
  { x: 8, y: 8, key: "W" },
  { x: 9, y: 8, key: "Y" },
  { x: 8, y: 9, key: "Y" },
];

// One full rotation over 8 frames.
const FRAMES = [
  { shape: FULL, face: "front", burst: BURST_FULL_PEAK   }, // f0: 0°   full front (PEAK)
  { shape: TILT, face: "front", burst: BURST_TILT_FADING }, // f1: 45°  front tilted (fading)
  { shape: EDGE, face: "edge"                             }, // f2: 90°  edge
  { shape: TILT, face: "back"                             }, // f3: 135° back tilted
  { shape: FULL, face: "back",  burst: BURST_FULL_BACK    }, // f4: 180° full back (sparkle)
  { shape: TILT, face: "back"                             }, // f5: 225° back tilted
  { shape: EDGE, face: "edge"                             }, // f6: 270° edge
  { shape: TILT, face: "front", burst: BURST_TILT_RISING  }, // f7: 315° front tilted (rising)
];

// ---------------------------------------------------------------------------
// Frame construction. Build a 16x16 RGBA frame one layer at a time so each
// pass has clear intent and can be tweaked in isolation.
// ---------------------------------------------------------------------------
function buildFrame(frame) {
  const { shape, face } = frame;
  const out = new Uint8ClampedArray(FRAME_W * FRAME_H * 4);

  // 1) Rasterize the shape into a boolean mask (true = inside the coin).
  const mask = Array.from({ length: FRAME_H }, () => new Array(FRAME_W).fill(false));
  for (let i = 0; i < shape.length; i++) {
    const y = i + 1;
    const [minX, maxX] = shape[i];
    for (let x = minX; x <= maxX; x++) mask[y][x] = true;
  }

  const inMask = (x, y) => y >= 0 && y < FRAME_H && x >= 0 && x < FRAME_W && mask[y][x];

  const setPx = (x, y, key) => {
    if (x < 0 || x >= FRAME_W || y < 0 || y >= FRAME_H) return;
    if (!PALETTE[key]) return;
    const [r, g, b, a] = PALETTE[key];
    const i = (y * FRAME_W + x) * 4;
    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
    out[i + 3] = a;
  };

  // setPxIn only paints if the target pixel is inside the shape — used for
  // highlight/shadow overlays so they can't leak outside the silhouette.
  const setPxIn = (x, y, key) => { if (inMask(x, y)) setPx(x, y, key); };

  // Edge frames are special-cased below. For everything else, paint the base
  // body: any shape pixel with a non-shape neighbor becomes outline, the rest
  // become mid-gold interior.
  if (face !== "edge") {
    for (let y = 0; y < FRAME_H; y++) {
      for (let x = 0; x < FRAME_W; x++) {
        if (!mask[y][x]) continue;
        const isBorder = !inMask(x - 1, y) || !inMask(x + 1, y)
          || !inMask(x, y - 1) || !inMask(x, y + 1);
        setPx(x, y, isBorder ? "O" : "y");
      }
    }
  } else {
    // Edge sliver: dark caps at top/bottom, gold body between, one bright
    // shine pixel near the top so it still reads as a reflective coin.
    for (let y = 2; y <= 13; y++) {
      setPx(7, y, "y");
      setPx(8, y, "y");
    }
    setPx(7, 1, "O");  setPx(8, 1, "O");
    setPx(7, 14, "O"); setPx(8, 14, "O");
    setPx(7, 4, "W");
    setPx(7, 5, "Y");
    setPx(8, 11, "d");
    return out;
  }

  // 2) Shading. Upper-left highlight cluster plus a lower-right shadow
  // crescent to give the coin a metallic, raised feel. Positions are tuned
  // per shape so the shine stays anchored on the same part of the coin as
  // it rotates.
  if (shape === FULL) {
    setPxIn(4, 3, "Y"); setPxIn(5, 3, "Y");
    setPxIn(3, 4, "Y"); setPxIn(4, 4, "W"); setPxIn(5, 4, "Y");
    setPxIn(3, 5, "Y");
    setPxIn(2, 6, "Y");

    setPxIn(11, 10, "d"); setPxIn(12, 10, "d");
    setPxIn(11, 11, "d"); setPxIn(12, 11, "d");
    setPxIn(10, 12, "d"); setPxIn(11, 12, "d");
    setPxIn(9,  13, "d"); setPxIn(10, 13, "d");
  } else {
    setPxIn(5, 3, "Y"); setPxIn(6, 3, "Y");
    setPxIn(4, 4, "Y"); setPxIn(5, 4, "W"); setPxIn(6, 4, "Y");
    setPxIn(4, 5, "Y");

    setPxIn(10, 10, "d"); setPxIn(11, 10, "d");
    setPxIn(10, 11, "d"); setPxIn(11, 11, "d");
    setPxIn(9,  12, "d"); setPxIn(10, 12, "d");
    setPxIn(9,  13, "d");
  }

  // 3) Letter "C" on front-facing frames. Wider on the full face, narrower
  // on the tilted one so it appears to foreshorten with the spin. A single
  // `Y` pixel is stamped at the outer top-left corner of the letter to
  // suggest the raised edge of the engraving catches the upper-left light
  // (the embossed-metal look).
  if (face === "front") {
    if (shape === FULL) {
      // 4-wide C at x=5..8, y=5..9.
      setPx(6, 5, "c"); setPx(7, 5, "c"); setPx(8, 5, "c");
      setPx(5, 6, "c");
      setPx(5, 7, "c");
      setPx(5, 8, "c");
      setPx(6, 9, "c"); setPx(7, 9, "c"); setPx(8, 9, "c");
      setPxIn(5, 5, "Y"); // emboss highlight: raised corner of the C
    } else {
      // 3-wide C at x=6..8, y=5..9 (foreshortened for the tilted view).
      setPx(7, 5, "c"); setPx(8, 5, "c");
      setPx(6, 6, "c");
      setPx(6, 7, "c");
      setPx(6, 8, "c");
      setPx(7, 9, "c"); setPx(8, 9, "c");
      setPxIn(6, 5, "Y"); // emboss highlight
    }
  }

  // 4) Shine burst overlay. A four-armed `+` of W pixels pulses through the
  // rotation — fully extended on the front face (f0), trimmed to a single
  // arm on the shoulder frames (f1, f7), silent on the back/back-tilt, and
  // re-emerging as a small centered sparkle on the full back (f4). This
  // adds the "freshly minted gold" flash timed to each spin cycle.
  for (const { x, y, key } of frame.burst || []) setPx(x, y, key);

  return out;
}

// ---------------------------------------------------------------------------
// Assemble the 8 frames into a single horizontal sheet.
// ---------------------------------------------------------------------------
function buildSheet() {
  const sheet = Buffer.alloc(SHEET_W * SHEET_H * 4);
  for (let f = 0; f < FRAME_COUNT; f++) {
    const frame = buildFrame(FRAMES[f]);
    for (let y = 0; y < FRAME_H; y++) {
      const src = y * FRAME_W * 4;
      const dst = (y * SHEET_W + f * FRAME_W) * 4;
      Buffer.from(frame.buffer, frame.byteOffset + src, FRAME_W * 4)
        .copy(sheet, dst);
    }
  }
  return sheet;
}

// ---------------------------------------------------------------------------
// Minimal PNG encoder (RGBA, no filtering, zlib-deflated IDAT).
// ---------------------------------------------------------------------------
const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePNG(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowLen = width * 4;
  const raw = Buffer.alloc((rowLen + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (rowLen + 1)] = 0;
    rgba.copy(raw, y * (rowLen + 1) + 1, y * rowLen, (y + 1) * rowLen);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });

  return Buffer.concat([
    PNG_SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function main() {
  const sheet = buildSheet();
  const png = encodePNG(SHEET_W, SHEET_H, sheet);
  const outDir = path.join(__dirname, "..", "src", "assets", "images", "coin");
  const outPath = path.join(outDir, "coin.png");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, png);
  // eslint-disable-next-line no-console
  console.log(`wrote ${outPath}  (${SHEET_W}x${SHEET_H}, ${FRAME_COUNT} frames of ${FRAME_W}x${FRAME_H})`);
}

main();
