import createWeapon from "@items/equipment/weapons/weapon";
import * as GAME_CONFIG from "@core/game_config";

const DIRECTION = Object.freeze({
  up: Object.freeze({ x: 0, y: -1 }),
  down: Object.freeze({ x: 0, y: 1 }),
  left: Object.freeze({ x: -1, y: 0 }),
  right: Object.freeze({ x: 1, y: 0 }),
});

const DAGGER_SPRITE_SIZE = 48;
const DAGGER_NATURAL_BLADE_ANGLE = -Math.PI / 4;
const DAGGER_SPRITE_CENTER = DAGGER_SPRITE_SIZE / 2;
const DAGGER_TIP = Object.freeze([28, 19]);
const PLAYER_FRONT_OFFSET = GAME_CONFIG.entities.player.spriteDims[0] / 2;
const DAGGER_TIP_OFFSET = (
  ((DAGGER_TIP[0] - DAGGER_SPRITE_CENTER) * Math.cos(DAGGER_NATURAL_BLADE_ANGLE))
  + ((DAGGER_TIP[1] - DAGGER_SPRITE_CENTER) * Math.sin(DAGGER_NATURAL_BLADE_ANGLE))
);

function attackOrigin(center, facing) {
  const dir = DIRECTION[facing] ?? DIRECTION.down;
  return [
    center[0] + (dir.x * PLAYER_FRONT_OFFSET),
    center[1] + (dir.y * PLAYER_FRONT_OFFSET),
  ];
}

function quadraticPoint(start, control, end, t) {
  const inv = 1 - t;
  return [
    (inv * inv * start[0]) + (2 * inv * t * control[0]) + (t * t * end[0]),
    (inv * inv * start[1]) + (2 * inv * t * control[1]) + (t * t * end[1]),
  ];
}

function createDagger(overrides = {}) {
  const defaults = GAME_CONFIG.items.equipment.weapons.daggers.dagger;
  const dagger = createWeapon({
    name: overrides.name ?? "Dagger",
    description: overrides.description ?? "A quick thrusting blade",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? "pierce",
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    type: "dagger",
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
  });
  dagger.cooldown = overrides.cooldown ?? defaults.cooldown;
  dagger.duration = overrides.duration ?? defaults.duration;
  dagger.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  dagger.thrustWidth = overrides.thrustWidth ?? defaults.thrustWidth;
  dagger.sprite = overrides.sprite ?? null;

  dagger.computeHitbox = (center, facing) => {
    const halfWidth = dagger.thrustWidth / 2;
    const [startX, startY] = attackOrigin(center, facing);

    switch (facing) {
      case "up":
        return { x: startX - halfWidth, y: startY - dagger.range, width: dagger.thrustWidth, height: dagger.range };
      case "down":
        return { x: startX - halfWidth, y: startY, width: dagger.thrustWidth, height: dagger.range };
      case "left":
        return { x: startX - dagger.range, y: startY - halfWidth, width: dagger.range, height: dagger.thrustWidth };
      case "right":
        return { x: startX, y: startY - halfWidth, width: dagger.range, height: dagger.thrustWidth };
      default:
        return { x: startX - halfWidth, y: startY, width: dagger.thrustWidth, height: dagger.range };
    }
  };

  dagger.drawSlash = (ctx, center, facing, attackTimer) => {
    const dir = DIRECTION[facing] ?? DIRECTION.down;
    const origin = attackOrigin(center, facing);
    const progress = 1 - (attackTimer / dagger.duration);
    const thrust = 1 - Math.pow(1 - progress, 3);
    const tipDistance = dagger.range * thrust;
    const trailLength = dagger.range * (0.22 + (0.3 * thrust));
    const alpha = Math.max(0, 1 - progress * 0.12);
    const tipX = origin[0] + (dir.x * tipDistance);
    const tipY = origin[1] + (dir.y * tipDistance);
    const tailX = tipX - (dir.x * trailLength);
    const tailY = tipY - (dir.y * trailLength);
    const perp = { x: -dir.y, y: dir.x };
    const sideOffset = dagger.thrustWidth * 0.22;

    ctx.save();
    dagger.drawSprite(ctx, origin, dir, tipDistance, alpha);

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
      ctx.strokeStyle = `rgba(80, 190, 255, ${alpha * 0.32})`;
      ctx.lineWidth = 4.5;
      ctx.stroke();

      for (let i = 0; i < 6; i++) {
        const startT = i / 6;
        const endT = (i + 1) / 6;
        const [startX, startY] = quadraticPoint(start, control, end, startT);
        const [endX, endY] = quadraticPoint(start, control, end, endT);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * (0.08 + (endT * endT * 0.75))})`;
        ctx.lineWidth = 3 - (endT * 1.35);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  dagger.drawSprite = (ctx, center, dir, tipDistance, alpha) => {
    if (!dagger.sprite?.complete) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(
      center[0] + (dir.x * (tipDistance - DAGGER_TIP_OFFSET)),
      center[1] + (dir.y * (tipDistance - DAGGER_TIP_OFFSET)),
    );
    ctx.rotate(Math.atan2(dir.y, dir.x) - DAGGER_NATURAL_BLADE_ANGLE);
    ctx.drawImage(
      dagger.sprite,
      -DAGGER_SPRITE_SIZE / 2,
      -DAGGER_SPRITE_SIZE / 2,
      DAGGER_SPRITE_SIZE,
      DAGGER_SPRITE_SIZE,
    );
    ctx.restore();
  };

  dagger.hitsTarget = (hitbox, colBox) => (
    hitbox.x < colBox.pos[0] + colBox.width
    && hitbox.x + hitbox.width > colBox.pos[0]
    && hitbox.y < colBox.pos[1] + colBox.height
    && hitbox.y + hitbox.height > colBox.pos[1]
  );

  return dagger;
}

export default createDagger;
