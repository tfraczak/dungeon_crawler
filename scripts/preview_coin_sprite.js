/*
 * Dev-only: upscales src/assets/entities/coin/sprite.png by 8x with
 * nearest-neighbor so the generated sprite sheet can be reviewed visually.
 * Writes the preview to tmp/coin_preview.png.
 *
 *   node scripts/preview_coin_sprite.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const SCALE = 8;
const SRC = path.join(__dirname, "..", "src", "assets", "entities", "coin", "sprite.png");
const OUT_DIR = path.join(__dirname, "..", "tmp");
const OUT = path.join(OUT_DIR, "coin_preview.png");

// ---- minimal PNG decoder (just enough for our 8-bit RGBA, non-interlaced file) ----
function decodePNG(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47 || buf.readUInt32BE(4) !== 0x0d0a1a0a) {
    throw new Error("not a PNG");
  }
  let off = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idatParts = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") {
      idatParts.push(data);
    } else if (type === "IEND") {
      break;
    }
    off += 8 + len + 4; // len + type + data + crc
  }
  if (bitDepth !== 8 || colorType !== 6) {
    throw new Error(`unsupported PNG (bitDepth=${bitDepth} colorType=${colorType})`);
  }

  const raw = zlib.inflateSync(Buffer.concat(idatParts));
  const rowLen = width * 4;
  const pixels = Buffer.alloc(rowLen * height);
  let prev = Buffer.alloc(rowLen);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (rowLen + 1)];
    const row = raw.subarray(y * (rowLen + 1) + 1, (y + 1) * (rowLen + 1));
    const out = Buffer.alloc(rowLen);
    for (let x = 0; x < rowLen; x++) {
      const a = x >= 4 ? out[x - 4] : 0;
      const b = prev[x];
      const c = x >= 4 ? prev[x - 4] : 0;
      let px;
      switch (filter) {
        case 0: px = row[x]; break;
        case 1: px = row[x] + a; break;
        case 2: px = row[x] + b; break;
        case 3: px = row[x] + ((a + b) >> 1); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          px = row[x] + pr;
          break;
        }
        default: throw new Error(`unknown filter ${filter}`);
      }
      out[x] = px & 0xff;
    }
    out.copy(pixels, y * rowLen);
    prev = out;
  }
  return { width, height, pixels };
}

// ---- minimal PNG encoder (same as generate_coin_sprite.js) ----
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
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(w, h, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  const rowLen = w * 4;
  const raw = Buffer.alloc((rowLen + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (rowLen + 1)] = 0;
    rgba.copy(raw, y * (rowLen + 1) + 1, y * rowLen, (y + 1) * rowLen);
  }
  return Buffer.concat([
    PNG_SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function main() {
  const src = decodePNG(fs.readFileSync(SRC));
  const outW = src.width * SCALE;
  const outH = src.height * SCALE;
  const outPx = Buffer.alloc(outW * outH * 4);
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const si = (y * src.width + x) * 4;
      const r = src.pixels[si], g = src.pixels[si + 1], b = src.pixels[si + 2], a = src.pixels[si + 3];
      for (let dy = 0; dy < SCALE; dy++) {
        for (let dx = 0; dx < SCALE; dx++) {
          const di = ((y * SCALE + dy) * outW + (x * SCALE + dx)) * 4;
          outPx[di] = r;
          outPx[di + 1] = g;
          outPx[di + 2] = b;
          outPx[di + 3] = a;
        }
      }
    }
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT, encodePNG(outW, outH, outPx));
  // eslint-disable-next-line no-console
  console.log(`wrote ${OUT} (${outW}x${outH})`);
}

main();
