// Procedurally generate 48x48 PNG sprites for every weapon variant. Each
// sprite is drawn so that the weapon's "business end" points toward the
// upper-left along the canonical -π/4 natural-blade-angle, with the hilt /
// haft anchored toward the lower-right. The shared attack pipelines
// (attacks/arc_attack.js, attacks/thrust_attack.js) rotate from this rest
// pose into facing-aware swing/thrust positions at runtime.
//
// Run with: `node scripts/generate_weapon_sprites.js` from the repo root.

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const W = 48;
const H = 48;

// ---------- Pixel buffer + PNG encoder ----------------------------------------

const makeCanvas = () => new Uint8ClampedArray(W * H * 4);

const setPx = (a, x, y, [r, g, b, alpha = 255]) => {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 4;
  a[i] = r; a[i + 1] = g; a[i + 2] = b; a[i + 3] = alpha;
};

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const x of buf) c = crcTable[(c ^ x) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
};
const encodePng = (a) => {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((W * 4 + 1) * H);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 4 + 1)] = 0;
    Buffer.from(a.buffer).copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
  }
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
};
const writePngBoth = (relPath, a) => {
  for (const root of ["src", "dist"]) {
    const out = path.join(root, "assets", relPath);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, encodePng(a));
    console.log("wrote " + out);
  }
};

// ---------- Drawing primitives -------------------------------------------------

const OUTLINE = [20, 18, 18, 255];

// Walk a line from (x0,y0) to (x1,y1) and call `paint(x,y,t)` at each integer
// step where t is normalized 0..1 along the line. Used to draw blades, shafts,
// crossguards, etc.
const walkLine = (x0, y0, x1, y1, paint) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  if (steps === 0) { paint(x0, y0, 0); return; }
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    paint(Math.round(x0 + dx * t), Math.round(y0 + dy * t), t);
  }
};

// Draws a blade running along a line, with its long axis as the line and its
// short axis perpendicular to it. `widthAt(t)` returns the half-thickness at
// progress `t`. `colorAt(off, t)` chooses a color band given the perpendicular
// offset and progress.
const drawBlade = (a, [x0, y0], [x1, y1], widthAt, colorAt) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  if (len === 0) return;
  // Perpendicular unit vector (rotated 90° CCW). Used to step sideways from
  // the blade's centerline to fill its thickness.
  const nx = -dy / len;
  const ny = dx / len;
  walkLine(x0, y0, x1, y1, (cx, cy, t) => {
    const half = widthAt(t);
    for (let off = -half; off <= half; off++) {
      const px = Math.round(cx + nx * off);
      const py = Math.round(cy + ny * off);
      setPx(a, px, py, colorAt(off, t, half));
    }
  });
};

// Stroked blade outline: paints the outline pixel one step beyond the blade's
// thickness on each side.
const outlineBlade = (a, [x0, y0], [x1, y1], widthAt, color = OUTLINE) => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy);
  if (len === 0) return;
  const nx = -dy / len;
  const ny = dx / len;
  walkLine(x0, y0, x1, y1, (cx, cy, t) => {
    const half = widthAt(t) + 1;
    setPx(a, Math.round(cx + nx * half), Math.round(cy + ny * half), color);
    setPx(a, Math.round(cx - nx * half), Math.round(cy - ny * half), color);
  });
};

const drawDisc = (a, cx, cy, r, color, outline = OUTLINE) => {
  const r2o = (r + 0.5) * (r + 0.5);
  const r2i = (r - 0.5) * (r - 0.5);
  for (let y = cy - r - 1; y <= cy + r + 1; y++) {
    for (let x = cx - r - 1; x <= cx + r + 1; x++) {
      const d = (x - cx) ** 2 + (y - cy) ** 2;
      if (d <= r2i) setPx(a, x, y, color);
      else if (d <= r2o && outline) setPx(a, x, y, outline);
    }
  }
};

const drawRing = (a, cx, cy, rOuter, rInner, color) => {
  for (let y = cy - rOuter; y <= cy + rOuter; y++) {
    for (let x = cx - rOuter; x <= cx + rOuter; x++) {
      const d = (x - cx) ** 2 + (y - cy) ** 2;
      if (d <= rOuter * rOuter && d >= rInner * rInner) setPx(a, x, y, color);
    }
  }
};

const drawRect = (a, x, y, w, h, color) => {
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) setPx(a, px, py, color);
  }
};

// ---------- Shared sub-parts ---------------------------------------------------

// Wooden haft from `from` toward `to`, with optional binding bands at given
// progress points.
const drawWoodenHaft = (a, from, to, bands = []) => {
  drawBlade(a, from, to,
    () => 1,
    (off) => off === -1 ? [150, 100, 50, 255] : off === 1 ? [55, 33, 22, 255] : [100, 60, 32, 255],
  );
  outlineBlade(a, from, to, () => 1);
  for (const b of bands) {
    walkLine(from[0], from[1], to[0], to[1], (cx, cy, t) => {
      if (Math.abs(t - b) < 0.04) {
        for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
          setPx(a, cx + dx, cy + dy, [55, 33, 22, 255]);
        }
      }
    });
  }
};

// Pommel disc anchored at the bottom-right end of the grip.
const drawPommel = (a, cx, cy, r = 2, gold = [210, 160, 60, 255], hi = [255, 228, 140, 255]) => {
  drawDisc(a, cx, cy, r, gold);
  setPx(a, cx - 1, cy - 1, hi);
};

// ---------- Per-weapon sprite definitions -------------------------------------

const PALETTE = {
  bladeDark:    [140, 148, 160, 255],
  blade:        [200, 210, 220, 255],
  bladeLight:   [238, 244, 250, 255],
  bladeShine:   [255, 255, 255, 255],
  goldDark:     [140, 96, 32, 255],
  gold:         [210, 160, 60, 255],
  goldLight:    [255, 228, 140, 255],
  ironDark:     [70, 70, 80, 255],
  iron:         [120, 122, 132, 255],
  ironLight:    [180, 184, 196, 255],
  copperDark:   [120, 60, 30, 255],
  copper:       [185, 110, 60, 255],
  copperLight:  [240, 175, 110, 255],
  emerald:      [80, 160, 110, 255],
  emeraldLite:  [140, 220, 170, 255],
  amethyst:     [140, 90, 180, 255],
  amethystLite: [210, 170, 240, 255],
  leatherDark:  [60, 35, 22, 255],
  leather:      [110, 70, 45, 255],
  leatherLight: [170, 120, 80, 255],
  brass:        [190, 145, 60, 255],
  brassLight:   [240, 200, 110, 255],
  wood:         [125, 80, 40, 255],
  woodDark:     [75, 45, 22, 255],
  woodLight:    [165, 115, 70, 255],
  paintRed:     [165, 50, 45, 255],
  paintRedDark: [110, 35, 30, 255],
  paintCream:   [215, 195, 150, 255],
  paintCreamDk: [165, 145, 100, 255],
};

const bladeColor = (off, _t, half) => {
  if (off === -half) return PALETTE.bladeShine;
  if (off === half)  return PALETTE.bladeDark;
  if (off === 0)     return PALETTE.bladeLight;
  return PALETTE.blade;
};

