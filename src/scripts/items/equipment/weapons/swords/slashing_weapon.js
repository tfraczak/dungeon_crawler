import createWeapon from "@items/equipment/weapons/weapon";
import { playSlashHit, playSlashSwing } from "@items/equipment/weapons/swords/sound";

const SWORD_SPRITE_SIZE = 48;
const SWORD_NATURAL_BLADE_ANGLE = -Math.PI / 4;
const SWORD_SPRITE_CENTER_RANGE_RATIO = 0.74;
const SLASH_OUTER_RANGE_RATIO = 0.92;
const SLASH_INNER_RANGE_RATIO = 0.56;

function bladeGeometry(range) {
  return {
    spriteCenterR: range * SWORD_SPRITE_CENTER_RANGE_RATIO,
    slashOuterR: range * SLASH_OUTER_RANGE_RATIO,
    slashInnerR: range * SLASH_INNER_RANGE_RATIO,
  };
}

function attackProgress(attackTimer, duration) {
  if (!Number.isFinite(attackTimer)) return 1;
  return Math.max(0, Math.min(1, 1 - (attackTimer / duration)));
}

function createSlashingWeapon({
  defaults,
  overrides = {},
  type,
  name,
  description,
}) {
  const weapon = createWeapon({
    name: overrides.name ?? name,
    description: overrides.description ?? description,
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? "slash",
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    type,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
  });
  weapon.arc = overrides.arc ?? defaults.arc;
  weapon.cooldown = overrides.cooldown ?? defaults.cooldown;
  weapon.duration = overrides.duration ?? defaults.duration;
  weapon.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  weapon.sprite = overrides.sprite ?? null;
  weapon.onAttackStart = () => playSlashSwing();
  weapon.onHit = () => playSlashHit();

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
    const startAngle = baseAngle - halfArc;
    const progress = attackProgress(attackTimer, weapon.duration);
    return {
      x: cx,
      y: cy,
      range: weapon.range,
      startAngle,
      endAngle: startAngle + (weapon.arc * progress),
      baseAngle,
    };
  };

  weapon.drawSlash = (ctx, center, facing, attackTimer) => {
    const hitbox = weapon.computeHitbox(center, facing, attackTimer);
    const progress = attackProgress(attackTimer, weapon.duration);
    const sweepStart = hitbox.startAngle;
    const sweepEnd = hitbox.endAngle;
    const { slashOuterR: outerR, slashInnerR: innerR } = bladeGeometry(hitbox.range);
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
    ctx.fillStyle = `rgba(230, 220, 240, ${alpha})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(160, 150, 180, ${alpha * 0.6})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const glowAlpha = alpha * 0.4;
    const midR = (outerR + innerR) / 2;
    const glowSpan = (sweepEnd - sweepStart) * 0.25;
    ctx.beginPath();
    ctx.arc(hitbox.x, hitbox.y, midR, Math.max(sweepEnd - glowSpan, sweepStart), sweepEnd);
    ctx.strokeStyle = `rgba(255, 255, 255, ${glowAlpha})`;
    ctx.lineWidth = (outerR - innerR) * 0.3;
    ctx.stroke();

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
    ctx.rotate(angle - SWORD_NATURAL_BLADE_ANGLE);
    ctx.drawImage(
      weapon.sprite,
      -SWORD_SPRITE_SIZE / 2,
      -SWORD_SPRITE_SIZE / 2,
      SWORD_SPRITE_SIZE,
      SWORD_SPRITE_SIZE,
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

function segmentIntersectsBox(hitbox, angle, bx, by, bw, bh) {
  const ex = hitbox.x + Math.cos(angle) * hitbox.range;
  const ey = hitbox.y + Math.sin(angle) * hitbox.range;
  return lineSegmentIntersectsAABB(hitbox.x, hitbox.y, ex, ey, bx, by, bw, bh);
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

function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const denom = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
  if (Math.abs(denom) < 1e-10) return false;
  const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / denom;
  const u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / denom;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
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

export default createSlashingWeapon;
