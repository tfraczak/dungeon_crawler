// Linear forward-thrust attack: a rectangular hitbox extending from the
// player's front face out along the facing direction. Shared by every
// "stab" family (daggers, polearms, wands, fists). Range/thrustWidth come
// from the weapon's config so polearms naturally reach further than
// daggers/wands/fists.
//
// The visual is a brief streaking trail along the thrust line. The trail's
// `style` ("piercing" / "polearm" / "wand" / "fist") chooses a color
// palette and optional tip overlay so each family reads distinct, but the
// hitbox geometry is identical.

import * as GAME_CONFIG from "@core/game_config";

const SPRITE_SIZE = 48;
// Sprites point upper-LEFT (-3π/4) in their rest pose; see arc_attack.js
// for the matching convention. The renderer rotates by
// `thrustAngle - NATURAL_BLADE_ANGLE` to align the sprite with the thrust
// direction. Each thrust weapon stores a `spriteTipOffset` on itself so the
// drawn tip lines up with the hitbox tip — daggers (~11), wands (~14), and
// polearms (~28) all live at very different distances from sprite center,
// so a single shared constant doesn't work.
const NATURAL_BLADE_ANGLE = -3 * Math.PI / 4;
const DEFAULT_SPRITE_TIP_OFFSET = 11;

const DIRECTION = Object.freeze({
  up: Object.freeze({ x: 0, y: -1 }),
  down: Object.freeze({ x: 0, y: 1 }),
  left: Object.freeze({ x: -1, y: 0 }),
  right: Object.freeze({ x: 1, y: 0 }),
});