// ---- 1H sword: shortsword (compact, broad blade) ----
const shortsword = () => {
  const a = makeCanvas();
  // Blade ~22px from (33,33) to (12,12), half-width 2
  const bladeStart = [33, 33];
  const bladeEnd = [12, 12];
  drawBlade(a, bladeStart, bladeEnd, () => 2, bladeColor);
  outlineBlade(a, bladeStart, bladeEnd, () => 2);
  // Tip cap
  setPx(a, 11, 11, PALETTE.bladeShine);
  setPx(a, 10, 10, OUTLINE); setPx(a, 11, 10, OUTLINE); setPx(a, 10, 11, OUTLINE);
  // Crossguard perpendicular to blade.
  drawBlade(a, [40, 26], [27, 39], () => 1, () => PALETTE.gold);
  outlineBlade(a, [40, 26], [27, 39], () => 1);
  // Wrapped grip from crossguard center diagonally down to pommel.
  drawWoodenHaft(a, [34, 34], [40, 40], [0.45, 0.85]);
  // Pommel.
  drawPommel(a, 41, 41, 2);
  return a;
};

// ---- 1H sword: longsword (longer blade, fuller, gold pommel) ----
const longsword = () => {
  const a = makeCanvas();
  const bladeStart = [37, 37];
  const bladeEnd = [7, 7];
  drawBlade(a, bladeStart, bladeEnd,
    (t) => 2 - Math.floor(t * 1.0),
    bladeColor,
  );
  outlineBlade(a, bladeStart, bladeEnd, (t) => 2 - Math.floor(t * 1.0));
  // Tip
  setPx(a, 6, 6, PALETTE.bladeShine);
  setPx(a, 5, 5, OUTLINE); setPx(a, 6, 5, OUTLINE); setPx(a, 5, 6, OUTLINE);
  // Fuller (shallow center groove)
  walkLine(33, 33, 11, 11, (cx, cy) => setPx(a, cx, cy, PALETTE.bladeDark));
  // Big crossguard
  drawBlade(a, [44, 32], [32, 44], () => 1, () => PALETTE.gold);
  outlineBlade(a, [44, 32], [32, 44], () => 1);
  setPx(a, 45, 31, PALETTE.goldLight); setPx(a, 31, 45, PALETTE.goldLight);
  // Grip + pommel
  drawWoodenHaft(a, [38, 38], [43, 43], [0.4, 0.8]);
  drawPommel(a, 44, 44, 2);
  return a;
};

// ---- 2H greatsword: claymore (very long blade, ricasso, downturned guard) ----
const claymore = () => {
  const a = makeCanvas();
  const bladeStart = [38, 38];
  const bladeEnd = [4, 4];
  drawBlade(a, bladeStart, bladeEnd,
    (t) => 2 - Math.floor(t * 1.0),
    bladeColor,
  );
  outlineBlade(a, bladeStart, bladeEnd, (t) => 2 - Math.floor(t * 1.0));
  // Sharper tip
  setPx(a, 3, 3, PALETTE.bladeShine); setPx(a, 2, 2, OUTLINE);
  // Ricasso (unsharpened part just above guard) — narrow band of dull steel.
  walkLine(34, 34, 31, 31, (cx, cy) => setPx(a, cx, cy, PALETTE.bladeDark));
  // Long guard with downturned quillons (claymore signature) — extra pixels at
  // each end that curve back toward the blade.
  drawBlade(a, [44, 30], [30, 44], () => 1, () => PALETTE.gold);
  outlineBlade(a, [44, 30], [30, 44], () => 1);
  setPx(a, 43, 28, PALETTE.gold); setPx(a, 42, 27, PALETTE.gold); setPx(a, 41, 27, PALETTE.gold);
  setPx(a, 28, 43, PALETTE.gold); setPx(a, 27, 42, PALETTE.gold); setPx(a, 27, 41, PALETTE.gold);
  // Long two-hand grip with leather wrap.
  drawWoodenHaft(a, [39, 39], [44, 44], [0.3, 0.6, 0.9]);
  drawPommel(a, 45, 45, 2);
  return a;
};

// ---- Dagger (refined fighting dagger: long tapered blade with fuller,
//      flared steel guard, dark wood grip, and a ribbed steel pommel) ----
const dagger = () => {
  const a = makeCanvas();

  // Blade: tapered from 2px wide at the base to a sharp 1px tip. Sits
  // along the canonical -3π/4 axis with the tip ~22px from sprite center
  // (matches base_dagger.spriteTipOffset = 22).
  const bladeBase = [22, 22];
  const bladeTip = [8, 8];
  const bladeWidth = (t) => 1 - Math.floor(t * 0.7);
  drawBlade(a, bladeBase, bladeTip, bladeWidth, bladeColor);
  outlineBlade(a, bladeBase, bladeTip, bladeWidth);

  // Sharper tip cap.
  setPx(a, 7, 7, PALETTE.bladeShine);
  setPx(a, 6, 6, OUTLINE);
  setPx(a, 7, 6, OUTLINE);
  setPx(a, 6, 7, OUTLINE);

  // Center fuller / spine groove — single dark-steel pixel running most of
  // the blade so the surface reads as having a center ridge instead of a
  // flat sliver.
  walkLine(20, 20, 10, 10, (cx, cy) => setPx(a, cx, cy, PALETTE.bladeDark));

  // Crossguard — a small steel guard with a slight forward flare. The
  // perpendicular blade is narrow (1px); the corners get bright iron
  // pixels to suggest the curling "S" hilt seen on dressed daggers.
  drawBlade(a, [26, 18], [18, 26], () => 0, () => PALETTE.iron);
  outlineBlade(a, [26, 18], [18, 26], () => 0);
  setPx(a, 27, 17, PALETTE.ironLight);
  setPx(a, 17, 27, PALETTE.ironLight);
  setPx(a, 28, 18, OUTLINE);
  setPx(a, 18, 28, OUTLINE);
  // Bolster — a brighter pixel right where the blade emerges from the
  // guard, like the steel collar on the reference image.
  setPx(a, 22, 22, PALETTE.ironLight);
  setPx(a, 23, 22, PALETTE.iron);
  setPx(a, 22, 23, PALETTE.iron);

  // Long contoured grip in near-black wood/leather, with a faint highlight
  // stripe on the upper-left side so the cylindrical shape reads in 2D.
  const gripStart = [23, 23];
  const gripEnd = [37, 37];
  drawBlade(a, gripStart, gripEnd,
    () => 1,
    (off) => {
      if (off === -1) return [60, 50, 50, 255];
      if (off === 1)  return [22, 18, 18, 255];
      return [38, 32, 32, 255];
    },
  );
  outlineBlade(a, gripStart, gripEnd, () => 1);

  // Steel pommel cap — five-pixel cylinder with alternating bright/dark
  // bands perpendicular to the grip axis, suggesting the knurled / ribbed
  // pommel end-cap on the reference dagger.
  const pommelStart = [38, 38];
  const pommelEnd = [42, 42];
  drawBlade(a, pommelStart, pommelEnd,
    () => 1,
    (off, t) => {
      const isLightRing = Math.round(t * 4) % 2 === 0;
      if (off === -1) return isLightRing ? PALETTE.bladeShine : PALETTE.iron;
      if (off === 0)  return isLightRing ? PALETTE.ironLight : PALETTE.ironDark;
      return isLightRing ? PALETTE.iron : PALETTE.ironDark;
    },
  );
  outlineBlade(a, pommelStart, pommelEnd, () => 1);

  // End cap dome at the very tip of the pommel.
  setPx(a, 43, 43, PALETTE.ironLight);
  setPx(a, 44, 44, OUTLINE);
  setPx(a, 43, 44, OUTLINE);
  setPx(a, 44, 43, OUTLINE);

  return a;
};

// Helper: paint a 1px outline around a region defined by a membership
// predicate. Used by axe-head sprites that build the head shape from
// circle-subtraction operations.
const outlineRegion = (a, isInside, [x0, y0], [x1, y1]) => {
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (isInside(x, y)) continue;
      if (
        isInside(x - 1, y) || isInside(x + 1, y)
        || isInside(x, y - 1) || isInside(x, y + 1)
      ) setPx(a, x, y, OUTLINE);
    }
  }
};

