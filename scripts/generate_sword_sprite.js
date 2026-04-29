/*
 * Procedurally generates a shortsword sprite.
 *
 * Output: src/assets/items/equipment/weapons/swords/shortsword/sprite.png
 *         dist/assets/items/equipment/weapons/swords/shortsword/sprite.png
 *         (48 x 48, single frame)
 *
 * Zero-dependency: uses Node's built-in `zlib` + `Buffer` to hand-encode the
 * PNG. Run with: node scripts/generate_sword_sprite.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const FRAME_W = 48;
const FRAME_H = 48;

const PALETTE = {
  ".": [0, 0, 0, 0],
  O: [34, 36, 48, 255],       // dark steel outline
  s: [112, 126, 146, 255],    // blade shadow
  m: [176, 190, 208, 255],    // blade mid
  h: [238, 246, 255, 255],    // blade highlight
  G: [112, 70, 20, 255],      // gold outline/shadow
  g: [214, 150, 42, 255],     // gold guard
  H: [255, 218, 98, 255],     // gold highlight
  L: [64, 38, 28, 255],       // leather outline
  l: [120, 74, 46, 255],      // leather grip
  p: [72, 50, 78, 255],       // pommel shadow
  P: [150, 118, 166, 255],    // pommel mid
};

function setPx(out, x, y, key) {
  if (x < 0 || x >= FRAME_W || y < 0 || y >= FRAME_H) return;
  const color = PALETTE[key];
  if (!color) return;
  const [r, g, b, a] = color;
  const i = (y * FRAME_W + x) * 4;
  out[i] = r;
  out[i + 1] = g;
  out[i + 2] = b;
  out[i + 3] = a;
}

function drawDisc(out, cx, cy, radius, key) {
  const r2 = radius * radius;
  for (let y = cy - radius; y <= cy + radius; y++) {
    for (let x = cx - radius; x <= cx + radius; x++) {
      const dx = x - cx;
      const dy = y - cy;
      if ((dx * dx) + (dy * dy) <= r2) setPx(out, x, y, key);
    }
  }
}

function drawLine(out, x0, y0, x1, y1, width, key) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    const x = Math.round(x0 + (dx * t));
    const y = Math.round(y0 + (dy * t));
    const r = Math.floor(width / 2);
    for (let yy = y - r; yy <= y + r; yy++) {
      for (let xx = x - r; xx <= x + r; xx++) setPx(out, xx, yy, key);
    }
  }
}

function buildFrame() {
  const out = new Uint8ClampedArray(FRAME_W * FRAME_H * 4);

  // Blade outline and body, angled lower-left to upper-right.
  drawLine(out, 15, 33, 32, 16, 7, "O");
  drawLine(out, 16, 32, 31, 17, 5, "s");
  drawLine(out, 17, 31, 30, 18, 3, "m");
  drawLine(out, 19, 29, 29, 19, 1, "h");

  // Point.
  setPx(out, 33, 14, "O");
  setPx(out, 33, 15, "s");
  setPx(out, 32, 15, "m");
  setPx(out, 31, 16, "h");

  // Crossguard, roughly perpendicular to the blade.
  drawLine(out, 12, 28, 20, 36, 5, "G");
  drawLine(out, 13, 28, 20, 35, 3, "g");
  setPx(out, 14, 29, "H");
  setPx(out, 15, 30, "H");

  // Grip and pommel.
  drawLine(out, 9, 39, 15, 33, 5, "L");
  drawLine(out, 10, 38, 15, 33, 3, "l");
  setPx(out, 12, 36, "H");
  drawDisc(out, 7, 41, 3, "p");
  drawDisc(out, 7, 41, 2, "P");
  setPx(out, 6, 40, "H");

  return out;
}

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
    Buffer.from(rgba.buffer).copy(raw, y * (rowLen + 1) + 1, y * rowLen, (y + 1) * rowLen);
  }

  return Buffer.concat([
    PNG_SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function main() {
  const png = encodePNG(FRAME_W, FRAME_H, buildFrame());
  const subPath = path.join(
    "assets",
    "items",
    "equipment",
    "weapons",
    "swords",
    "shortsword",
    "sprite.png",
  );
  for (const root of ["src", "dist"]) {
    const outPath = path.join(__dirname, "..", root, subPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, png);
    // eslint-disable-next-line no-console
    console.log(`wrote ${outPath} (${FRAME_W}x${FRAME_H}, single frame)`);
  }
}

main();
