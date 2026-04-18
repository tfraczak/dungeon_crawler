/*
 * Procedurally generates the ladder sprite used by the win condition.
 *
 * Output: src/assets/images/ladder/ladder.png  (48 x 64, single frame)
 *
 * The ladder always spawns flush against the top wall of a room, so the
 * sprite is just the wooden ladder itself -- no painted "exit hole" -- and
 * the room's wall texture above provides the visual implication that the
 * rails continue upward into a passage. A subtle alpha-blended drop shadow
 * sits below the rails to ground the prop on the floor tiles.
 *
 * Zero-dependency: uses Node's built-in `zlib` + `Buffer` to hand-encode the
 * PNG. Run with:  node scripts/generate_ladder_sprite.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const FRAME_W = 48;
const FRAME_H = 64;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
// "." is transparent. Wood tones are warm / saturated so the ladder reads as
// the win prop at a glance against the dim cave floor; the "X" / "S" entries
// are partially-transparent black for the soft drop shadow under the rails.
const PALETTE = {
  ".": [0, 0, 0, 0],
  O: [54, 30, 14, 255],         // wood outline (very dark brown)
  w: [126, 78, 36, 255],        // wood mid
  W: [184, 124, 60, 255],       // wood highlight
  s: [86, 50, 22, 255],         // wood shadow
  n: [38, 22, 10, 255],         // bolt / nail accent
  H: [232, 188, 120, 255],      // brightest wood highlight
  S: [0, 0, 0, 130],            // drop shadow core (semi-transparent)
  X: [0, 0, 0, 70],             // drop shadow halo (very faint)
};

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------
// Two vertical rails span (almost) the full sprite height with four evenly-
// spaced rungs. The rails run all the way up to row 0 so that, when the
// ladder sits flush against the top wall of a room, the wood reads as
// continuing up into a passage. A soft alpha-blended drop shadow at the
// bottom of the sprite anchors the ladder to the floor tile.
const RAIL_L = { x0: 8, x1: 13, y0: 0, y1: 55 };
const RAIL_R = { x0: 34, x1: 39, y0: 0, y1: 55 };
const RUNGS = [
  { y0: 4,  y1: 8  },
  { y0: 17, y1: 21 },
  { y0: 30, y1: 34 },
  { y0: 43, y1: 47 },
];
const SHADOW_Y = 57;

// ---------------------------------------------------------------------------
// Frame builder
// ---------------------------------------------------------------------------
function buildFrame() {
  const out = new Uint8ClampedArray(FRAME_W * FRAME_H * 4);

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

  const fillRect = (x0, x1, y0, y1, key) => {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) setPx(x, y, key);
    }
  };

  // 1) Rails. Each rail is a 6-wide column with outline columns on each side,
  // a shadow column on the right, mid-tone interior, and a highlight column
  // on the left. Rails extend the full sprite height up to row 0 so the
  // wood reads as continuing up into the wall the ladder is leaning on.
  const drawRail = (rail) => {
    for (let y = rail.y0; y <= rail.y1; y++) {
      setPx(rail.x0,     y, "O");
      setPx(rail.x0 + 1, y, "W");
      setPx(rail.x0 + 2, y, "w");
      setPx(rail.x0 + 3, y, "w");
      setPx(rail.x0 + 4, y, "s");
      setPx(rail.x0 + 5, y, "O");
    }
    // Cap the bottom of each rail with a shadow band so the wood doesn't
    // bleed off-frame. Top end of the rail intentionally fades into the
    // exit hole's darkness.
    setPx(rail.x0 + 1, rail.y1, "s");
    setPx(rail.x0 + 2, rail.y1, "s");
    setPx(rail.x0 + 3, rail.y1, "s");
    setPx(rail.x0 + 4, rail.y1, "O");
  };
  drawRail(RAIL_L);
  drawRail(RAIL_R);

  // 2) Rungs. Each rung spans the inner gap between the rails (one pixel
  // inside each rail's outline) and is 5 rows tall: outline top, highlight,
  // mid, shadow, outline bottom. A nail dot at each end of the middle row
  // sells the "pegged into the rail" detail.
  const RUNG_X0 = RAIL_L.x1 + 1; // 14
  const RUNG_X1 = RAIL_R.x0 - 1; // 33
  for (const rung of RUNGS) {
    fillRect(RUNG_X0, RUNG_X1, rung.y0,     rung.y0,     "O");
    fillRect(RUNG_X0, RUNG_X1, rung.y0 + 1, rung.y0 + 1, "W");
    fillRect(RUNG_X0, RUNG_X1, rung.y0 + 2, rung.y0 + 2, "w");
    fillRect(RUNG_X0, RUNG_X1, rung.y0 + 3, rung.y0 + 3, "s");
    fillRect(RUNG_X0, RUNG_X1, rung.y1,     rung.y1,     "O");
    setPx(RUNG_X0,     rung.y0 + 2, "n");
    setPx(RUNG_X1,     rung.y0 + 2, "n");
  }

  // 3) Subtle wood-grain accents on the rails: a few darker pixels scattered
  // along the mid columns to break up the otherwise-flat texture. Positions
  // are deterministic so the sprite is reproducible.
  const grainHits = [
    [10, 12], [11, 26], [10, 38], [11, 50],
    [36, 16], [37, 32], [36, 44],
  ];
  for (const [x, y] of grainHits) setPx(x, y, "s");
  // Brightest highlight glints — the rare H pixels — sit under each rung on
  // the left rail's highlight column so the eye reads "light from above".
  for (const rung of RUNGS) setPx(RAIL_L.x0 + 1, rung.y1 + 1, "H");

  // 4) Drop shadow. A soft three-row alpha-blended ellipse hugging just
  // beneath the rails so the ladder feels grounded on the floor tile rather
  // than floating. The wider halo row (X) catches a hint of penumbra; the
  // denser core rows (S) read as the contact shadow itself.
  fillRect(4,  43, SHADOW_Y,     SHADOW_Y,     "X");
  fillRect(6,  41, SHADOW_Y + 1, SHADOW_Y + 1, "S");
  fillRect(7,  40, SHADOW_Y + 2, SHADOW_Y + 2, "S");
  fillRect(9,  38, SHADOW_Y + 3, SHADOW_Y + 3, "X");

  return out;
}

// ---------------------------------------------------------------------------
// Minimal PNG encoder (RGBA, no filtering, zlib-deflated IDAT)
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
  const sheet = Buffer.from(buildFrame().buffer);
  const png = encodePNG(FRAME_W, FRAME_H, sheet);
  // Write to both src/ (source of truth) and dist/ (what the dev server and
  // built bundle actually load from -- index.js references ./dist/... URLs
  // directly so webpack does not copy this asset for us).
  const subPath = path.join("assets", "images", "ladder", "ladder.png");
  for (const root of ["src", "dist"]) {
    const outPath = path.join(__dirname, "..", root, subPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, png);
    // eslint-disable-next-line no-console
    console.log(`wrote ${outPath}  (${FRAME_W}x${FRAME_H}, single frame)`);
  }
}

main();