// Helper: paint every pixel where `isInside(x,y)` is true with `colorAt(x,y)`
// (or a flat color). `colorAt` returning null/undefined leaves that pixel
// alone so callers can paint a partial layer over an already-filled region.
// Used for non-circular shields (heater, kite, tower).
const fillShape = (a, isInside, [x0, y0], [x1, y1], colorAt) => {
  const get = typeof colorAt === "function" ? colorAt : () => colorAt;
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (!isInside(x, y)) continue;
      const c = get(x, y);
      if (c) setPx(a, x, y, c);
    }
  }
};

// ---- 1H axe: hatchet (single-bit wedge head perpendicular to a SHORT haft) ----
//
// The head's long axis runs PERPENDICULAR to the haft. The haft eye sits
// 1/3 of the way along that long axis, measured from the narrow back tip
// toward the wide cutting edge tip — so the head straddles the haft with
// most of the metal on the cutting-edge side and a small "poll" sticking
// out the opposite perpendicular side.
//
// In (axis, flank) head-local coords:
//   - axis   = signed distance along the head's long axis. + toward the
//              cutting edge in the (-1, 1)/√2 direction (lower-left
//              perpendicular to the haft); - toward the narrow back in the
//              (1, -1)/√2 direction (upper-right perpendicular).
//   - flank  = signed distance perpendicular to the head's long axis (i.e.,
//              along the haft direction). + toward the pommel.
//
// The cutting edge sits on the lower-left perpendicular for the rest pose.
// During the swing, `attachArcAttack` is invoked with `reverse: true` for
// one-handed axes, which flips the sweep direction so that the cutting
// edge still leads the arc tangentially despite the asymmetric sprite.
// Half-flank tapers linearly from NARROW_HALF at the back tip to EDGE_HALF
// at the cutting edge tip.
const hatchet = () => {
  const a = makeCanvas();

  const EYE_X = 24;
  const EYE_Y = 24;
  const BACK_LEN = 4.5;
  const EDGE_LEN = 9.0;
  const NARROW_HALF = 1.4;
  const EDGE_HALF = 6.0;
  const SQRT2 = Math.SQRT2;

  // Short haft, drawn first so the head overpaints the eye region.
  drawWoodenHaft(a, [EYE_X, EYE_Y], [40, 40], [0.45, 0.85]);

  const localCoords = (x, y) => {
    const dx = x - EYE_X;
    const dy = y - EYE_Y;
    return [(dy - dx) / SQRT2, (dx + dy) / SQRT2];
  };
  const halfFlankAt = (axis) => {
    if (axis <= -BACK_LEN) return NARROW_HALF;
    if (axis >= EDGE_LEN) return EDGE_HALF;
    const t = (axis + BACK_LEN) / (BACK_LEN + EDGE_LEN);
    return NARROW_HALF + ((EDGE_HALF - NARROW_HALF) * t);
  };
  const isInHead = (x, y) => {
    const [axis, flank] = localCoords(x, y);
    if (axis < -BACK_LEN - 0.5 || axis > EDGE_LEN + 0.5) return false;
    return Math.abs(flank) <= halfFlankAt(axis);
  };

  // Fill head body. Bright at the cutting edge (axis ≈ EDGE_LEN), darker
  // through the body toward the narrow back, with the perpendicular flanks
  // darkened to read as bevels.
  for (let y = 0; y < 48; y++) {
    for (let x = 0; x < 48; x++) {
      if (!isInHead(x, y)) continue;
      const [axis, flank] = localCoords(x, y);
      const halfF = halfFlankAt(axis);
      const flankProx = Math.abs(flank) / Math.max(halfF, 0.5);
      let color;
      if (axis > EDGE_LEN - 1.2) color = PALETTE.bladeShine;
      else if (axis > EDGE_LEN * 0.55) color = PALETTE.ironLight;
      else if (axis > -BACK_LEN * 0.55) color = PALETTE.iron;
      else color = PALETTE.ironDark;
      if (flankProx > 0.85 && axis < EDGE_LEN - 1.2) color = PALETTE.ironDark;
      setPx(a, x, y, color);
    }
  }

  outlineRegion(a, isInHead, [0, 0], [47, 47]);

  // Steel reinforcement at the eye where the haft passes through the head.
  // A single brighter pixel on the upper-left side of the eye reads as the
  // metal collar around the socket.
  setPx(a, EYE_X - 1, EYE_Y - 1, PALETTE.ironLight);
  setPx(a, EYE_X + 1, EYE_Y + 1, PALETTE.iron);

  drawPommel(a, 41, 41, 1, PALETTE.copper);
  return a;
};

// ---- 2H axe: battleaxe (mirrored double-bit head on a long haft) ----
//
// Two bits, one on each side of the haft, share the same wedge profile as
// the hatchet head — narrow at the eye / haft socket, widening to the
// cutting edge at the far perpendicular tip. Geometry uses (along, perp)
// coordinates relative to the shared eye position, where +perp is the
// upper-right side and -perp is the lower-left side. For each bit, perpAbs
// = how far perpendicular it has extended from the haft (0 = at the haft,
// EYE_GAP + BIT_DEPTH = at the cutting edge tip), and `along` is the bit's
// width in the haft direction at that perpAbs.
const battleaxe = () => {
  const a = makeCanvas();

  const EYE_X = 12;
  const EYE_Y = 12;
  const BIT_DEPTH = 9.5;
  const EYE_HALF = 1.7;
  const EDGE_HALF = 6.0;
  const EYE_GAP = 1.0;
  const SQRT2 = Math.SQRT2;

  // Long haft, drawn first so the bits and central collar overpaint the
  // eye region.
  drawWoodenHaft(a, [4, 4], [44, 44], [0.3, 0.55, 0.85]);

  const localCoords = (x, y) => {
    const dx = x - EYE_X;
    const dy = y - EYE_Y;
    return [(dx + dy) / SQRT2, (dx - dy) / SQRT2];
  };
  const halfAlongAt = (perpAbs) => {
    if (perpAbs <= EYE_GAP) return EYE_HALF;
    if (perpAbs >= EYE_GAP + BIT_DEPTH) return EDGE_HALF;
    const t = (perpAbs - EYE_GAP) / BIT_DEPTH;
    return EYE_HALF + ((EDGE_HALF - EYE_HALF) * t);
  };
  const isInHead = (x, y) => {
    const [along, perp] = localCoords(x, y);
    const perpAbs = Math.abs(perp);
    if (perpAbs < EYE_GAP || perpAbs > EYE_GAP + BIT_DEPTH + 0.5) return false;
    return Math.abs(along) <= halfAlongAt(perpAbs);
  };

  for (let y = 0; y <= 28; y++) {
    for (let x = 0; x <= 28; x++) {
      if (!isInHead(x, y)) continue;
      const [along, perp] = localCoords(x, y);
      const perpAbs = Math.abs(perp);
      const edgeProx = (perpAbs - EYE_GAP) / BIT_DEPTH;
      const halfW = halfAlongAt(perpAbs);
      const widthProx = Math.abs(along) / Math.max(halfW, 0.5);
      let color;
      if (edgeProx > 0.88) color = PALETTE.bladeShine;
      else if (edgeProx > 0.65) color = PALETTE.ironLight;
      else if (edgeProx > 0.25) color = PALETTE.iron;
      else color = PALETTE.ironDark;
      if (widthProx > 0.85 && edgeProx > 0.05 && edgeProx < 0.88) color = PALETTE.ironDark;
      setPx(a, x, y, color);
    }
  }

  outlineRegion(a, isInHead, [0, 0], [28, 28]);

  // Iron collar where the haft passes through both bits — a small
  // perpendicular reinforcement strip across the eye.
  for (const [x, y] of [
    [EYE_X, EYE_Y - 1], [EYE_X - 1, EYE_Y],
    [EYE_X + 1, EYE_Y], [EYE_X, EYE_Y + 1],
    [EYE_X - 1, EYE_Y - 1], [EYE_X + 1, EYE_Y + 1],
  ]) setPx(a, x, y, PALETTE.iron);
  setPx(a, EYE_X - 1, EYE_Y - 1, PALETTE.ironLight);

  drawPommel(a, 45, 45, 2, PALETTE.iron);
  return a;
};

