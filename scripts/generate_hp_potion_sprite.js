/*
 * Procedurally generates the HP-potion sprite.
 *
 * Output: src/assets/entities/hp_potion/sprite.png  (32 x 32, single frame)
 *
 * The sprite is just the static bottle chrome (cork, neck, glass body, red
 * liquid) with painted highlights/shadows. All animated VFX -- rising
 * bubbles inside the liquid and red heal crosses drifting up the sides --
 * are layered procedurally at runtime by hp_potion.js so each potion's
 * timing/placement is unique. Keeping the asset static also means we don't
 * regenerate the PNG when tuning particle behavior.
 *
 * Zero-dependency: uses Node's built-in `zlib` + `Buffer` to hand-encode the
 * PNG. Run with:  node scripts/generate_hp_potion_sprite.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const FRAME_W = 32;
const FRAME_H = 32;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
// "." is transparent. All other entries are indexed by the single-char key
// used in the CHROME mask/overlay lookups below.
const PALETTE = {
  ".": [0, 0, 0, 0],
  O: [46, 26, 36, 255],       // bottle outline (dark reddish brown)
  c: [196, 132, 78, 255],     // cork light
  d: [122, 76, 46, 255],      // cork dark
  g: [120, 140, 175, 255],    // glass body (mid)
  h: [210, 228, 240, 255],    // glass highlight
  s: [78, 92, 122, 255],      // glass shadow
  l: [238, 96, 102, 255],     // liquid surface shine
  r: [206, 52, 56, 255],      // liquid (main)
  R: [148, 30, 40, 255],      // liquid shadow
};

// ---------------------------------------------------------------------------
// Static bottle chrome (identical every frame), 32x32.
// Layout (y=row index):
//   0..3    top padding / sparkle zone above cork
//   4..7    cork (6 wide)
//   8..10   neck (4 wide)
//   11..16  shoulder widening (6 -> 16 wide)
//   17..24  widest body (16 wide) -- liquid surface at y=17
//   25..28  narrowing (14 -> 8 wide) -- flat bottom at y=28
//   29..31  bottom padding
// ---------------------------------------------------------------------------
const CHROME = [
  "................................", // y=0
  "................................", // y=1
  "................................", // y=2
  "................................", // y=3
  ".............OOOOOO.............", // y=4  cork top outline
  ".............OccccO.............", // y=5  cork light interior
  ".............OcddcO.............", // y=6  cork shadow interior
  ".............OcddcO.............", // y=7  cork shadow interior
  "..............O..O..............", // y=8  neck
  "..............O..O..............", // y=9  neck
  "..............O..O..............", // y=10 neck
  ".............O....O.............", // y=11 shoulder 6 wide
  "............O......O............", // y=12 8 wide
  "...........O........O...........", // y=13 10 wide
  "..........O..........O..........", // y=14 12 wide
  ".........O............O.........", // y=15 14 wide
  "........O..............O........", // y=16 16 wide (shoulder end)
  "........O..............O........", // y=17 widest (liquid surface)
  "........O..............O........", // y=18 widest
  "........O..............O........", // y=19 widest
  "........O..............O........", // y=20 widest
  "........O..............O........", // y=21 widest
  "........O..............O........", // y=22 widest
  "........O..............O........", // y=23 widest
  "........O..............O........", // y=24 widest
  ".........O............O.........", // y=25 narrowing 14 wide
  "..........O..........O..........", // y=26 12 wide
  "...........O........O...........", // y=27 10 wide
  "............OOOOOOOO............", // y=28 flat bottom outline
  "................................", // y=29
  "................................", // y=30
  "................................", // y=31
];

const LIQUID_SURFACE_Y = 17;

// Hand-placed highlight / shadow overrides on the static chrome. Applied
// after the base glass/liquid fill. {x, y, color-key}.
const CHROME_OVERRIDES = [
  // glass highlight curve on upper-left (above liquid)
  { x: 14, y: 11, color: "h" },
  { x: 13, y: 12, color: "h" },
  { x: 12, y: 13, color: "h" },
  { x: 11, y: 14, color: "h" },
  { x: 10, y: 15, color: "h" },
  { x: 9,  y: 16, color: "h" },
  // soft glass shadow curve on lower-right (above liquid)
  { x: 17, y: 11, color: "s" },
  { x: 18, y: 12, color: "s" },
  { x: 19, y: 13, color: "s" },
  { x: 20, y: 14, color: "s" },
  { x: 21, y: 15, color: "s" },
  { x: 22, y: 16, color: "s" },
  // liquid surface shine along upper-left of the surface line
  { x: 9,  y: 17, color: "l" },
  { x: 10, y: 17, color: "l" },
  { x: 11, y: 17, color: "l" },
  { x: 12, y: 17, color: "l" },
  // liquid shadow along the lower-right inside curve
  { x: 22, y: 18, color: "R" },
  { x: 22, y: 19, color: "R" },
  { x: 22, y: 20, color: "R" },
  { x: 22, y: 21, color: "R" },
  { x: 22, y: 22, color: "R" },
  { x: 21, y: 23, color: "R" },
  { x: 21, y: 24, color: "R" },
  { x: 20, y: 25, color: "R" },
  { x: 19, y: 26, color: "R" },
  { x: 18, y: 27, color: "R" },
];

// ---------------------------------------------------------------------------
// Build the 32x32 bottle frame as a flat Uint8ClampedArray of RGBA bytes.
// ---------------------------------------------------------------------------
function buildFrame() {
  const out = new Uint8ClampedArray(FRAME_W * FRAME_H * 4);

  // Compute outline bounds (leftmost/rightmost O columns) per row so we can
  // flood-fill the interior with glass/liquid in the second pass.
  const rowBounds = [];
  for (let y = 0; y < FRAME_H; y++) {
    const row = CHROME[y];
    let leftO = -1;
    let rightO = -1;
    for (let x = 0; x < FRAME_W; x++) {
      if (row[x] === "O") {
        if (leftO === -1) leftO = x;
        rightO = x;
      }
    }
    rowBounds.push(leftO === -1 ? null : { leftO, rightO });
  }

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

  // 1) explicit chrome glyphs (outline, cork fill, etc.)
  for (let y = 0; y < FRAME_H; y++) {
    const row = CHROME[y];
    for (let x = 0; x < FRAME_W; x++) {
      const ch = row[x];
      if (ch !== ".") setPx(x, y, ch);
    }
  }

  // 2) fill interior with glass (above liquid) or liquid (below surface).
  //    Cork rows (y=4..7) are already fully painted via CHROME, so we start
  //    from the neck downward.
  for (let y = 8; y < FRAME_H; y++) {
    const bounds = rowBounds[y];
    if (!bounds) continue;
    const row = CHROME[y];
    for (let x = bounds.leftO + 1; x < bounds.rightO; x++) {
      if (row[x] !== ".") continue;
      const key = y >= LIQUID_SURFACE_Y ? "r" : "g";
      setPx(x, y, key);
    }
  }

  // 3) static highlights / shadows on the bottle body
  for (const ov of CHROME_OVERRIDES) setPx(ov.x, ov.y, ov.color);

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
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // color type: truecolor + alpha
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace

  const rowLen = width * 4;
  const raw = Buffer.alloc((rowLen + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (rowLen + 1)] = 0; // filter: None
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

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const sheet = Buffer.from(buildFrame().buffer);
  const png = encodePNG(FRAME_W, FRAME_H, sheet);
  // Write to both src/ (source of truth) and dist/ (what the dev server and
  // built bundle actually load from -- index.js references ./dist/... URLs
  // directly so webpack does not copy this asset for us).
  const subPath = path.join("assets", "entities", "hp_potion", "sprite.png");
  for (const root of ["src", "dist"]) {
    const outPath = path.join(__dirname, "..", root, subPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, png);
    // eslint-disable-next-line no-console
    console.log(`wrote ${outPath}  (${FRAME_W}x${FRAME_H}, single frame)`);
  }
}

main();
