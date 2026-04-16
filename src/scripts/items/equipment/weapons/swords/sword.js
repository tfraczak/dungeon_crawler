import createWeapon from "../weapon";
import GAME_CONFIG from "../../../../core/game_config";

// Sword: an arc-shaped melee weapon.
// Inherits from createWeapon (equipment > item). Instance stats default
// from GAME_CONFIG.sword but can be overridden per sword variant.
function createSword(overrides = {}) {
  const defaults = GAME_CONFIG.sword;
  const sword = createWeapon({
    name: overrides.name ?? "Sword",
    description: overrides.description ?? "A trusty blade",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? "slash",
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
  });
  sword.arc = overrides.arc ?? defaults.arc;
  sword.cooldown = overrides.cooldown ?? defaults.cooldown;
  sword.duration = overrides.duration ?? defaults.duration;
  sword.staminaCost = overrides.staminaCost ?? defaults.staminaCost;

  // Returns the full arc wedge used for hit detection.
  // The wedge is centered on baseAngle (the player's facing direction)
  // and spans sword.arc radians, extending sword.range pixels from center.
  sword.computeHitbox = (center, facing) => {
    const [cx, cy] = center;
    const halfArc = sword.arc / 2;
    let baseAngle;
    switch (facing) {
      case "up":    baseAngle = -Math.PI / 2; break;
      case "down":  baseAngle = Math.PI / 2; break;
      case "left":  baseAngle = Math.PI; break;
      case "right": baseAngle = 0; break;
    }
    return {
      x: cx,
      y: cy,
      range: sword.range,
      startAngle: baseAngle - halfArc,
      endAngle: baseAngle + halfArc,
      baseAngle,
    };
  };

  // Draws the animated slash crescent. The visual sweep grows from
  // startAngle toward endAngle over the attack duration, with a tapered
  // crescent shape, leading-edge glow, hilt, and crossguard.
  sword.drawSlash = (ctx, center, facing, attackTimer) => {
    const hitbox = sword.computeHitbox(center, facing);
    const progress = 1 - (attackTimer / sword.duration);
    const arcSpan = hitbox.endAngle - hitbox.startAngle;
    const sweepStart = hitbox.startAngle;
    const sweepEnd = hitbox.startAngle + arcSpan * progress;
    const outerR = hitbox.range;
    const innerR = hitbox.range * 0.4;
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

    const hiltAngle = sweepEnd;
    const hiltInner = innerR * 0.45;
    const hiltOuter = innerR * 0.95;
    ctx.beginPath();
    ctx.moveTo(hitbox.x + Math.cos(hiltAngle) * hiltInner, hitbox.y + Math.sin(hiltAngle) * hiltInner);
    ctx.lineTo(hitbox.x + Math.cos(hiltAngle) * hiltOuter, hitbox.y + Math.sin(hiltAngle) * hiltOuter);
    ctx.strokeStyle = `rgba(60, 50, 70, ${alpha})`;
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.stroke();

    const crossLen = 5;
    const perpAngle = hiltAngle + Math.PI / 2;
    const guardX = hitbox.x + Math.cos(hiltAngle) * hiltOuter;
    const guardY = hitbox.y + Math.sin(hiltAngle) * hiltOuter;
    ctx.beginPath();
    ctx.moveTo(guardX + Math.cos(perpAngle) * crossLen, guardY + Math.sin(perpAngle) * crossLen);
    ctx.lineTo(guardX - Math.cos(perpAngle) * crossLen, guardY - Math.sin(perpAngle) * crossLen);
    ctx.strokeStyle = `rgba(50, 40, 60, ${alpha})`;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
  };

  // Arc-wedge vs AABB collision. Returns true if any part of the arc
  // wedge overlaps the target's collision box. Checks performed in
  // order of increasing cost:
  //   1. Nearest-point range reject (cheap bounding check)
  //   2. Arc origin inside the box
  //   3. Any box corner inside the wedge
  //   4. Wedge straight edges (the two radii) intersect box edges
  //   5. Circular arc boundary intersects box edges
  sword.hitsTarget = (hitbox, colBox) => {
    const bx = colBox.pos[0];
    const by = colBox.pos[1];
    const bw = colBox.width;
    const bh = colBox.height;

    // 1. Quick range reject: closest point on AABB to arc origin
    const closestX = Math.max(bx, Math.min(hitbox.x, bx + bw));
    const closestY = Math.max(by, Math.min(hitbox.y, by + bh));
    const dx = closestX - hitbox.x;
    const dy = closestY - hitbox.y;
    if (dx * dx + dy * dy > hitbox.range * hitbox.range) return false;

    // 2. Arc origin inside the box
    if (hitbox.x >= bx && hitbox.x <= bx + bw && hitbox.y >= by && hitbox.y <= by + bh) {
      return true;
    }

    // 3. Any box corner inside the wedge (within range and angular bounds)
    const corners = [
      [bx, by], [bx + bw, by],
      [bx, by + bh], [bx + bw, by + bh],
    ];
    for (const [cx, cy] of corners) {
      if (pointInWedge(cx, cy, hitbox)) return true;
    }

    // 4. Wedge straight edges (radii at startAngle and endAngle) vs box
    if (segmentIntersectsBox(hitbox, hitbox.startAngle, bx, by, bw, bh)) return true;
    if (segmentIntersectsBox(hitbox, hitbox.endAngle, bx, by, bw, bh)) return true;

    // 5. Circular arc boundary vs box edges
    if (arcIntersectsBox(hitbox, bx, by, bw, bh)) return true;

    return false;
  };

  return sword;
}

// Shifts angle into the range [ref, ref + 2π] for comparison
function normalizeAngle(angle, ref) {
  while (angle < ref) angle += Math.PI * 2;
  while (angle > ref + Math.PI * 2) angle -= Math.PI * 2;
  return angle;
}

// True if point (px, py) is within both the range and angular bounds of the wedge
function pointInWedge(px, py, hitbox) {
  const dx = px - hitbox.x;
  const dy = py - hitbox.y;
  if (dx * dx + dy * dy > hitbox.range * hitbox.range) return false;
  const angle = normalizeAngle(Math.atan2(dy, dx), hitbox.startAngle);
  return angle >= hitbox.startAngle && angle <= hitbox.endAngle;
}

// Tests if a wedge radius (line from arc origin at given angle) crosses the AABB
function segmentIntersectsBox(hitbox, angle, bx, by, bw, bh) {
  const ex = hitbox.x + Math.cos(angle) * hitbox.range;
  const ey = hitbox.y + Math.sin(angle) * hitbox.range;
  return lineSegmentIntersectsAABB(hitbox.x, hitbox.y, ex, ey, bx, by, bw, bh);
}

// Tests a line segment against all four edges of an AABB
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

// Standard two-segment intersection test using parametric t/u values
function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const denom = (bx - ax) * (dy - cy) - (by - ay) * (dx - cx);
  if (Math.abs(denom) < 1e-10) return false;
  const t = ((cx - ax) * (dy - cy) - (cy - ay) * (dx - cx)) / denom;
  const u = ((cx - ax) * (by - ay) - (cy - ay) * (bx - ax)) / denom;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

// Tests the circular arc boundary against all four AABB edges
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

// Circle-line intersection (quadratic), filtered to points within the arc's angular bounds
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

export default createSword;