// ---- 1H mace: morningstar (spiked iron ball on a haft) ----
const morningstar = () => {
  const a = makeCanvas();
  drawWoodenHaft(a, [16, 16], [42, 42], [0.5, 0.85]);
  // Spiked ball centered around (12, 12).
  drawDisc(a, 12, 12, 4, PALETTE.iron);
  // Highlight on the ball.
  setPx(a, 10, 10, PALETTE.ironLight); setPx(a, 11, 9, PALETTE.ironLight);
  // Spikes radiating outward in 8 directions.
  const spikes = [
    [12, 6], [12, 5],            // up
    [16, 8], [17, 7],            // upper-right
    [18, 12], [19, 12],          // right
    [16, 16], [17, 17],          // lower-right (toward haft — keep short so it doesn't overlap the wood)
    [12, 18], [12, 19],          // down (no — would clip the haft; skip)
    [8, 16], [7, 17],            // lower-left
    [6, 12], [5, 12],            // left
    [8, 8],  [7, 7],             // upper-left
  ];
  for (const [x, y] of spikes) setPx(a, x, y, PALETTE.ironLight);
  for (const [x, y] of spikes) setPx(a, x, y - 1, OUTLINE);
  // Spike tips
  for (const [x, y] of [[12, 5], [17, 7], [19, 12], [17, 17], [7, 17], [5, 12], [7, 7]]) setPx(a, x, y, OUTLINE);
  // Pommel
  drawPommel(a, 43, 43, 1, PALETTE.copper);
  return a;
};

// ---- 1H hammer: hammer (stout iron head on a wooden haft) ----
const hammer = () => {
  const a = makeCanvas();
  drawWoodenHaft(a, [14, 14], [42, 42], [0.5, 0.85]);
  // Rectangular hammer head perpendicular to the haft, anchored near (12, 12).
  // The head is rotated -π/4 to align with the swing axis.
  drawBlade(a, [16, 8], [8, 16], () => 3, (off) => {
    if (off === -3) return PALETTE.bladeShine;
    if (off === 3)  return PALETTE.ironDark;
    if (off === 0)  return PALETTE.ironLight;
    return PALETTE.iron;
  });
  outlineBlade(a, [16, 8], [8, 16], () => 3);
  // Iron band where head meets haft.
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) setPx(a, 13 + i, 13 + j, PALETTE.ironDark);
  drawPommel(a, 43, 43, 1, PALETTE.copper);
  return a;
};

// ---- 2H hammer: warhammer (massive head with a beak/spike on the back) ----
const warhammer = () => {
  const a = makeCanvas();
  drawWoodenHaft(a, [12, 12], [44, 44], [0.4, 0.7, 0.9]);
  // Huge head perpendicular to the haft.
  drawBlade(a, [18, 4], [4, 18], () => 4, (off) => {
    if (off === -4) return PALETTE.bladeShine;
    if (off === 4)  return PALETTE.ironDark;
    if (off === 0)  return PALETTE.ironLight;
    return PALETTE.iron;
  });
  outlineBlade(a, [18, 4], [4, 18], () => 4);
  // Spiked beak on the back side (NW of the head).
  for (const [x, y] of [[2, 6], [3, 6], [4, 6], [3, 5], [4, 5], [4, 4]]) setPx(a, x, y, PALETTE.ironLight);
  for (const [x, y] of [[1, 6], [2, 5], [3, 4], [4, 3]]) setPx(a, x, y, OUTLINE);
  // Reinforcing collar.
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) setPx(a, 14 + i, 14 + j, PALETTE.ironDark);
  drawPommel(a, 45, 45, 2, PALETTE.iron);
  return a;
};

// ---- 2H spear: spear (matte-black leaf-bladed point with winged lugs on
//      a long brown haft — sprite "tip" pixel at (4, 4) so it lines up
//      with base_polearm.spriteTipOffset = 28) ----
const spear = () => {
  const a = makeCanvas();

  // Matte forged-iron palette for the head and wings, near-black like the
  // reference image. A slightly brighter ridge color carries the spine
  // highlight down the leaf's center.
  const POINT_BODY = [50, 44, 44, 255];
  const POINT_SPINE = [95, 85, 85, 255];

  // Long brown haft. Drawn first so the head and wings overpaint the
  // upper-left section of it.
  drawWoodenHaft(a, [13, 13], [44, 44], [0.25, 0.5, 0.75]);

  // ===== Leaf-shaped spear point =====
  // Spine runs along the y = x diagonal from tip (4, 4) to base (12, 12).
  // The body extends perpendicular off the spine, widest at the middle of
  // the leaf and tapering back to a single spine pixel at both ends.
  const leafPixels = new Set();
  const addLeaf = (pixels) => { for (const [x, y] of pixels) leafPixels.add(`${x},${y}`); };

  addLeaf([[4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12]]);
  addLeaf([
    [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
    [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [9, 11],
    [5, 8], [6, 9], [7, 10],
  ]);
  addLeaf([
    [5, 4], [6, 5], [7, 6], [8, 7], [9, 8], [10, 9], [11, 10], [12, 11],
    [6, 4], [7, 5], [8, 6], [9, 7], [10, 8], [11, 9],
    [8, 5], [9, 6], [10, 7],
  ]);

  for (const key of leafPixels) {
    const [x, y] = key.split(",").map(Number);
    setPx(a, x, y, x === y ? POINT_SPINE : POINT_BODY);
  }

  // ===== Wings / lugs =====
  // Short perpendicular crosspiece at the base of the leaf, suggesting the
  // hunting-spear winged lugs in the reference. Built as two 2-pixel-thick
  // bars perpendicular to the haft axis.
  const wingPixels = new Set();
  const addWing = (pixels) => { for (const [x, y] of pixels) wingPixels.add(`${x},${y}`); };

  addWing([
    [13, 13], [14, 12], [15, 11], [16, 10],
    [14, 14], [15, 13], [16, 12], [17, 11],
    [12, 14], [11, 15], [10, 16],
    [13, 15], [12, 16], [11, 17],
  ]);

  for (const key of wingPixels) {
    const [x, y] = key.split(",").map(Number);
    setPx(a, x, y, POINT_BODY);
  }

  // ===== Outline =====
  // 4-neighbor of any leaf or wing pixel that isn't itself in the region.
  const headRegion = new Set([...leafPixels, ...wingPixels]);
  const outlines = new Set();
  for (const key of headRegion) {
    const [x, y] = key.split(",").map(Number);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const neighbor = `${x + dx},${y + dy}`;
      if (!headRegion.has(neighbor)) outlines.add(neighbor);
    }
  }
  for (const key of outlines) {
    const [x, y] = key.split(",").map(Number);
    setPx(a, x, y, OUTLINE);
  }

  // Subtle dark-wood pommel at the butt end of the haft.
  drawPommel(a, 45, 45, 1, [60, 40, 25, 255]);
  return a;
};

// ---- 2H staff: staff (gnarled wood with metal cap; physical weapon) ----
const staff = () => {
  const a = makeCanvas();
  // Long shaft.
  drawWoodenHaft(a, [6, 6], [44, 44], [0.18, 0.34, 0.5, 0.66, 0.82]);
  // Metal cap at the top (upper-left end).
  drawDisc(a, 5, 5, 2, PALETTE.iron);
  setPx(a, 4, 4, PALETTE.ironLight);
  // Knot/grip wrapping mid-shaft, drawn as a small fatter section.
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      setPx(a, 25 + i, 25 + j, [70, 42, 24, 255]);
    }
  }
  setPx(a, 24, 24, [150, 100, 50, 255]);
  // Foot cap at the bottom.
  drawDisc(a, 45, 45, 2, PALETTE.copper);
  return a;
};