const STYLE = Object.freeze({
  piercing: Object.freeze({
    trail: (alpha) => `rgba(80, 190, 255, ${alpha * 0.32})`,
    streak: (alpha, t) => `rgba(255, 255, 255, ${alpha * (0.08 + (t * t * 0.75))})`,
  }),
  polearm: Object.freeze({
    // Warmer steel tone with a faint amber edge — reads as a heavier, more
    // deliberate thrust than a quick dagger jab.
    trail: (alpha) => `rgba(220, 200, 130, ${alpha * 0.30})`,
    streak: (alpha, t) => `rgba(255, 240, 200, ${alpha * (0.08 + (t * t * 0.7))})`,
  }),
  wand: Object.freeze({
    // Pale violet/silver — a small, sharp poke for non-magic users.
    trail: (alpha) => `rgba(220, 200, 255, ${alpha * 0.28})`,
    streak: (alpha, t) => `rgba(255, 250, 255, ${alpha * (0.08 + (t * t * 0.7))})`,
  }),
  fist: Object.freeze({
    // Warm skin-tone speed lines, paired with a drawn knuckle at the tip
    // (drawn in `drawSlash` after the trail). The trail is faint so it
    // reads as motion blur behind the punching hand, not as a weapon glint.
    trail: (alpha) => `rgba(245, 200, 165, ${alpha * 0.18})`,
    streak: (alpha, t) => `rgba(255, 230, 210, ${alpha * (0.05 + (t * t * 0.4))})`,
    drawTip: (ctx, tipX, tipY, alpha, progress, weapon) => {
      // Knuckle disc — peachy fill with a darker outline. Pulses slightly
      // larger near the apex of the punch (progress ~0.65–0.85) so the
      // impact reads visually.
      const apexBoost = progress > 0.55 && progress < 0.92
        ? 1 + (Math.sin((progress - 0.55) / 0.37 * Math.PI) * 0.18)
        : 1;
      const fistRadius = (weapon.thrustWidth / 2 - 1) * apexBoost;
      ctx.beginPath();
      ctx.arc(tipX, tipY, fistRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 200, 165, ${alpha})`;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(80, 50, 30, ${alpha * 0.85})`;
      ctx.stroke();

      // Tiny knuckle indents to read as fingers (small dimples on the front
      // half of the disc, perpendicular to the punch).
      ctx.fillStyle = `rgba(180, 130, 95, ${alpha * 0.7})`;
      const dimple = Math.max(0.7, fistRadius * 0.18);
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(tipX, tipY + (i * fistRadius * 0.45), dimple, 0, Math.PI * 2);
        ctx.fill();
      }

      // Brief impact ring near apex.
      if (progress > 0.6 && progress < 0.95) {
        const burst = (progress - 0.6) / 0.35;
        ctx.beginPath();
        ctx.arc(tipX, tipY, fistRadius + 2 + (burst * (weapon.thrustWidth * 0.6)), 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(255, 240, 220, ${(1 - burst) * 0.55 * alpha})`;
        ctx.stroke();
      }
    },
  }),
});

function attackOrigin(center, facing) {
  const dir = DIRECTION[facing] ?? DIRECTION.down;
  const front = GAME_CONFIG.entities.player.spriteDims[0] / 2;
  return [
    center[0] + (dir.x * front),
    center[1] + (dir.y * front),
  ];
}

function quadraticPoint(start, control, end, t) {
  const inv = 1 - t;
  return [
    (inv * inv * start[0]) + (2 * inv * t * control[0]) + (t * t * end[0]),
    (inv * inv * start[1]) + (2 * inv * t * control[1]) + (t * t * end[1]),
  ];
}

// Composes the thrust-attack behavior onto a weapon produced by createWeapon().
// Family bases pass `style` to pick the trail palette; thrust geometry is
// driven entirely by `weapon.range` and `weapon.thrustWidth`.
export function attachThrustAttack(weapon, { style = "piercing" } = {}) {
  const styleDef = STYLE[style] ?? STYLE.piercing;

  weapon.computeHitbox = (center, facing) => {
    const halfWidth = weapon.thrustWidth / 2;
    const [startX, startY] = attackOrigin(center, facing);
    switch (facing) {
      case "up":
        return { x: startX - halfWidth, y: startY - weapon.range, width: weapon.thrustWidth, height: weapon.range };
      case "down":
        return { x: startX - halfWidth, y: startY, width: weapon.thrustWidth, height: weapon.range };
      case "left":
        return { x: startX - weapon.range, y: startY - halfWidth, width: weapon.range, height: weapon.thrustWidth };
      case "right":
        return { x: startX, y: startY - halfWidth, width: weapon.range, height: weapon.thrustWidth };
      default:
        return { x: startX - halfWidth, y: startY, width: weapon.thrustWidth, height: weapon.range };
    }
  };

  weapon.drawSlash = (ctx, center, facing, attackTimer) => {
    const dir = DIRECTION[facing] ?? DIRECTION.down;
    const origin = attackOrigin(center, facing);
    const progress = 1 - (attackTimer / weapon.duration);
    const thrust = 1 - Math.pow(1 - progress, 3);
    const tipDistance = weapon.range * thrust;
    const trailLength = weapon.range * (0.22 + (0.3 * thrust));
    const alpha = Math.max(0, 1 - progress * 0.12);
    const tipX = origin[0] + (dir.x * tipDistance);
    const tipY = origin[1] + (dir.y * tipDistance);
    const tailX = tipX - (dir.x * trailLength);
    const tailY = tipY - (dir.y * trailLength);
    const perp = { x: -dir.y, y: dir.x };
    const sideOffset = weapon.thrustWidth * 0.22;

    ctx.save();
    weapon.drawSprite(ctx, origin, dir, tipDistance, alpha);

    ctx.lineCap = "round";
    for (const side of [-1, 1]) {
      const start = [
        tailX + (perp.x * sideOffset * side),
        tailY + (perp.y * sideOffset * side),
      ];
      const control = [
        tipX - (dir.x * trailLength * 0.18) + (perp.x * sideOffset * 0.12 * side),
        tipY - (dir.y * trailLength * 0.18) + (perp.y * sideOffset * 0.12 * side),
      ];
      const end = [tipX, tipY];

      ctx.beginPath();
      ctx.moveTo(start[0], start[1]);
      ctx.quadraticCurveTo(control[0], control[1], end[0], end[1]);
      ctx.strokeStyle = styleDef.trail(alpha);
      ctx.lineWidth = 4.5;
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        const startT = i / 6;
        const endT = (i + 1) / 6;
        const [sx, sy] = quadraticPoint(start, control, end, startT);
        const [ex, ey] = quadraticPoint(start, control, end, endT);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = styleDef.streak(alpha, endT);
        ctx.lineWidth = 3 - (endT * 1.35);
        ctx.stroke();
      }
    }

    if (styleDef.drawTip) styleDef.drawTip(ctx, tipX, tipY, alpha, progress, weapon);
    ctx.restore();
  };

  weapon.drawSprite = (ctx, center, dir, tipDistance, alpha) => {
    if (!weapon.sprite?.complete) return;

    const tipOffset = weapon.spriteTipOffset ?? DEFAULT_SPRITE_TIP_OFFSET;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(
      center[0] + (dir.x * (tipDistance - tipOffset)),
      center[1] + (dir.y * (tipDistance - tipOffset)),
    );
    ctx.rotate(Math.atan2(dir.y, dir.x) - NATURAL_BLADE_ANGLE);
    ctx.drawImage(
      weapon.sprite,
      -SPRITE_SIZE / 2,
      -SPRITE_SIZE / 2,
      SPRITE_SIZE,
      SPRITE_SIZE,
    );
    ctx.restore();
  };

  weapon.hitsTarget = (hitbox, colBox) => (
    hitbox.x < colBox.pos[0] + colBox.width
    && hitbox.x + hitbox.width > colBox.pos[0]
    && hitbox.y < colBox.pos[1] + colBox.height
    && hitbox.y + hitbox.height > colBox.pos[1]
  );

  return weapon;
}

export default attachThrustAttack;
