// Keyring HUD widget. A metal split-ring with 0..MAX hanging keys. Replaces
// the old "x N" key counter so a glance tells the player how many key-only
// chests they can still open. The ring is permanent once the run starts;
// individual keys are added/removed by `player.keyCount`. The maximum
// number of keys the ring can hold is sourced from
// `GAME_CONFIG.entities.key.maxKeys`.

const COLORS = Object.freeze({
  ringDark: "#3a3a40",
  ringMid: "#8a8a92",
  ringHighlight: "#dcdce2",
  shadow: "rgba(0, 0, 0, 0.45)",
  keyBow: "#d8b94a",
  keyBowShade: "#7a5e1c",
  keyBowHighlight: "#fff0a8",
  keyShaft: "#c69a3a",
  keyShaftShade: "#5a4014",
  keyOutline: "#1a1206",
});

// Three slot positions around the bottom half of the ring so multiple keys
// don't overlap. Each slot is an angle around the ring center plus an
// in-plane tilt so the keys hang naturally outward instead of all pointing
// straight down.
const KEY_SLOTS = Object.freeze([
  { angle: Math.PI * 0.5, tilt: 0 },
  { angle: Math.PI * 0.32, tilt: -Math.PI / 7 },
  { angle: Math.PI * 0.68, tilt: Math.PI / 7 },
]);

const drawRing = (ctx, cx, cy, radius) => {
  ctx.fillStyle = COLORS.shadow;
  ctx.beginPath();
  ctx.ellipse(cx, cy + radius * 1.05, radius * 0.85, 1.6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = COLORS.ringDark;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = COLORS.ringMid;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.strokeStyle = COLORS.ringHighlight;
  ctx.beginPath();
  ctx.arc(cx - 0.7, cy - 0.7, radius - 0.5, Math.PI * 1.05, Math.PI * 1.55);
  ctx.stroke();
};

// One pass-through key shape: round bow (ring of the key), straight shaft,
// two teeth on the bottom edge of the shaft. Drawn in local coordinates
// with the bow at (0, 0) and the shaft extending downward, then placed by
// the caller via translate + rotate.
const drawKeyLocal = (ctx, length) => {
  const bowR = length * 0.18;
  const shaftWidth = length * 0.13;
  const shaftStart = bowR;
  const shaftEnd = length;

  ctx.fillStyle = COLORS.keyBow;
  ctx.beginPath();
  ctx.arc(0, 0, bowR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.keyBowShade;
  ctx.beginPath();
  ctx.arc(0, bowR * 0.18, bowR * 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = COLORS.keyOutline;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(0, 0, bowR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = COLORS.keyBowHighlight;
  ctx.beginPath();
  ctx.arc(-bowR * 0.35, -bowR * 0.35, bowR * 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.keyShaft;
  ctx.fillRect(-shaftWidth / 2, shaftStart, shaftWidth, shaftEnd - shaftStart);
  ctx.fillStyle = COLORS.keyShaftShade;
  ctx.fillRect(shaftWidth * 0.1, shaftStart, shaftWidth * 0.4, shaftEnd - shaftStart);
  ctx.strokeStyle = COLORS.keyOutline;
  ctx.lineWidth = 0.7;
  ctx.strokeRect(-shaftWidth / 2, shaftStart, shaftWidth, shaftEnd - shaftStart);

  // Two teeth poking out the right side near the tip.
  const toothH = shaftWidth * 0.7;
  ctx.fillStyle = COLORS.keyShaft;
  ctx.fillRect(shaftWidth / 2, shaftEnd - toothH * 1.5, toothH, toothH * 0.6);
  ctx.fillRect(shaftWidth / 2, shaftEnd - toothH * 0.6, toothH * 1.4, toothH * 0.6);
  ctx.strokeRect(shaftWidth / 2, shaftEnd - toothH * 1.5, toothH, toothH * 0.6);
  ctx.strokeRect(shaftWidth / 2, shaftEnd - toothH * 0.6, toothH * 1.4, toothH * 0.6);
};

// Hangs a key off the ring at the given slot. The key's bow sits on the
// ring's circumference; the shaft extends outward + downward according to
// the slot's tilt.
const drawHangingKey = (ctx, cx, cy, ringRadius, slot, length) => {
  const bowX = cx + Math.cos(slot.angle) * ringRadius;
  const bowY = cy + Math.sin(slot.angle) * ringRadius;
  ctx.save();
  ctx.translate(bowX, bowY);
  ctx.rotate(slot.angle - Math.PI / 2 + slot.tilt);
  drawKeyLocal(ctx, length);
  ctx.restore();
};

// Layout: ring centered horizontally, sitting in the upper portion of the
// `outerSize` box so hanging keys can extend below it without clipping.
export const drawKeyring = (ctx, x, y, keyCount, outerSize) => {
  const cx = x + outerSize * 0.5;
  const cy = y + outerSize * 0.32;
  const ringRadius = outerSize * 0.22;
  const keyLength = outerSize * 0.55;
  const visibleKeys = Math.max(0, Math.min(keyCount, KEY_SLOTS.length));

  ctx.save();
  drawRing(ctx, cx, cy, ringRadius);
  // Draw hangs in reverse order so center key sits in front of side keys
  // when overlap occurs at high counts.
  for (let i = visibleKeys - 1; i >= 0; i--) {
    drawHangingKey(ctx, cx, cy, ringRadius, KEY_SLOTS[i], keyLength);
  }
  ctx.restore();
};