// ---- 1H wand: wand (short carved baton) ----
const wand = () => {
  const a = makeCanvas();
  // Short shaft.
  drawWoodenHaft(a, [18, 18], [38, 38], [0.4, 0.75]);
  // Carved tip: a pointed dark-wood end with a tiny iron stud.
  drawBlade(a, [18, 18], [14, 14], () => 1, () => [70, 42, 24, 255]);
  outlineBlade(a, [18, 18], [14, 14], () => 1);
  setPx(a, 13, 13, PALETTE.iron);
  setPx(a, 12, 12, OUTLINE);
  // Bottom cap.
  drawPommel(a, 39, 39, 1, PALETTE.copper);
  return a;
};

// ---- Shield: buckler (small round steel shield with a domed central boss
//      and decorative engraved rim). Drawn radially symmetric and centered
//      so it looks correct in any facing — the player draws it at 36x36
//      against the body's block side and never rotates the sprite. ----
const buckler = () => {
  const a = makeCanvas();
  const cx = 24;
  const cy = 24;

  // Broad steel face. Radius 17 nearly fills the 48x48 canvas so the
  // shield reads at the in-game 36x36 render size.
  drawDisc(a, cx, cy, 17, PALETTE.iron, OUTLINE);

  // Sheen along the upper-left arc, suggesting a forged metal disc lit
  // from the upper-left like the rest of the weapon sprites.
  for (let theta = Math.PI; theta < Math.PI * 1.75; theta += 0.05) {
    const x = Math.round(cx + (Math.cos(theta) * 16));
    const y = Math.round(cy + (Math.sin(theta) * 16));
    setPx(a, x, y, PALETTE.ironLight);
  }

  // Engraved decorative ring at radius ~13: alternating bright/dark dots
  // every 30° to evoke the etched rosette borders on the reference images
  // without spending too many pixels on detail at this scale.
  for (let i = 0; i < 12; i++) {
    const theta = (i / 12) * Math.PI * 2;
    const x = Math.round(cx + (Math.cos(theta) * 13));
    const y = Math.round(cy + (Math.sin(theta) * 13));
    setPx(a, x, y, i % 2 === 0 ? PALETTE.ironLight : PALETTE.ironDark);
  }

  // Dark gap between rim and boss — gives the boss a clear silhouette.
  drawRing(a, cx, cy, 10, 9, PALETTE.ironDark);

  // Central boss (domed steel hemisphere).
  drawDisc(a, cx, cy, 8, PALETTE.ironLight, OUTLINE);
  // Lit-side highlight: brighter cap offset up-left.
  drawDisc(a, cx - 1, cy - 1, 5, PALETTE.bladeLight, null);
  // Specular shine point.
  drawDisc(a, cx - 2, cy - 2, 2, PALETTE.bladeShine, null);

  // Six rivets around the boss base, evenly spaced. Painted as a 2-pixel
  // square: one bright pixel + an OUTLINE neighbor for depth.
  for (let i = 0; i < 6; i++) {
    const theta = ((i / 6) * Math.PI * 2) + (Math.PI / 6);
    const rx = Math.round(cx + (Math.cos(theta) * 9.5));
    const ry = Math.round(cy + (Math.sin(theta) * 9.5));
    setPx(a, rx, ry, PALETTE.bladeShine);
    setPx(a, rx + 1, ry, OUTLINE);
    setPx(a, rx, ry + 1, OUTLINE);
  }

  return a;
};

// ---- Shield: targe (small Highland round, leather face with brass nails
//      arranged in concentric rings around a small central spike). Drawn
//      radially symmetric from the canvas center. ----
const targe = () => {
  const a = makeCanvas();
  const cx = 24;
  const cy = 24;
  const R = 17;

  drawDisc(a, cx, cy, R, PALETTE.leather, OUTLINE);
  drawDisc(a, cx, cy, R - 1, PALETTE.leather, null);

  for (let theta = Math.PI; theta < Math.PI * 1.7; theta += 0.05) {
    const x = Math.round(cx + (Math.cos(theta) * (R - 2)));
    const y = Math.round(cy + (Math.sin(theta) * (R - 2)));
    setPx(a, x, y, PALETTE.leatherLight);
  }

  drawRing(a, cx, cy, R - 2, R - 3, PALETTE.leatherDark);
  for (let i = 0; i < 16; i++) {
    const theta = (i / 16) * Math.PI * 2;
    const x = Math.round(cx + (Math.cos(theta) * (R - 3)));
    const y = Math.round(cy + (Math.sin(theta) * (R - 3)));
    setPx(a, x, y, PALETTE.brass);
    setPx(a, x - 1, y - 1, PALETTE.brassLight);
  }

  for (let i = 0; i < 8; i++) {
    const theta = ((i / 8) * Math.PI * 2) + (Math.PI / 8);
    const x = Math.round(cx + (Math.cos(theta) * 8));
    const y = Math.round(cy + (Math.sin(theta) * 8));
    setPx(a, x, y, PALETTE.brass);
  }

  drawDisc(a, cx, cy, 3, PALETTE.iron, OUTLINE);
  setPx(a, cx - 1, cy - 1, PALETTE.bladeShine);
  setPx(a, cx, cy - 4, PALETTE.iron);
  setPx(a, cx, cy - 5, PALETTE.ironLight);
  return a;
};

// ---- Shield: rotella (small Italian Renaissance round, polished steel face
//      with a gilded sun-burst engraving radiating from a central gold boss). ----
const rotella = () => {
  const a = makeCanvas();
  const cx = 24;
  const cy = 24;
  const R = 17;

  drawDisc(a, cx, cy, R, PALETTE.ironLight, OUTLINE);

  for (let theta = Math.PI; theta < Math.PI * 1.75; theta += 0.05) {
    const x = Math.round(cx + (Math.cos(theta) * (R - 1)));
    const y = Math.round(cy + (Math.sin(theta) * (R - 1)));
    setPx(a, x, y, PALETTE.bladeLight);
  }

  drawRing(a, cx, cy, R, R - 1, PALETTE.gold);

  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2;
    walkLine(
      Math.round(cx + Math.cos(theta) * 4),
      Math.round(cy + Math.sin(theta) * 4),
      Math.round(cx + Math.cos(theta) * (R - 3)),
      Math.round(cy + Math.sin(theta) * (R - 3)),
      (x, y, t) => setPx(a, x, y, t > 0.5 ? PALETTE.gold : PALETTE.goldLight),
    );
  }

  drawRing(a, cx, cy, 6, 5, PALETTE.goldDark);
  drawDisc(a, cx, cy, 4, PALETTE.gold, OUTLINE);
  drawDisc(a, cx - 1, cy - 1, 2, PALETTE.goldLight, null);
  setPx(a, cx - 2, cy - 2, PALETTE.bladeShine);

  return a;
};

// ---- Shared helper: paint pseudo-random vertical wood-plank streaks inside
//      a circular wooden shield face. Used by viking_shield and round_shield. ----
const paintPlankedFace = (a, cx, cy, r, woodMid, woodLight, woodDark) => {
  for (let y = cy - r; y <= cy + r; y++) {
    for (let x = cx - r; x <= cx + r; x++) {
      const d = (x - cx) ** 2 + (y - cy) ** 2;
      if (d > r * r) continue;
      const phase = ((x - (cx - r)) % 6);
      let c = woodMid;
      if (phase === 0) c = woodDark;
      else if (phase === 3) c = woodLight;
      setPx(a, x, y, c);
    }
  }
};

