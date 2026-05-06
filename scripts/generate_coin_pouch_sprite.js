/*
 * Builds the coin-pouch HUD sprite sheet from a hand-drawn reference image.
 *
 * Output: src/assets/ui/coin_pouch/sprite.png  (240 x 48, 5 frames of 48x48)
 *
 * Source: scripts/assets/coin_pouch_source.png
 *   A wide-format reference (1024x682 ish) with five hand-drawn pouch states
 *   laid out left-to-right on a pure-black background. Frame index = "fullness
 *   bucket" (matches `bucketForCoinCount` in src/scripts/ui/hud/coin_pouch.js):
 *
 *     0:  0 coins      flat, deflated, slumped
 *     1:  1–3 coins    cinched, slight bulge
 *     2:  4–6 coins    rounded body, drawstrings dangling
 *     3:  7–9 coins    full, coins peeking out the mouth
 *     4: 10+ coins     overflowing, coins spilling above + a stray on the ground
 *
 * Pipeline:
 *   1. Decode the source PNG into raw RGBA pixels.
 *   2. Auto-detect each bag's bounding box by scanning fixed horizontal slices
 *      for non-black pixels. Treats anything noticeably above pure black as
 *      "bag" pixels — the source uses a clean pure-black backdrop so the
 *      threshold can stay tight.
 *   3. Expand each bbox to a square (with a small padding margin) so the bag
 *      sits centered in its frame.
 *   4. Downsample each square to 48x48 using an alpha-weighted box-average
 *      kernel, with near-black pixels pre-keyed to transparent so the dark
 *      backdrop never bleeds into the pouch's drop shadow.
 *   5. Stitch the 5 downsampled frames into one horizontal 240x48 sheet.
 *   6. Encode and write to src/assets/ui/coin_pouch/sprite.png + the matching
 *      dist/ copy (since index.js loads the asset directly off ./src/...).
 *
 * Zero-runtime-deps: uses Node's built-in `zlib` + `Buffer` only.
 *
 * Re-run after the source image changes:  node scripts/generate_coin_pouch_sprite.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const SOURCE_PATH = path.join(__dirname, "assets", "coin_pouch_source.png");
const FRAME_W = 48;
const FRAME_H = 48;
const FRAME_COUNT = 5;
const SHEET_W = FRAME_W * FRAME_COUNT;
const SHEET_H = FRAME_H;

// Threshold used by the column-presence scan during bag bbox detection.
// JPEG noise around the bags adds low-amplitude haze, so the bbox stage
// is intentionally aggressive about classifying near-black pixels as
// "background" — that makes the gap detection between bags reliable.
const BLACK_THRESHOLD = 90;

// Threshold used for the per-pixel alpha mask during downsampling. Much
// stricter than BLACK_THRESHOLD because dark leather shadows on the bag
// (especially the shaded side) come in around sum=40..90 — if we treat
// those as "background candidates" the flood fill chews through the
// shaded leather and the bag prints as a pale silhouette instead of
// solid brown. By keeping ALPHA_KEY_THRESHOLD below ~30 the flood fill
// only ever consumes pixels that read as truly black, while every
// shaded leather pixel stays inside the bag mask.
const ALPHA_KEY_THRESHOLD = 28;

// Minimum number of foreground pixels in a column required to mark it as
// "has bag". Filters out lone JPEG artifact pixels that survive the black
// threshold so the column-run detector can find clean gaps between bags.
const MIN_COL_PIXELS = 6;

// Extra pixels of breathing room around each detected bag bbox before
// squaring it up, so the sprite doesn't get clipped at the edges of the
// 48x48 frame.
const BBOX_PADDING = 12;

// ---------------------------------------------------------------------------
// PNG decoder. Supports the formats the reference image (and its
// sips-converted variants) actually uses: 8-bit, non-interlaced, color
// types 2 (RGB) and 6 (RGBA), all 5 PNG row-filter modes. Throws clear
// errors for anything outside that envelope so re-export instructions are
// obvious.
// ---------------------------------------------------------------------------
function decodePNG(buf) {
  if (buf.slice(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error("source is not a PNG (first 8 bytes don't match the PNG signature)");
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = -1;
  let interlace = 0;
  const idatChunks = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.slice(offset + 4, offset + 8).toString("ascii");
    const data = buf.slice(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }

    offset += 12 + length;
  }

  if (interlace !== 0) throw new Error(`interlaced PNG (interlace=${interlace}) not supported`);
  if (bitDepth !== 8) throw new Error(`bit depth ${bitDepth} not supported (need 8)`);
  if (colorType !== 2 && colorType !== 6) {
    throw new Error(`color type ${colorType} not supported (need 2=RGB or 6=RGBA)`);
  }

  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const compressed = Buffer.concat(idatChunks);
  const raw = zlib.inflateSync(compressed);
  const rowLen = width * bytesPerPixel;
  const decoded = Buffer.alloc(width * height * bytesPerPixel);

  // Apply the per-row reconstruction filter. PNG filters are stateful: each
  // byte is reconstructed from neighbors that have already been decoded, so
  // we walk in scan order and write into `decoded` as we go.
  for (let y = 0; y < height; y++) {
    const filterByte = raw[y * (rowLen + 1)];
    const srcStart = y * (rowLen + 1) + 1;
    const dstRow = y * rowLen;

    for (let i = 0; i < rowLen; i++) {
      const left = i >= bytesPerPixel ? decoded[dstRow + i - bytesPerPixel] : 0;
      const up = y > 0 ? decoded[(y - 1) * rowLen + i] : 0;
      const upLeft = (i >= bytesPerPixel && y > 0)
        ? decoded[(y - 1) * rowLen + i - bytesPerPixel]
        : 0;
      const r = raw[srcStart + i];

      let value;
      switch (filterByte) {
        case 0: value = r; break;
        case 1: value = (r + left) & 0xff; break;
        case 2: value = (r + up) & 0xff; break;
        case 3: value = (r + ((left + up) >> 1)) & 0xff; break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          let pred;
          if (pa <= pb && pa <= pc) pred = left;
          else if (pb <= pc) pred = up;
          else pred = upLeft;
          value = (r + pred) & 0xff;
          break;
        }
        default: throw new Error(`unknown PNG filter type ${filterByte}`);
      }
      decoded[dstRow + i] = value;
    }
  }

  // Promote whatever we got to RGBA so the rest of the pipeline can stay
  // simple. RGB sources get a constant 255 alpha — black-keying will fix
  // the "ground" pixels later.
  const rgba = Buffer.alloc(width * height * 4);
  if (colorType === 6) {
    decoded.copy(rgba);
  } else {
    for (let i = 0; i < width * height; i++) {
      rgba[i * 4 + 0] = decoded[i * 3 + 0];
      rgba[i * 4 + 1] = decoded[i * 3 + 1];
      rgba[i * 4 + 2] = decoded[i * 3 + 2];
      rgba[i * 4 + 3] = 255;
    }
  }

  return { width, height, pixels: rgba };
}

// ---------------------------------------------------------------------------
// Bag detection. Reads the per-column "has any non-background pixel" mask,
// finds runs of populated columns, merges small detached fragments back
// into their nearest neighbor (e.g. the spilled coin on bag 4 sits in its
// own run), and returns the resulting FRAME_COUNT bounding boxes ordered
// left-to-right. This is more robust than equal-width column slicing —
// nothing in the source guarantees the bags line up with 1/Nth columns,
// and slicing through a bag silhouette mangles the crop.
// ---------------------------------------------------------------------------
function isPouchPixel(pixels, idx) {
  const r = pixels[idx];
  const g = pixels[idx + 1];
  const b = pixels[idx + 2];
  const a = pixels[idx + 3];
  return a > 64 && (r + g + b) > BLACK_THRESHOLD;
}

// Maximum gap (in source pixels) between two non-background runs that
// should still be treated as the same bag. Tuned just under the smallest
// inter-bag gap in the reference (~20 px) so adjacent bags stay separate
// while attached bag accents (drawstring blobs, shadow edges) merge into
// the bag they belong to.
const RUN_MERGE_GAP = 10;

function detectBagBboxes(img) {
  const { width, height, pixels } = img;

  // 1. Per-column count of foreground pixels. We need a minimum count to
  //    flag the column as "has bag" because the JPEG-derived backdrop
  //    leaves a few stray pixels above the black threshold even in the
  //    truly empty gaps between bags.
  const colHas = new Array(width).fill(false);
  for (let x = 0; x < width; x++) {
    let count = 0;
    for (let y = 0; y < height; y++) {
      if (isPouchPixel(pixels, (y * width + x) * 4)) {
        count++;
        if (count >= MIN_COL_PIXELS) {
          colHas[x] = true;
          break;
        }
      }
    }
  }

  // 2. Compress consecutive `true` columns into runs. Each run is a
  //    candidate bag (or a coin fragment that needs merging).
  const runs = [];
  let runStart = -1;
  for (let x = 0; x <= width; x++) {
    if (x < width && colHas[x]) {
      if (runStart === -1) runStart = x;
    } else if (runStart !== -1) {
      runs.push({ start: runStart, end: x - 1 });
      runStart = -1;
    }
  }

  // 3. Merge runs that are close enough to be part of the same bag (e.g.
  //    bag 4's overflow + spilled coin). Iterate until stable so chains
  //    of fragments collapse correctly.
  let merged = runs.slice();
  let changed = true;
  while (changed) {
    changed = false;
    const next = [];
    for (const run of merged) {
      const last = next[next.length - 1];
      if (last && run.start - last.end <= RUN_MERGE_GAP) {
        last.end = Math.max(last.end, run.end);
        changed = true;
      } else {
        next.push({ start: run.start, end: run.end });
      }
    }
    merged = next;
  }

  if (merged.length !== FRAME_COUNT) {
    throw new Error(
      `expected ${FRAME_COUNT} bag runs after merge, got ${merged.length}: ` +
      JSON.stringify(merged) +
      ". Adjust RUN_MERGE_GAP or check the source image layout."
    );
  }

  // 4. For each run, find the matching vertical extent.
  return merged.map(run => {
    let minY = height;
    let maxY = -1;
    for (let x = run.start; x <= run.end; x++) {
      for (let y = 0; y < height; y++) {
        if (isPouchPixel(pixels, (y * width + x) * 4)) {
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { minX: run.start, maxX: run.end, minY, maxY };
  });
}

// Crop each bag with a UNIFORM square size derived from the widest /
// tallest bag in the set + padding, so the relative size progression
// across buckets is preserved when the frames are downsampled to a
// fixed FRAME_W × FRAME_H output. With per-bag sizing every bag would
// fill its own frame, eating the visual "filling up" cue. With uniform
// sizing the smallest bag occupies a small portion of the frame and the
// largest fills it, matching the reference image's natural growth.
//
// Each bag is X-centered on its own bbox and bottom-anchored at
// FRAME_BOTTOM_FRAC so the bag's floor stays at the same Y in every
// frame. Without that anchor, smaller bags would float up in their
// frame and the HUD would visibly bounce as the counter changes.
const FRAME_BOTTOM_FRAC = 0.94;

function bagCropsFromBboxes(bboxes, padding) {
  let maxDim = 0;
  for (const bb of bboxes) {
    const w = bb.maxX - bb.minX + 1;
    const h = bb.maxY - bb.minY + 1;
    if (w > maxDim) maxDim = w;
    if (h > maxDim) maxDim = h;
  }
  const size = maxDim + padding * 2;
  return bboxes.map((bb) => {
    const cx = (bb.minX + bb.maxX) / 2;
    const minYSq = Math.round(bb.maxY - size * FRAME_BOTTOM_FRAC);
    return {
      minX: Math.round(cx - size / 2),
      minY: minYSq,
      size,
    };
  });
}

// ---------------------------------------------------------------------------
// Build a per-source-pixel silhouette mask for one crop. A pixel is "inside
// the silhouette" if it sits between actual bag pixels both horizontally
// (between the leftmost and rightmost bag pixel on its row) AND vertically
// (between the topmost and bottommost bag pixel on its column).
//
// This effectively paints a filled black mask in the shape of the sprite
// behind the bag. The dark cavity inside the bag mouth (drawn as pure
// black in the source and otherwise keyed transparent) gets caught by
// this test and prints as solid black, so grass no longer shows through
// the open top of the bag in the HUD.
//
// The test also correctly excludes empty space between the main bag body
// and bag 4's spilled coin: the columns in that gap have a bag pixel
// neither above nor below the gap row, so the column-extent test fails.
// ---------------------------------------------------------------------------
function buildSilhouetteMask(img, sq) {
  const { width, height, pixels } = img;
  const w = sq.size;
  const h = sq.size;
  const total = w * h;
  const isBag = new Uint8Array(total);

  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const sx = sq.minX + dx;
      const sy = sq.minY + dy;
      if (sx < 0 || sx >= width || sy < 0 || sy >= height) continue;
      const idx = (sy * width + sx) * 4;
      const sum = pixels[idx] + pixels[idx + 1] + pixels[idx + 2];
      if (sum >= ALPHA_KEY_THRESHOLD) isBag[dy * w + dx] = 1;
    }
  }

  // Per-row leftmost / rightmost bag column.
  const leftBag = new Int32Array(h);
  const rightBag = new Int32Array(h);
  for (let dy = 0; dy < h; dy++) {
    leftBag[dy] = -1;
    rightBag[dy] = -1;
    for (let dx = 0; dx < w; dx++) {
      if (isBag[dy * w + dx]) {
        if (leftBag[dy] === -1) leftBag[dy] = dx;
        rightBag[dy] = dx;
      }
    }
  }

  // Per-column topmost / bottommost bag row.
  const topBag = new Int32Array(w);
  const bottomBag = new Int32Array(w);
  for (let dx = 0; dx < w; dx++) {
    topBag[dx] = -1;
    bottomBag[dx] = -1;
    for (let dy = 0; dy < h; dy++) {
      if (isBag[dy * w + dx]) {
        if (topBag[dx] === -1) topBag[dx] = dy;
        bottomBag[dx] = dy;
      }
    }
  }

  const inside = new Uint8Array(total);
  for (let dy = 0; dy < h; dy++) {
    if (leftBag[dy] === -1) continue;
    for (let dx = leftBag[dy]; dx <= rightBag[dy]; dx++) {
      if (topBag[dx] === -1) continue;
      if (dy >= topBag[dx] && dy <= bottomBag[dx]) {
        inside[dy * w + dx] = 1;
      }
    }
  }

  return inside;
}

// ---------------------------------------------------------------------------
// Box-average downsampler. Each output pixel is the average of the source
// pixels in its block, but only pixels INSIDE the precomputed silhouette
// mask are sampled. Background pixels (and stray pixels outside the bag
// shape) are skipped → transparent. Cavity pixels inside the silhouette
// keep their source color, which is pure black for the bag mouth — that's
// the "black mask behind the sprite" effect, baked directly into each
// frame so the HUD shows a solid bag with no holes.
// ---------------------------------------------------------------------------
function downsampleSquare(img, sq, dstSize) {
  const { width, height, pixels } = img;
  const dst = Buffer.alloc(dstSize * dstSize * 4);
  const blockSize = sq.size / dstSize;
  const silhouette = buildSilhouetteMask(img, sq);

  for (let dy = 0; dy < dstSize; dy++) {
    for (let dx = 0; dx < dstSize; dx++) {
      const sx0 = Math.floor(sq.minX + dx * blockSize);
      const sx1 = Math.max(sx0 + 1, Math.floor(sq.minX + (dx + 1) * blockSize));
      const sy0 = Math.floor(sq.minY + dy * blockSize);
      const sy1 = Math.max(sy0 + 1, Math.floor(sq.minY + (dy + 1) * blockSize));

      let r = 0;
      let g = 0;
      let b = 0;
      let aSum = 0;
      let count = 0;

      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          count++;
          if (sx < 0 || sx >= width || sy < 0 || sy >= height) continue;
          const mx = sx - sq.minX;
          const my = sy - sq.minY;
          if (mx < 0 || mx >= sq.size || my < 0 || my >= sq.size) continue;
          if (!silhouette[my * sq.size + mx]) continue;
          const idx = (sy * width + sx) * 4;
          r += pixels[idx] * 255;
          g += pixels[idx + 1] * 255;
          b += pixels[idx + 2] * 255;
          aSum += 255;
        }
      }

      const di = (dy * dstSize + dx) * 4;
      if (aSum > 0) {
        dst[di] = Math.round(r / aSum);
        dst[di + 1] = Math.round(g / aSum);
        dst[di + 2] = Math.round(b / aSum);
        const coverage = aSum / (count * 255);
        dst[di + 3] = Math.min(255, Math.round(255 * Math.sqrt(coverage)));
      } else {
        dst[di + 3] = 0;
      }
    }
  }

  return dst;
}

// ---------------------------------------------------------------------------
// Sheet assembly: blit each 48x48 frame into the wide horizontal sheet.
// ---------------------------------------------------------------------------
function buildSheet() {
  const buf = fs.readFileSync(SOURCE_PATH);
  const img = decodePNG(buf);
  const bboxes = detectBagBboxes(img);

  // eslint-disable-next-line no-console
  console.log("detected bag bboxes:");
  for (let i = 0; i < bboxes.length; i++) {
    const b = bboxes[i];
    // eslint-disable-next-line no-console
    console.log(`  ${i}: x=${b.minX}..${b.maxX} (w=${b.maxX - b.minX + 1}), y=${b.minY}..${b.maxY} (h=${b.maxY - b.minY + 1})`);
  }

  const crops = bagCropsFromBboxes(bboxes, BBOX_PADDING);
  const sheet = Buffer.alloc(SHEET_W * SHEET_H * 4);
  const muzzleYs = [];
  for (let f = 0; f < FRAME_COUNT; f++) {
    const frame = downsampleSquare(img, crops[f], FRAME_W);

    // Find the top-most opaque row in this frame so the runtime drop
    // animation can land its coin at the bag's actual mouth Y. Tuck the
    // landing point a couple pixels lower than the absolute top so the
    // coin reads as falling INTO the bag rather than landing on top of
    // the drawstring tips.
    let topY = FRAME_H;
    for (let y = 0; y < FRAME_H; y++) {
      let any = false;
      for (let x = 0; x < FRAME_W; x++) {
        if (frame[(y * FRAME_W + x) * 4 + 3] > 64) { any = true; break; }
      }
      if (any) { topY = y; break; }
    }
    muzzleYs.push(((topY + 3) / FRAME_H));

    for (let y = 0; y < FRAME_H; y++) {
      const src = y * FRAME_W * 4;
      const dst = (y * SHEET_W + f * FRAME_W) * 4;
      frame.copy(sheet, dst, src, src + FRAME_W * 4);
    }
  }
  return { sheet, muzzleYs };
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
  const { sheet, muzzleYs } = buildSheet();
  const png = encodePNG(SHEET_W, SHEET_H, sheet);
  // eslint-disable-next-line no-console
  console.log(`MUZZLE_TOP_BY_BUCKET (paste into src/scripts/ui/hud/coin_pouch.js):`);
  // eslint-disable-next-line no-console
  console.log(`  [${muzzleYs.map(v => v.toFixed(3)).join(", ")}]`);
  // Write to both src/ (source of truth) and dist/ (what the dev server and
  // built bundle actually load from -- index.js references ./dist/... URLs
  // directly so webpack does not copy this asset for us).
  const subPath = path.join("assets", "ui", "coin_pouch", "sprite.png");
  for (const root of ["src", "dist"]) {
    const outPath = path.join(__dirname, "..", root, subPath);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, png);
    // eslint-disable-next-line no-console
    console.log(`wrote ${outPath}  (${SHEET_W}x${SHEET_H}, ${FRAME_COUNT} frames of ${FRAME_W}x${FRAME_H})`);
  }
}

main();
