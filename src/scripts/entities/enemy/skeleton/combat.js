import * as GAME_CONFIG from "@core/game_config";
import Random from "@utils/random";
import createIceCrystal from "./ice_crystal";

const STAFF_LENGTH = 28;
const STAFF_ANGLE_OFFSET = Math.PI / 4;
const STAFF_SLASH_ANGLE = -Math.PI / 4;
const STAFF_BACKSLASH_ANGLE = -3 * Math.PI / 4;

const angleToward = (from, to) => Math.atan2(to[1] - from[1], to[0] - from[0]);
const playerBodyTarget = player => player.colBox.center ?? player.center;

const predictedTarget = (origin, player) => {
  const target = playerBodyTarget(player);
  const [vx, vy] = player.velocity ?? [0, 0];
  const dx = target[0] - origin[0];
  const dy = target[1] - origin[1];
  const speed = GAME_CONFIG.entities.enemy.skeletonMagic.projectileSpeed;
  const a = (vx * vx) + (vy * vy) - (speed * speed);
  const b = 2 * ((dx * vx) + (dy * vy));
  const c = (dx * dx) + (dy * dy);
  let interceptTime = 0;

  if (Math.abs(a) < 0.0001) {
    interceptTime = b === 0 ? 0 : -c / b;
  } else {
    const discriminant = (b * b) - (4 * a * c);
    if (discriminant >= 0) {
      const sqrt = Math.sqrt(discriminant);
      const t1 = (-b - sqrt) / (2 * a);
      const t2 = (-b + sqrt) / (2 * a);
      interceptTime = [t1, t2]
        .filter(t => t > 0)
        .sort((left, right) => left - right)[0] ?? 0;
    }
  }

  const maxTime = GAME_CONFIG.entities.enemy.skeletonMagic.projectileMaxDistance / speed;
  const t = Math.max(0, Math.min(interceptTime, maxTime));
  return [target[0] + (vx * t), target[1] + (vy * t)];
};

const predictedAimAngle = (origin, player) => angleToward(origin, predictedTarget(origin, player));
const directAimAngle = (origin, player) => angleToward(origin, playerBodyTarget(player));
const aimAngle = (origin, player, predictive) => (
  predictive ? predictedAimAngle(origin, player) : directAimAngle(origin, player)
);

const staffAngleFor = (skeleton) => {
  switch (skeleton.spriteDir) {
    case "right":
      return STAFF_SLASH_ANGLE;
    case "left":
      return STAFF_BACKSLASH_ANGLE;
    case "up":
    case "down":
      return skeleton.castStaffAngle ?? STAFF_SLASH_ANGLE;
    default:
      return skeleton.castAngle - STAFF_ANGLE_OFFSET;
  }
};

const staffGeometry = (skeleton) => {
  const staffAngle = staffAngleFor(skeleton);
  const base = [
    skeleton.center[0] - (Math.cos(staffAngle) * 6),
    skeleton.center[1] - 10 - (Math.sin(staffAngle) * 6),
  ];
  const tip = [
    base[0] + (Math.cos(staffAngle) * STAFF_LENGTH),
    base[1] + (Math.sin(staffAngle) * STAFF_LENGTH),
  ];
  return { base, staffAngle, tip };
};

export const setupSkeletonMagicCombat = (skeleton) => {
  const cfg = GAME_CONFIG.entities.enemy.skeletonMagic;
  skeleton.castCooldownTimer = 0;
  skeleton.castWindupTimer = 0;
  skeleton.castAngle = 0;
  skeleton.castPredictive = false;
  skeleton.castStaffAngle = STAFF_SLASH_ANGLE;

  skeleton.isCasting = () => skeleton.castWindupTimer > 0;

  const spawnCrystal = (player) => {
    const provisionalTip = staffGeometry(skeleton).tip;
    skeleton.castAngle = aimAngle(provisionalTip, player, skeleton.castPredictive);
    const { tip } = staffGeometry(skeleton);
    skeleton.room?.addEnemyProjectile?.(createIceCrystal({
      angle: skeleton.castAngle,
      pos: tip,
    }));
  };

  skeleton.hitPlayer = () => {
    const player = skeleton.gameState.session.player;
    if (!player || !skeleton.chasingPlayer) return;

    if (skeleton.castCooldownTimer > 0) skeleton.castCooldownTimer--;
    if (skeleton.castWindupTimer > 0) {
      skeleton.castAngle = aimAngle(skeleton.center, player, skeleton.castPredictive);
      skeleton.castWindupTimer--;
      if (skeleton.castWindupTimer === 0) {
        spawnCrystal(player);
        skeleton.castCooldownTimer = cfg.castCooldownFrames;
      }
      return;
    }

    if (skeleton.distToPlayer() <= cfg.castDistance && skeleton.castCooldownTimer === 0) {
      skeleton.castPredictive = Random.chance(0.5);
      skeleton.castStaffAngle = playerBodyTarget(player)[0] >= skeleton.center[0]
        ? STAFF_SLASH_ANGLE
        : STAFF_BACKSLASH_ANGLE;
      skeleton.castAngle = aimAngle(skeleton.center, player, skeleton.castPredictive);
      skeleton.castWindupTimer = cfg.castWindupFrames;
    }
  };

  const baseDraw = skeleton.draw;
  skeleton.draw = (ctx) => {
    if (skeleton.isCasting() && skeleton.spriteDir === "up") {
      drawStaff(ctx, skeleton);
    }
    baseDraw(ctx);
    if (skeleton.isCasting() && skeleton.spriteDir !== "up") {
      drawStaff(ctx, skeleton);
    }
  };
};

function drawStaff(ctx, skeleton) {
  const { base, staffAngle, tip } = staffGeometry(skeleton);
  const progress = 1 - (skeleton.castWindupTimer / GAME_CONFIG.entities.enemy.skeletonMagic.castWindupFrames);

  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "#5a3a1d";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(base[0], base[1]);
  ctx.lineTo(tip[0], tip[1]);
  ctx.stroke();

  ctx.strokeStyle = "#c69245";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(base[0], base[1]);
  ctx.lineTo(tip[0], tip[1]);
  ctx.stroke();

  ctx.fillStyle = `rgba(145, 225, 255, ${0.45 + (progress * 0.45)})`;
  ctx.beginPath();
  ctx.arc(tip[0], tip[1], 3 + (progress * 3), 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(235, 250, 255, ${0.35 + (progress * 0.45)})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(tip[0], tip[1]);
  ctx.lineTo(
    tip[0] + (Math.cos(staffAngle) * (5 + progress * 4)),
    tip[1] + (Math.sin(staffAngle) * (5 + progress * 4)),
  );
  ctx.stroke();
  ctx.restore();
}