// ---- Shield: viking shield (medium round, planked wood painted in two
//      contrasting half-circles around a central iron boss, with a beaten
//      iron rim and rivets). ----
const vikingShield = () => {
  const a = makeCanvas();
  const cx = 24;
  const cy = 24;
  const R = 21;

  drawDisc(a, cx, cy, R, PALETTE.wood, OUTLINE);

  for (let y = cy - R; y <= cy + R; y++) {
    for (let x = cx - R; x <= cx + R; x++) {
      const d = (x - cx) ** 2 + (y - cy) ** 2;
      if (d > (R - 1) ** 2) continue;
      const onLeft = x < cx;
      const planks = ((x - (cx - R)) % 6);
      let c = onLeft ? PALETTE.paintRed : PALETTE.paintCream;
      if (planks === 0) c = onLeft ? PALETTE.paintRedDark : PALETTE.paintCreamDk;
      else if (planks === 3 && onLeft) c = PALETTE.paintRed;
      setPx(a, x, y, c);
    }
  }

  for (let y = cy - 1; y <= cy + 1; y++) {
    for (let x = cx - R + 1; x <= cx + R - 1; x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 > (R - 1) ** 2) continue;
      setPx(a, x, y, y === cy ? PALETTE.woodDark : PALETTE.wood);
    }
  }

  drawRing(a, cx, cy, R, R - 2, PALETTE.iron);
  for (let i = 0; i < 8; i++) {
    const theta = (i / 8) * Math.PI * 2;
    const x = Math.round(cx + (Math.cos(theta) * (R - 1)));
    const y = Math.round(cy + (Math.sin(theta) * (R - 1)));
    setPx(a, x, y, PALETTE.ironLight);
  }

  drawDisc(a, cx, cy, 5, PALETTE.iron, OUTLINE);
  drawDisc(a, cx - 1, cy - 1, 3, PALETTE.ironLight, null);
  setPx(a, cx - 2, cy - 2, PALETTE.bladeShine);
  return a;
};

// ---- Shield: round shield (medium plain wooden round with a heavy iron
//      rim and a small reinforcing center boss). The "workhorse" round —
//      no painted decoration, just visible plank seams. ----
const roundShield = () => {
  const a = makeCanvas();
  const cx = 24;
  const cy = 24;
  const R = 21;

  drawDisc(a, cx, cy, R, PALETTE.wood, OUTLINE);
  paintPlankedFace(a, cx, cy, R - 2, PALETTE.wood, PALETTE.woodLight, PALETTE.woodDark);

  drawRing(a, cx, cy, R, R - 2, PALETTE.iron);
  drawRing(a, cx, cy, R - 1, R - 2, PALETTE.ironLight);
  for (let i = 0; i < 4; i++) {
    const theta = ((i / 4) * Math.PI * 2) + (Math.PI / 4);
    const x = Math.round(cx + (Math.cos(theta) * (R - 1)));
    const y = Math.round(cy + (Math.sin(theta) * (R - 1)));
    setPx(a, x, y, PALETTE.ironDark);
    setPx(a, x - 1, y - 1, PALETTE.bladeShine);
  }

  drawDisc(a, cx, cy, 4, PALETTE.iron, OUTLINE);
  drawDisc(a, cx - 1, cy - 1, 2, PALETTE.ironLight, null);
  setPx(a, cx - 1, cy - 1, PALETTE.bladeShine);
  return a;
};

// ---- Shield: heater shield (medium classic knight's shield — flat top, sides
//      tapering to a rounded point at the bottom). Hand-painted heraldry: a
//      red field with a centered brass cross. ----
const heaterShield = () => {
  const a = makeCanvas();
  const TOP = 6;
  const BOT = 41;
  const W_HALF_TOP = 12;
  const NECK = 26;
  const cx = 24;

  const sideX = (y) => {
    if (y <= TOP) return W_HALF_TOP - (TOP - y);
    if (y <= NECK) return W_HALF_TOP;
    const t = (y - NECK) / (BOT - NECK);
    return Math.round(W_HALF_TOP * (1 - (t * t)));
  };
  const isInside = (x, y) => {
    if (y < TOP || y > BOT) return false;
    const half = sideX(y);
    return Math.abs(x - cx) <= half;
  };

  fillShape(a, isInside, [0, 0], [47, 47], (x, y) => {
    const half = sideX(y);
    const dx = Math.abs(x - cx);
    if (dx >= half - 1) return PALETTE.iron;
    if (y < TOP + 4 && dx < half - 2) return PALETTE.paintRed;
    return PALETTE.paintRedDark;
  });

  for (let y = 8; y <= 38; y++) {
    if (!isInside(cx, y)) continue;
    const half = sideX(y);
    if (half < 4) continue;
    setPx(a, cx, y, PALETTE.brass);
    setPx(a, cx - 1, y, PALETTE.brassLight);
  }
  for (let x = 12; x <= 36; x++) {
    const y = 18;
    if (!isInside(x, y)) continue;
    setPx(a, x, y, PALETTE.brass);
    setPx(a, x, y - 1, PALETTE.brassLight);
  }

  outlineRegion(a, isInside, [0, 0], [47, 47]);

  for (let y = TOP + 2; y < TOP + 6; y++) {
    if (!isInside(cx - 6, y)) continue;
    setPx(a, cx - 6, y, PALETTE.bladeLight);
  }
  return a;
};

