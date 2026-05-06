// Sweeping arc attack: a hitbox shaped like a wedge of a circle that sweeps
// from the start angle toward the end angle as the swing animates. Shared by
// every "swing" family (swords, axes, maces, hammers, staves) — the family's
// `style` ("slashing" or "crushing") tunes the trail color and apex effect so
// each family reads visually distinct, but the geometry / hit logic is the
// same.

const SPRITE_SIZE = 48;
// Every generated weapon sprite is drawn with its business end (blade tip,
// hammer head, axe head, spear point, etc.) pointing toward the upper-LEFT
// in its rest pose — i.e. along the angle -3π/4 from sprite center. The
// runtime renderer rotates the sprite by `swingAngle - NATURAL_BLADE_ANGLE`
// to align that natural orientation with the current swing direction.
const NATURAL_BLADE_ANGLE = -3 * Math.PI / 4;
const SPRITE_CENTER_RANGE_RATIO = 0.74;
const ARC_OUTER_RANGE_RATIO = 0.92;
const ARC_INNER_RANGE_RATIO = 0.56;

const STYLE = Object.freeze({
  slashing: Object.freeze({
    fill: (alpha) => `rgba(230, 220, 240, ${alpha})`,
    stroke: (alpha) => `rgba(160, 150, 180, ${alpha * 0.6})`,
    glow: (alpha) => `rgba(255, 255, 255, ${alpha})`,
    glowWidthRatio: 0.30,
    apex: null,
  }),
  crushing: Object.freeze({
    // Heavier amber trail with a denser core to read as a brute-force swing
    // (mace / hammer / staff). The apex puff hints at impact concussion.
    fill: (alpha) => `rgba(248, 200, 120, ${alpha * 0.85})`,
    stroke: (alpha) => `rgba(170, 110, 50, ${alpha * 0.7})`,
    glow: (alpha) => `rgba(255, 240, 200, ${alpha})`,
    glowWidthRatio: 0.42,
    apex: (ctx, hitbox, sweepEnd, alpha) => {
      const apexX = hitbox.x + Math.cos(sweepEnd) * (hitbox.range * 0.78);
      const apexY = hitbox.y + Math.sin(sweepEnd) * (hitbox.range * 0.78);
      ctx.beginPath();
      ctx.arc(apexX, apexY, hitbox.range * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 220, 140, ${alpha * 0.18})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(apexX, apexY, hitbox.range * 0.10, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 200, ${alpha * 0.45})`;
      ctx.fill();
    },
  }),
});

function bladeGeometry(range) {
  return {
    spriteCenterR: range * SPRITE_CENTER_RANGE_RATIO,
    arcOuterR: range * ARC_OUTER_RANGE_RATIO,
    arcInnerR: range * ARC_INNER_RANGE_RATIO,
  };
}

function attackProgress(attackTimer, duration) {
  if (!Number.isFinite(attackTimer)) return 1;
  return Math.max(0, Math.min(1, 1 - (attackTimer / duration)));
}

function normalizeAngle(angle, ref) {
  while (angle < ref) angle += Math.PI * 2;
  while (angle > ref + Math.PI * 2) angle -= Math.PI * 2;
  return angle;
}

function pointInWedge(px, py, hitbox) {
  const dx = px - hitbox.x;
  const dy = py - hitbox.y;
  if (dx * dx + dy * dy > hitbox.range * hitbox.range) return false;
  const angle = normalizeAngle(Math.atan2(dy, dx), hitbox.startAngle);
  return angle >= hitbox.startAngle && angle <= hitbox.endAngle;
}

function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const denom = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
  if (Math.abs(denom) < 1e-10) return false;
  const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / denom;
  const u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / denom;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

function lineSegmentIntersectsAABB(x1, y1, x2, y2, bx, by, bw, bh) {
  const edges = [
    [bx, by, bx + bw, by],
    [bx, by + bh, bx + bw, by + bh],
    [bx, by, bx, by + bh],
    [bx + bw, by, bx + bw, by + bh],
  ];
  for (const [ex1, ey1, ex2, ey2] of edges) {
    if (segmentsIntersect(x1, y1, x2, y2, ex1, ey1, ex2, ey2)) return true;
  }
  return false;
}

function segmentIntersectsBox(hitbox, angle, bx, by, bw, bh) {
  const ex = hitbox.x + Math.cos(angle) * hitbox.range;
  const ey = hitbox.y + Math.sin(angle) * hitbox.range;
  return lineSegmentIntersectsAABB(hitbox.x, hitbox.y, ex, ey, bx, by, bw, bh);
}

function arcIntersectsSegment(hitbox, x1, y1, x2, y2) {
  const sdx = x2 - x1;
  const sdy = y2 - y1;
  const fx = x1 - hitbox.x;
  const fy = y1 - hitbox.y;
  const a = sdx * sdx + sdy * sdy;
  const b = 2 * (fx * sdx + fy * sdy);
  const c = fx * fx + fy * fy - hitbox.range * hitbox.range;
  let discriminant = b * b - 4 * a * c;
  if (discriminant < 0) return false;

  discriminant = Math.sqrt(discriminant);
  const t1 = (-b - discriminant) / (2 * a);
  const t2 = (-b + discriminant) / (2 * a);

  for (const t of [t1, t2]) {
    if (t >= 0 && t <= 1) {
      const ix = x1 + t * sdx;
      const iy = y1 + t * sdy;
      const angle = normalizeAngle(Math.atan2(iy - hitbox.y, ix - hitbox.x), hitbox.startAngle);
      if (angle >= hitbox.startAngle && angle <= hitbox.endAngle) return true;
    }
  }
  return false;
}

function arcIntersectsBox(hitbox, bx, by, bw, bh) {
  const edges = [
    [bx, by, bx + bw, by],
    [bx, by + bh, bx + bw, by + bh],
    [bx, by, bx, by + bh],
    [bx + bw, by, bx + bw, by + bh],
  ];
  for (const [ex1, ey1, ex2, ey2] of edges) {
    if (arcIntersectsSegment(hitbox, ex1, ey1, ex2, ey2)) return true;
  }
  return false;
}

// Composes the arc-attack behavior onto a weapon produced by createWeapon().
// `style` selects the visual treatment (slashing vs crushing). `reverse`
// flips the sweep direction — used by asymmetric sprites (one-handed axes)
// where the rest-pose cutting edge is on the perpendicular that would
// otherwise trail the swing. Reversing the sweep makes that side lead
// instead. The actual damage type / profile is independent and lives on
// the weapon itself.
export function attachArcAttack(weapon, { style = "slashing", reverse = false } = {}) {
  const styleDef = STYLE[style] ?? STYLE.slashing;
  const sweepSign = reverse ? -1 : 1;

  weapon.computeHitbox = (center, facing, attackTimer) => {
    const [cx, cy] = center;
    const halfArc = weapon.arc / 2;
    let baseAngle;
    switch (facing) {
      case "up":    baseAngle = -Math.PI / 2; break;
      case "down":  baseAngle = Math.PI / 2; break;
      case "left":  baseAngle = Math.PI; break;
      case "right": baseAngle = 0; break;
    }
    const progress = attackProgress(attackTimer, weapon.duration);
    // Direction-aware sweep: `sweepFrom` is where the swing began, `sweepTo`
    // is the head's current angle. For non-reverse swings sweepFrom < sweepTo
    // (matching the original convention); for reverse, sweepFrom > sweepTo.
    const sweepFrom = baseAngle - (sweepSign * halfArc);
    const sweepTo = sweepFrom + (sweepSign * weapon.arc * progress);
    // Collision tests below (pointInWedge / arcIntersectsSegment /
    // segmentIntersectsBox) require startAngle <= endAngle, so expose those
    // as min/max of the sweep regardless of direction.
    return {
      x: cx,
      y: cy,
      range: weapon.range,
      startAngle: Math.min(sweepFrom, sweepTo),
      endAngle: Math.max(sweepFrom, sweepTo),
      sweepFrom,
      sweepTo,
      baseAngle,
    };
  };

  weapon.drawSlash = (ctx, center, facing, attackTimer) => {
    const hitbox = weapon.computeHitbox(center, facing, attackTimer);
    const progress = attackProgress(attackTimer, weapon.duration);
    const sweepStart = hitbox.sweepFrom;
    const sweepEnd = hitbox.sweepTo;
    const { arcOuterR: outerR, arcInnerR: innerR } = bladeGeometry(hitbox.range);
    const alpha = Math.max(0, 0.85 * (1 - progress * 0.5));

    ctx.save();

    ctx.beginPath();
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = sweepStart + (sweepEnd - sweepStart) * t;
      ctx.lineTo(hitbox.x + Math.cos(angle) * outerR, hitbox.y + Math.sin(angle) * outerR);
    }
    for (let i = steps; i >= 0; i--) {
      const t = i / steps;
      const angle = sweepStart + (sweepEnd - sweepStart) * t;
      const taper = outerR - (outerR - innerR) * Math.pow(t, 3);
      ctx.lineTo(hitbox.x + Math.cos(angle) * taper, hitbox.y + Math.sin(angle) * taper);
    }
    ctx.closePath();
    ctx.fillStyle = styleDef.fill(alpha);
    ctx.fill();
    ctx.strokeStyle = styleDef.stroke(alpha);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Glow segment trailing the head — the most recent ~25% of the swept
    // arc, ending at the head's current angle. `ctx.arc` always traces from
    // the smaller angle to the larger one CW, so we sort the two endpoints
    // before drawing instead of relying on `sweepEnd > sweepStart`.
    const glowAlpha = alpha * 0.4;
    const midR = (outerR + innerR) / 2;
    const sweepDelta = sweepEnd - sweepStart;
    const glowSpan = Math.abs(sweepDelta) * 0.25;
    const glowFrom = sweepEnd - (Math.sign(sweepDelta) * glowSpan);
    const glowLow = Math.min(glowFrom, sweepEnd);
    const glowHigh = Math.max(glowFrom, sweepEnd);
    ctx.beginPath();
    ctx.arc(hitbox.x, hitbox.y, midR, glowLow, glowHigh);
    ctx.strokeStyle = styleDef.glow(glowAlpha);
    ctx.lineWidth = (outerR - innerR) * styleDef.glowWidthRatio;
    ctx.stroke();

    if (styleDef.apex) styleDef.apex(ctx, hitbox, sweepEnd, alpha);

    weapon.drawSprite(ctx, hitbox, sweepEnd, alpha);

    ctx.restore();
  };

  weapon.drawSprite = (ctx, hitbox, angle, alpha) => {
    if (!weapon.sprite?.complete) return;

    const { spriteCenterR } = bladeGeometry(weapon.range);

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(
      hitbox.x + Math.cos(angle) * spriteCenterR,
      hitbox.y + Math.sin(angle) * spriteCenterR,
    );
    ctx.rotate(angle - NATURAL_BLADE_ANGLE);
    ctx.drawImage(
      weapon.sprite,
      -SPRITE_SIZE / 2,
      -SPRITE_SIZE / 2,
      SPRITE_SIZE,
      SPRITE_SIZE,
    );
    ctx.restore();
  };

  weapon.hitsTarget = (hitbox, colBox) => {
    const bx = colBox.pos[0];
    const by = colBox.pos[1];
    const bw = colBox.width;
    const bh = colBox.height;

    const closestX = Math.max(bx, Math.min(hitbox.x, bx + bw));
    const closestY = Math.max(by, Math.min(hitbox.y, by + bh));
    const dx = closestX - hitbox.x;
    const dy = closestY - hitbox.y;
    if (dx * dx + dy * dy > hitbox.range * hitbox.range) return false;

    if (hitbox.x >= bx && hitbox.x <= bx + bw && hitbox.y >= by && hitbox.y <= by + bh) {
      return true;
    }

    const corners = [
      [bx, by], [bx + bw, by],
      [bx, by + bh], [bx + bw, by + bh],
    ];
    for (const [cx, cy] of corners) {
      if (pointInWedge(cx, cy, hitbox)) return true;
    }

    if (segmentIntersectsBox(hitbox, hitbox.startAngle, bx, by, bw, bh)) return true;
    if (segmentIntersectsBox(hitbox, hitbox.endAngle, bx, by, bw, bh)) return true;
    return arcIntersectsBox(hitbox, bx, by, bw, bh);
  };

  return weapon;
}

export default attachArcAttack;