// ---- Shield: kite shield (large tall almond — rounded top, widest at the
//      shoulder, taper to a rounded point that protects the leg). Heraldry
//      is a vertical brass band running its length. ----
const kiteShield = () => {
  const a = makeCanvas();
  const TOP = 4;
  const BOT = 44;
  const SHOULDER = 12;
  const W_HALF = 10;
  const cx = 24;

  const halfWidthAt = (y) => {
    if (y < TOP || y > BOT) return -1;
    if (y <= SHOULDER) {
      const t = (y - TOP) / (SHOULDER - TOP);
      return Math.round(W_HALF * Math.sqrt(Math.max(0, 1 - ((1 - t) ** 2))));
    }
    const t = (y - SHOULDER) / (BOT - SHOULDER);
    return Math.round(W_HALF * (1 - (t * t)));
  };
  const isInside = (x, y) => {
    const half = halfWidthAt(y);
    if (half < 0) return false;
    return Math.abs(x - cx) <= half;
  };

  fillShape(a, isInside, [0, 0], [47, 47], (x, y) => {
    const half = halfWidthAt(y);
    const dx = Math.abs(x - cx);
    if (dx >= half - 1) return PALETTE.iron;
    return ((x - (cx - W_HALF)) % 6 === 0) ? PALETTE.woodDark : PALETTE.wood;
  });

  for (let y = TOP + 1; y <= BOT - 1; y++) {
    if (!isInside(cx, y)) continue;
    setPx(a, cx, y, PALETTE.brass);
    setPx(a, cx - 1, y, PALETTE.brassLight);
    setPx(a, cx + 1, y, PALETTE.goldDark);
  }

  for (let i = 0; i < 4; i++) {
    const y = TOP + 4 + (i * 10);
    const half = halfWidthAt(y);
    if (half < 4) continue;
    setPx(a, cx - half + 1, y, PALETTE.ironLight);
    setPx(a, cx + half - 1, y, PALETTE.ironLight);
  }

  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---- Shield: tower shield (large rectangular wall with banded oak planks
//      and reinforcing iron horizontal bands top, middle, and bottom). The
//      heaviest shield — full body cover. ----
const towerShield = () => {
  const a = makeCanvas();
  const TOP = 4;
  const BOT = 44;
  const LEFT = 11;
  const RIGHT = 36;
  const cx = 24;

  const isInside = (x, y) => {
    if (y < TOP || y > BOT) return false;
    if (x < LEFT || x > RIGHT) return false;
    if (y === TOP) return x >= LEFT + 1 && x <= RIGHT - 1;
    return true;
  };

  fillShape(a, isInside, [0, 0], [47, 47], (x, y) => {
    const phase = (x - LEFT) % 5;
    if (phase === 0) return PALETTE.woodDark;
    if (phase === 4) return PALETTE.woodLight;
    return PALETTE.wood;
  });

  for (const y of [TOP + 1, 23, BOT - 1]) {
    for (let x = LEFT; x <= RIGHT; x++) {
      if (!isInside(x, y)) continue;
      setPx(a, x, y, PALETTE.iron);
      if (y > TOP + 1) setPx(a, x, y - 1, PALETTE.ironLight);
    }
    for (const x of [LEFT + 2, cx, RIGHT - 2]) {
      if (!isInside(x, y)) continue;
      setPx(a, x, y, PALETTE.ironDark);
      setPx(a, x - 1, y - 1, PALETTE.bladeShine);
    }
  }

  for (let y = TOP; y <= BOT; y++) {
    if (isInside(LEFT, y)) setPx(a, LEFT, y, PALETTE.iron);
    if (isInside(RIGHT, y)) setPx(a, RIGHT, y, PALETTE.iron);
  }

  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---------- Side profiles -----------------------------------------------------
//
// Drawn convention: the shield's convex (outer) face points LEFT (decreasing
// x); the inner/back side faces RIGHT. `player.drawBlock` flips the sprite
// horizontally when the player faces RIGHT, so a single side-profile asset
// serves both sides. Vertical extent roughly matches each shield's front
// silhouette so the same shield reads as itself viewed edge-on.

// Predicate factory: returns isInside(x,y) for a vertical lens centered at
// (cx, cy). `halfH` is half the shield's vertical extent; the lens tapers
// elliptically toward the top and bottom. `outerBulge` is the convex
// half-thickness on the left face at the equator; `innerBulge` is the back
// half-thickness on the right.
const roundLens = (cx, cy, halfH, outerBulge, innerBulge) => (x, y) => {
  const dy = y - cy;
  if (Math.abs(dy) > halfH) return false;
  const t = dy / halfH;
  const k = Math.sqrt(Math.max(0, 1 - (t * t)));
  const dx = x - cx;
  return dx >= -outerBulge * k && dx <= innerBulge * k;
};

// Paint the leftmost column of the inside region with `highlight` to add a
// lit edge along the convex face. Optional thin decoration helper.
const paintLeftHighlight = (a, isInside, color) => {
  for (let y = 0; y < 48; y++) {
    for (let x = 0; x < 48; x++) {
      if (isInside(x, y)) {
        setPx(a, x, y, color);
        break;
      }
    }
  }
};

// ---- Buckler side: small steel lens with a domed boss bump in the center ----
const bucklerSide = () => {
  const a = makeCanvas();
  const main = roundLens(24, 24, 16, 5, 2);
  const boss = (x, y) => x >= 17 && x <= 18 && y >= 22 && y <= 26;
  const isInside = (x, y) => main(x, y) || boss(x, y);
  fillShape(a, isInside, [0, 0], [47, 47], (x) => x < 24 ? PALETTE.iron : PALETTE.ironDark);
  paintLeftHighlight(a, isInside, PALETTE.ironLight);
  setPx(a, 17, 23, PALETTE.bladeShine);
  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---- Targe side: small leather-faced lens with brass nail-heads visible
//      along the rim and a short steel spike sticking out the front. ----
const targeSide = () => {
  const a = makeCanvas();
  const main = roundLens(24, 24, 16, 5, 2);
  const spike = (x, y) => x >= 16 && x <= 19 && y === 24;
  const spikeTip = (x, y) => x === 15 && y === 24;
  const isInside = (x, y) => main(x, y) || spike(x, y) || spikeTip(x, y);
  fillShape(a, isInside, [0, 0], [47, 47], (x, y) => {
    if (spike(x, y) || spikeTip(x, y)) return x === 15 ? PALETTE.bladeShine : PALETTE.iron;
    return x < 24 ? PALETTE.leather : PALETTE.leatherDark;
  });
  paintLeftHighlight(a, main, PALETTE.leatherLight);
  for (const y of [12, 18, 24, 30, 36]) {
    for (let x = 0; x < 48; x++) {
      if (main(x, y)) {
        setPx(a, x, y, PALETTE.brass);
        if (x + 1 < 48 && main(x + 1, y)) setPx(a, x + 1, y, PALETTE.brassLight);
        break;
      }
    }
  }
  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---- Rotella side: small steel lens with a gold accent strip running its
//      length along the convex face. ----
const rotellaSide = () => {
  const a = makeCanvas();
  const main = roundLens(24, 24, 16, 5, 2);
  fillShape(a, main, [0, 0], [47, 47], (x) => x < 24 ? PALETTE.ironLight : PALETTE.iron);
  for (let y = 12; y <= 36; y++) {
    for (let x = 0; x < 48; x++) {
      if (main(x, y)) {
        setPx(a, x + 1, y, PALETTE.gold);
        if (Math.abs(y - 24) < 4) setPx(a, x + 1, y, PALETTE.goldLight);
        break;
      }
    }
  }
  paintLeftHighlight(a, main, PALETTE.bladeLight);
  outlineRegion(a, main, [0, 0], [47, 47]);
  return a;
};

// ---- Viking shield side: medium wooden lens with iron rim caps at top and
//      bottom and a small iron boss protrusion in the middle. ----
const vikingShieldSide = () => {
  const a = makeCanvas();
  const main = roundLens(24, 24, 20, 5, 3);
  const boss = (x, y) => x >= 17 && x <= 18 && y >= 22 && y <= 26;
  const isInside = (x, y) => main(x, y) || boss(x, y);
  fillShape(a, isInside, [0, 0], [47, 47], (x, y) => {
    if (boss(x, y)) return PALETTE.iron;
    if (Math.abs(y - 24) > 17) return PALETTE.iron;
    return x < 24 ? PALETTE.paintRed : PALETTE.wood;
  });
  paintLeftHighlight(a, main, PALETTE.paintRedDark);
  for (let y = 6; y <= 8; y++) for (let x = 22; x <= 26; x++) {
    if (main(x, y)) setPx(a, x, y, PALETTE.ironLight);
  }
  for (let y = 40; y <= 42; y++) for (let x = 22; x <= 26; x++) {
    if (main(x, y)) setPx(a, x, y, PALETTE.ironLight);
  }
  setPx(a, 17, 23, PALETTE.bladeShine);
  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---- Round shield side: medium wooden lens with heavy iron rim caps and
//      a small reinforcing boss in the middle. ----
const roundShieldSide = () => {
  const a = makeCanvas();
  const main = roundLens(24, 24, 20, 5, 3);
  const boss = (x, y) => x === 18 && y >= 23 && y <= 25;
  const isInside = (x, y) => main(x, y) || boss(x, y);
  fillShape(a, isInside, [0, 0], [47, 47], (x, y) => {
    if (Math.abs(y - 24) > 16) return PALETTE.iron;
    if (boss(x, y)) return PALETTE.iron;
    return x < 24 ? PALETTE.wood : PALETTE.woodDark;
  });
  paintLeftHighlight(a, main, PALETTE.woodLight);
  for (let y = 5; y <= 9; y++) for (let x = 22; x <= 26; x++) {
    if (main(x, y)) setPx(a, x, y, y < 7 ? PALETTE.ironLight : PALETTE.iron);
  }
  for (let y = 39; y <= 43; y++) for (let x = 22; x <= 26; x++) {
    if (main(x, y)) setPx(a, x, y, y > 41 ? PALETTE.ironLight : PALETTE.iron);
  }
  setPx(a, 18, 23, PALETTE.bladeShine);
  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---- Heater shield side: lens whose top blunt edge tapers to a sharper
//      bottom point (matching the front silhouette). Front face painted red
//      with a brass center strip echoing the cross. ----
const heaterShieldSide = () => {
  const a = makeCanvas();
  const cx = 24;
  const TOP = 6;
  const BOT = 41;

  const halfThicknessAt = (y) => {
    if (y < TOP || y > BOT) return -1;
    if (y < 14) return 4;
    if (y < 26) return 5;
    const t = (y - 26) / (BOT - 26);
    return Math.round(5 * (1 - (t * t)));
  };
  const innerThicknessAt = (y) => {
    const h = halfThicknessAt(y);
    return h < 0 ? -1 : Math.max(1, Math.floor(h * 0.45));
  };
  const isInside = (x, y) => {
    const outer = halfThicknessAt(y);
    const inner = innerThicknessAt(y);
    if (outer < 0) return false;
    const dx = x - cx;
    return dx >= -outer && dx <= inner;
  };

  fillShape(a, isInside, [0, 0], [47, 47], (x) => x < cx ? PALETTE.paintRed : PALETTE.paintRedDark);
  paintLeftHighlight(a, isInside, PALETTE.paintRedDark);
  for (let y = 12; y <= 30; y++) {
    for (let x = 0; x < 48; x++) {
      if (isInside(x, y)) {
        setPx(a, x + 1, y, PALETTE.brass);
        if (Math.abs(y - 18) <= 1) setPx(a, x + 2, y, PALETTE.brassLight);
        break;
      }
    }
  }
  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---- Kite shield side: a tall, deeply curved almond. Wide at the shoulder
//      and tapering to a point at the foot — same silhouette as the front. ----
const kiteShieldSide = () => {
  const a = makeCanvas();
  const cx = 24;
  const TOP = 4;
  const SHOULDER = 12;
  const BOT = 44;

  const halfThicknessAt = (y) => {
    if (y < TOP || y > BOT) return -1;
    if (y <= SHOULDER) {
      const t = (y - TOP) / (SHOULDER - TOP);
      return Math.round(7 * Math.sqrt(Math.max(0, 1 - ((1 - t) ** 2))));
    }
    const t = (y - SHOULDER) / (BOT - SHOULDER);
    return Math.round(7 * (1 - (t * t)));
  };
  const innerThicknessAt = (y) => {
    const h = halfThicknessAt(y);
    return h < 0 ? -1 : Math.max(1, Math.floor(h * 0.4));
  };
  const isInside = (x, y) => {
    const outer = halfThicknessAt(y);
    const inner = innerThicknessAt(y);
    if (outer < 0) return false;
    const dx = x - cx;
    return dx >= -outer && dx <= inner;
  };

  fillShape(a, isInside, [0, 0], [47, 47], (x) => x < cx ? PALETTE.wood : PALETTE.woodDark);
  paintLeftHighlight(a, isInside, PALETTE.woodLight);
  for (let y = TOP; y <= BOT; y++) {
    for (let x = 0; x < 48; x++) {
      if (isInside(x, y)) {
        setPx(a, x + 1, y, PALETTE.brass);
        break;
      }
    }
  }
  for (let y = TOP + 1; y < TOP + 4; y++) {
    for (let x = 0; x < 48; x++) {
      if (isInside(x, y)) { setPx(a, x, y, PALETTE.iron); break; }
    }
  }
  for (let y = BOT - 2; y <= BOT; y++) {
    for (let x = 0; x < 48; x++) {
      if (isInside(x, y)) { setPx(a, x, y, PALETTE.iron); break; }
    }
  }
  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---- Tower shield side: tall rectangle with banded oak planks and three
//      reinforcing iron horizontal bands at top, middle, and bottom. ----
const towerShieldSide = () => {
  const a = makeCanvas();
  const cx = 24;
  const TOP = 4;
  const BOT = 44;
  const OUTER = 4;
  const INNER = 2;

  const isInside = (x, y) => {
    if (y < TOP || y > BOT) return false;
    if (y === TOP || y === BOT) return Math.abs(x - cx) <= 2;
    const dx = x - cx;
    return dx >= -OUTER && dx <= INNER;
  };

  fillShape(a, isInside, [0, 0], [47, 47], (x) => x < cx ? PALETTE.wood : PALETTE.woodDark);
  paintLeftHighlight(a, isInside, PALETTE.woodLight);
  for (const y of [TOP + 1, 23, BOT - 1]) {
    for (let x = 0; x < 48; x++) {
      if (isInside(x, y)) {
        for (let dx = 0; dx < 7 && x + dx < 48; dx++) {
          if (isInside(x + dx, y)) setPx(a, x + dx, y, PALETTE.iron);
        }
        break;
      }
    }
  }
  outlineRegion(a, isInside, [0, 0], [47, 47]);
  return a;
};

// ---------- Run ---------------------------------------------------------------

const sprites = [
  ["items/equipment/weapons/swords/shortsword/sprite.png",          shortsword()],
  ["items/equipment/weapons/swords/longsword/sprite.png",           longsword()],
  ["items/equipment/weapons/greatswords/claymore/sprite.png",       claymore()],
  ["items/equipment/weapons/daggers/dagger/sprite.png",             dagger()],
  ["items/equipment/weapons/axes/hatchet/sprite.png",               hatchet()],
  ["items/equipment/weapons/greataxes/battleaxe/sprite.png",        battleaxe()],
  ["items/equipment/weapons/maces/morningstar/sprite.png",          morningstar()],
  ["items/equipment/weapons/hammers/hammer/sprite.png",             hammer()],
  ["items/equipment/weapons/greathammers/warhammer/sprite.png",     warhammer()],
  ["items/equipment/weapons/polearms/spear/sprite.png",             spear()],
  ["items/equipment/weapons/staves/staff/sprite.png",               staff()],
  ["items/equipment/weapons/wands/wand/sprite.png",                 wand()],
  ["items/equipment/shields/buckler/sprite.png",                    buckler()],
  ["items/equipment/shields/buckler/side.png",                      bucklerSide()],
  ["items/equipment/shields/targe/sprite.png",                      targe()],
  ["items/equipment/shields/targe/side.png",                        targeSide()],
  ["items/equipment/shields/rotella/sprite.png",                    rotella()],
  ["items/equipment/shields/rotella/side.png",                      rotellaSide()],
  ["items/equipment/shields/viking_shield/sprite.png",              vikingShield()],
  ["items/equipment/shields/viking_shield/side.png",                vikingShieldSide()],
  ["items/equipment/shields/round_shield/sprite.png",               roundShield()],
  ["items/equipment/shields/round_shield/side.png",                 roundShieldSide()],
  ["items/equipment/shields/heater_shield/sprite.png",              heaterShield()],
  ["items/equipment/shields/heater_shield/side.png",                heaterShieldSide()],
  ["items/equipment/shields/kite_shield/sprite.png",                kiteShield()],
  ["items/equipment/shields/kite_shield/side.png",                  kiteShieldSide()],
  ["items/equipment/shields/tower_shield/sprite.png",               towerShield()],
  ["items/equipment/shields/tower_shield/side.png",                 towerShieldSide()],
];

for (const [rel, buf] of sprites) writePngBoth(rel, buf);
console.log(`Generated ${sprites.length} equipment sprites.`);
