import * as GAME_CONFIG from "@core/game_config";
import DEV_FLAGS, { configValue } from "@core/dev_flags";
import Random from "@utils/random";
import createIceCrystal from "@entities/projectiles/ice_crystal";
import ICE_CRYSTAL_CONFIG, { ICE_CRYSTAL_HITBOX_SIZE } from "@entities/projectiles/ice_crystal/config";
import { playIceCrystalCast } from "@entities/projectiles/ice_crystal/sound";
import { boxesOverlap } from "@entities/enemy/base_enemy/collision_boxes";
import SKELETON_CONFIG from "./config";

const {
  angleOffset: STAFF_ANGLE_OFFSET,
  backslashAngle: STAFF_BACKSLASH_ANGLE,
  length: STAFF_LENGTH,
  slashAngle: STAFF_SLASH_ANGLE,
} = SKELETON_CONFIG.staff;
const PROJECTILE_CLEARANCE = ICE_CRYSTAL_HITBOX_SIZE / 2;
const WALL_THICKNESS = GAME_CONFIG.world.tileSize;
const ROOM_SIZE = WALL_THICKNESS * 15;

const magicValue = (key, flagKey) => configValue({
  value: SKELETON_CONFIG.magic[key],
  override: DEV_FLAGS[flagKey],
});

const iceCrystalValue = (key, flagKey) => configValue({
  value: ICE_CRYSTAL_CONFIG[key],
  override: DEV_FLAGS[flagKey],
});

const angleToward = (from, to) => Math.atan2(to[1] - from[1], to[0] - from[0]);
const playerBodyTarget = player => player.colBox.center ?? player.center;

const projectedPlayerBoxAt = (player, vx, vy, frames) => ({
  pos: [
    player.colBox.pos[0] + (vx * frames),
    player.colBox.pos[1] + (vy * frames),
  ],
  width: player.colBox.width,
  height: player.colBox.height,
});

const projectedPlayerHitsWall = (player, vx, vy, frames, walls = []) => {
  if (frames <= 0 || walls.length === 0) return false;
  const samples = Math.ceil(frames);

  for (let sample = 1; sample <= samples; sample++) {
    const sampleFrame = Math.min(sample, frames);
    const projectedBox = projectedPlayerBoxAt(player, vx, vy, sampleFrame);
    if (walls.some(wall => boxesOverlap(projectedBox, wall))) return true;
  }

  return false;
};

const predictedTarget = (origin, player, room) => {
  const target = playerBodyTarget(player);
  const [vx, vy] = player.velocity ?? [0, 0];
  const dx = target[0] - origin[0];
  const dy = target[1] - origin[1];
  const speed = iceCrystalValue("speed", "iceCrystalSpeed");
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

  const maxTime = iceCrystalValue("maxDistance", "iceCrystalMaxDistance") / speed;
  const t = Math.max(0, Math.min(interceptTime, maxTime));
  if (projectedPlayerHitsWall(player, vx, vy, t, room?.walls)) return target;
  return [target[0] + (vx * t), target[1] + (vy * t)];
};

const predictedAimAngle = (origin, player, room) => angleToward(origin, predictedTarget(origin, player, room));
const directAimAngle = (origin, player) => angleToward(origin, playerBodyTarget(player));
const aimAngle = (origin, player, predictive, room) => (
  predictive ? predictedAimAngle(origin, player, room) : directAimAngle(origin, player)
);

const isKnockbackActive = (skeleton) => (
  Math.abs(skeleton.knockbackVx) >= 0.1 || Math.abs(skeleton.knockbackVy) >= 0.1
);

const lineIntersectsRect = (from, to, rect) => {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const left = rect.pos[0];
  const right = rect.pos[0] + rect.width;
  const top = rect.pos[1];
  const bottom = rect.pos[1] + rect.height;
  let tMin = 0;
  let tMax = 1;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const checks = [
    [-dx, x1 - left],
    [dx, right - x1],
    [-dy, y1 - top],
    [dy, bottom - y1],
  ];

  for (const [p, q] of checks) {
    if (p === 0 && q < 0) return false;
    if (p === 0) continue;
    const t = q / p;
    if (p < 0) tMin = Math.max(tMin, t);
    else tMax = Math.min(tMax, t);
    if (tMin > tMax) return false;
  }

  return true;
};

const blockerSideFor = (blocker) => {
  if (blocker.pos[1] === 0 && blocker.height === WALL_THICKNESS) return "U";
  if (blocker.pos[1] + blocker.height === ROOM_SIZE && blocker.height === WALL_THICKNESS) return "D";
  if (blocker.pos[0] === 0 && blocker.width === WALL_THICKNESS) return "L";
  if (blocker.pos[0] + blocker.width === ROOM_SIZE && blocker.width === WALL_THICKNESS) return "R";
  return null;
};

const clearsHorizontalBlockerSpan = (point, blocker) => {
  const left = blocker.pos[0];
  const right = blocker.pos[0] + blocker.width;
  return point[0] + PROJECTILE_CLEARANCE <= left || point[0] - PROJECTILE_CLEARANCE >= right;
};

const clearsVerticalBlockerSpan = (point, blocker) => {
  const top = blocker.pos[1];
  const bottom = blocker.pos[1] + blocker.height;
  return point[1] + PROJECTILE_CLEARANCE <= top || point[1] - PROJECTILE_CLEARANCE >= bottom;
};

const leavesEdgeBlocker = (from, to, blocker) => {
  switch (blockerSideFor(blocker)) {
    case "U": {
      const boundaryY = blocker.pos[1] + blocker.height;
      return (
        from[1] <= boundaryY + PROJECTILE_CLEARANCE
        && to[1] > boundaryY
        && clearsHorizontalBlockerSpan(from, blocker)
      );
    }
    case "D": {
      const boundaryY = blocker.pos[1];
      return (
        from[1] >= boundaryY - PROJECTILE_CLEARANCE
        && to[1] < boundaryY
        && clearsHorizontalBlockerSpan(from, blocker)
      );
    }
    case "L": {
      const boundaryX = blocker.pos[0] + blocker.width;
      return (
        from[0] <= boundaryX + PROJECTILE_CLEARANCE
        && to[0] > boundaryX
        && clearsVerticalBlockerSpan(from, blocker)
      );
    }
    case "R": {
      const boundaryX = blocker.pos[0];
      return (
        from[0] >= boundaryX - PROJECTILE_CLEARANCE
        && to[0] < boundaryX
        && clearsVerticalBlockerSpan(from, blocker)
      );
    }
    default:
      return false;
  }
};

const hasProjectileClearance = (from, to, blocker) => {
  if (leavesEdgeBlocker(from, to, blocker)) return true;

  const angle = angleToward(from, to);
  const offsetX = Math.cos(angle + Math.PI / 2) * PROJECTILE_CLEARANCE;
  const offsetY = Math.sin(angle + Math.PI / 2) * PROJECTILE_CLEARANCE;
  return ![
    [[from[0], from[1]], [to[0], to[1]]],
    [[from[0] + offsetX, from[1] + offsetY], [to[0] + offsetX, to[1] + offsetY]],
    [[from[0] - offsetX, from[1] - offsetY], [to[0] - offsetX, to[1] - offsetY]],
  ].some(([start, end]) => lineIntersectsRect(start, end, blocker));
};

const hasLineClearance = (from, to, blocker, clearance = 0) => {
  if (clearance <= 0) return !lineIntersectsRect(from, to, blocker);
  const angle = angleToward(from, to);
  const offsetX = Math.cos(angle + Math.PI / 2) * clearance;
  const offsetY = Math.sin(angle + Math.PI / 2) * clearance;
  return ![
    [[from[0], from[1]], [to[0], to[1]]],
    [[from[0] + offsetX, from[1] + offsetY], [to[0] + offsetX, to[1] + offsetY]],
    [[from[0] - offsetX, from[1] - offsetY], [to[0] - offsetX, to[1] - offsetY]],
  ].some(([start, end]) => lineIntersectsRect(start, end, blocker));
};

const lineOfSightBlockers = (skeleton) => (
  skeleton.room?.map?.projectile?.blockers
  ?? skeleton.room?.map?.projectileBlockers
  ?? []
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

const staffGeometry = (skeleton, staffAngleOverride = null, center = skeleton.center) => {
  const staffAngle = staffAngleOverride ?? staffAngleFor(skeleton);
  const base = [
    center[0] - (Math.cos(staffAngle) * 6),
    center[1] - 10 - (Math.sin(staffAngle) * 6),
  ];
  const tip = [
    base[0] + (Math.cos(staffAngle) * STAFF_LENGTH),
    base[1] + (Math.sin(staffAngle) * STAFF_LENGTH),
  ];
  return { base, staffAngle, tip };
};

export const setupSkeletonMagicCombat = (skeleton) => {
  const castCooldownFrames = () => magicValue("castCooldownFrames", "skeletonCastCooldownFrames");
  const castDistance = () => magicValue("castDistance", "skeletonCastDistance");
  const castDissipateFrames = () => magicValue("castDissipateFrames", "skeletonCastDissipateFrames");
  const castInterruptedDelayFrames = () => magicValue(
    "castInterruptedDelayFrames",
    "skeletonCastInterruptedDelayFrames",
  );
  const castWindupFrames = () => magicValue("castWindupFrames", "skeletonCastWindupFrames");
  skeleton.castCooldownTimer = 0;
  skeleton.castWindupTimer = 0;
  skeleton.castInterruptedDelayTimer = 0;
  skeleton.castAngle = 0;
  skeleton.castPredictive = false;
  skeleton.castStaffAngle = STAFF_SLASH_ANGLE;
  skeleton.castSoundHandle = null;
  skeleton.castDissipateTimer = 0;
  skeleton.castEffectSeed = 0;
  skeleton.repositioningForLineOfSight = false;
  skeleton.blockedCastCenter = null;

  skeleton.isCasting = () => skeleton.castWindupTimer > 0;

  skeleton.attackPointFor = (player, center = skeleton.center) => {
    const target = playerBodyTarget(player);
    const staffAngle = target[0] >= center[0]
      ? STAFF_SLASH_ANGLE
      : STAFF_BACKSLASH_ANGLE;
    return staffGeometry(skeleton, staffAngle, center).tip;
  };

  skeleton.hasBodyLineOfSightFrom = (center, player) => {
    if (!player) return false;
    const target = playerBodyTarget(player);
    const clearance = Math.min(skeleton.colBox.width, skeleton.colBox.height) / 2;
    return lineOfSightBlockers(skeleton).every(blocker => (
      hasLineClearance(center, target, blocker, clearance)
    ));
  };

  skeleton.hasBodyLineOfSightToPlayer = player => (
    skeleton.hasBodyLineOfSightFrom(skeleton.colBox.center ?? skeleton.center, player)
  );

  skeleton.staffLineOfSightBlocker = (player, center = skeleton.center) => {
    if (!player) return null;
    const origin = skeleton.attackPointFor(player, center);
    const target = playerBodyTarget(player);
    const blocker = lineOfSightBlockers(skeleton).find(candidate => (
      !hasProjectileClearance(origin, target, candidate)
    ));
    if (!blocker) return null;
    return { blocker, side: blockerSideFor(blocker) };
  };

  skeleton.hasStaffLineOfSightToPlayer = player => skeleton.staffLineOfSightBlocker(player) === null;

  skeleton.canCastFromCenter = (center, player) => (
    skeleton.hasBodyLineOfSightFrom(center, player)
    && skeleton.staffLineOfSightBlocker(player, center) === null
  );

  skeleton.cancelCasting = ({ startCooldown = true } = {}) => {
    if (!skeleton.isCasting()) return;
    skeleton.castWindupTimer = 0;
    if (startCooldown) {
      skeleton.castCooldownTimer = Math.max(skeleton.castCooldownTimer, castCooldownFrames());
    }
    skeleton.castDissipateTimer = 0;
    skeleton.castSoundHandle?.stop?.(0.04);
    skeleton.castSoundHandle = null;
  };

  skeleton.onKnockback = () => {
    skeleton.cancelCasting({ startCooldown: false });
    skeleton.castInterruptedDelayTimer = castInterruptedDelayFrames() ?? 0;
  };

  skeleton.onProjectileWallHit = () => {
    skeleton.blockedCastCenter = [...skeleton.center];
    skeleton.repositioningForLineOfSight = true;
  };

  const spawnCrystal = (player) => {
    const provisionalTip = staffGeometry(skeleton).tip;
    skeleton.castAngle = aimAngle(provisionalTip, player, skeleton.castPredictive, skeleton.room);
    const { tip } = staffGeometry(skeleton);
    skeleton.room?.addEnemyProjectile?.(createIceCrystal({
      angle: skeleton.castAngle,
      onWallHit: skeleton.onProjectileWallHit,
      pos: tip,
    }));
    skeleton.castDissipateTimer = castDissipateFrames() ?? 0;
  };

  skeleton.hitPlayer = () => {
    const player = skeleton.gameState.session.player;
    if (skeleton.castDissipateTimer > 0) skeleton.castDissipateTimer--;
    if (!player || (!skeleton.chasingPlayer && !skeleton.isCasting())) return;

    if (skeleton.castCooldownTimer > 0) skeleton.castCooldownTimer--;
    if (skeleton.castInterruptedDelayTimer > 0) skeleton.castInterruptedDelayTimer--;
    if (skeleton.castWindupTimer > 0) {
      skeleton.castAngle = aimAngle(skeleton.center, player, skeleton.castPredictive, skeleton.room);
      skeleton.castWindupTimer--;
      if (skeleton.castWindupTimer === 0) {
        spawnCrystal(player);
        skeleton.castCooldownTimer = castCooldownFrames();
        skeleton.castSoundHandle = null;
      }
      return;
    }

    if (
      (skeleton.distToPlayer() <= castDistance() || skeleton.repositioningForLineOfSight)
      && skeleton.castCooldownTimer === 0
      && skeleton.castInterruptedDelayTimer === 0
      && !isKnockbackActive(skeleton)
      && skeleton.hasBodyLineOfSightToPlayer(player)
      && skeleton.hasStaffLineOfSightToPlayer(player)
    ) {
      skeleton.repositioningForLineOfSight = false;
      skeleton.castPredictive = Random.chance(0.5);
      skeleton.castStaffAngle = playerBodyTarget(player)[0] >= skeleton.center[0]
        ? STAFF_SLASH_ANGLE
        : STAFF_BACKSLASH_ANGLE;
      skeleton.castAngle = aimAngle(skeleton.center, player, skeleton.castPredictive, skeleton.room);
      skeleton.castWindupTimer = castWindupFrames();
      skeleton.castEffectSeed = Random.range(0, Math.PI * 2);
      skeleton.castSoundHandle = playIceCrystalCast();
    }
  };

  const baseDraw = skeleton.draw;
  skeleton.draw = (ctx) => {
    if (skeleton.isCasting() && skeleton.spriteDir === "up") {
      drawStaff(ctx, skeleton);
    }
    drawCastFootEffect(ctx, skeleton);
    drawCastAuraParticles(ctx, skeleton);
    baseDraw(ctx);
    if (skeleton.isCasting() && skeleton.spriteDir !== "up") {
      drawStaff(ctx, skeleton);
    }
  };
};

function drawCastFootEffect(ctx, skeleton) {
  const dissipating = skeleton.castDissipateTimer > 0;
  if (!skeleton.isCasting() && !dissipating) return;

  const castWindupFrames = magicValue("castWindupFrames", "skeletonCastWindupFrames");
  const castDissipateFrames = magicValue("castDissipateFrames", "skeletonCastDissipateFrames");
  const windupProgress = skeleton.isCasting()
    ? 1 - (skeleton.castWindupTimer / castWindupFrames)
    : 1;
  const dissipateProgress = dissipating
    ? 1 - (skeleton.castDissipateTimer / (castDissipateFrames ?? 1))
    : 0;
  const alpha = skeleton.isCasting()
    ? 0.22 + (windupProgress * 0.48)
    : Math.max(0, 0.62 * (1 - dissipateProgress));
  const radius = skeleton.isCasting()
    ? 9 + (windupProgress * 9)
    : 18 + (dissipateProgress * 10);
  const x = skeleton.pos[0] + (skeleton.width / 2);
  const y = skeleton.pos[1] + skeleton.height - 2;
  const time = (castWindupFrames - skeleton.castWindupTimer) + (dissipateProgress * 18);
  const spin = skeleton.castEffectSeed + (time * 0.18);

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1, 0.42);
  ctx.lineCap = "round";
  ctx.shadowColor = `rgba(120, 215, 255, ${alpha})`;
  ctx.shadowBlur = 8;

  ctx.strokeStyle = `rgba(135, 225, 255, ${alpha})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, radius, radius, 0, spin, spin + Math.PI * 1.45);
  ctx.stroke();

  ctx.strokeStyle = `rgba(235, 250, 255, ${alpha * 0.82})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 0.62, radius * 0.62, 0, -spin * 1.2, (-spin * 1.2) + Math.PI * 1.2);
  ctx.stroke();

  for (let i = 0; i < 7; i++) {
    const angle = spin + ((Math.PI * 2 * i) / 7);
    const pulse = 0.75 + (Math.sin(time * 0.35 + i) * 0.25);
    const particleRadius = radius * (0.65 + (0.32 * pulse));
    const px = Math.cos(angle) * particleRadius;
    const py = Math.sin(angle) * particleRadius;
    ctx.fillStyle = `rgba(185, 240, 255, ${alpha * (0.55 + (pulse * 0.35))})`;
    ctx.beginPath();
    ctx.arc(px, py, 1.2 + pulse, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawCastAuraParticles(ctx, skeleton) {
  if (!skeleton.isCasting()) return;

  const castWindupFrames = magicValue("castWindupFrames", "skeletonCastWindupFrames");
  const progress = 1 - (skeleton.castWindupTimer / castWindupFrames);
  const centerX = skeleton.pos[0] + (skeleton.width / 2);
  const footY = skeleton.pos[1] + skeleton.height - 2;
  const bodyHeight = skeleton.height * 0.82;
  const time = castWindupFrames - skeleton.castWindupTimer;
  const seed = skeleton.castEffectSeed;

  ctx.save();
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(150, 230, 255, 0.7)";
  ctx.shadowBlur = 5;

  for (let i = 0; i < 16; i++) {
    const lane = (i / 16) * Math.PI * 2;
    const phase = (time * 0.045) + (i * 0.173) + seed;
    const rise = (phase % 1);
    const swirl = lane + (time * 0.035) + (Math.sin(phase * Math.PI * 2) * 0.35);
    const radius = 12 + (Math.sin(phase * Math.PI * 2 + i) * 6);
    const x = centerX + (Math.cos(swirl) * radius);
    const y = footY - (rise * bodyHeight) - (progress * 5);
    const alpha = (0.15 + (progress * 0.55)) * Math.sin(rise * Math.PI);
    const size = 1.2 + ((i % 3) * 0.5) + (progress * 0.7);

    if (alpha <= 0) continue;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(swirl);
    ctx.strokeStyle = `rgba(210, 245, 255, ${alpha})`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

function drawStaff(ctx, skeleton) {
  const { base, staffAngle, tip } = staffGeometry(skeleton);
  const progress = 1 - (
    skeleton.castWindupTimer / magicValue("castWindupFrames", "skeletonCastWindupFrames")
  );

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

  drawStaffTipIceCrystals(ctx, tip, progress, skeleton.castEffectSeed);

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

function drawStaffTipIceCrystals(ctx, tip, progress, seed) {
  const count = 8;

  ctx.save();
  ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(150, 230, 255, 0.8)";
  ctx.shadowBlur = 6;

  for (let i = 0; i < count; i++) {
    const angle = seed + ((Math.PI * 2 * i) / count) + (progress * 2.4);
    const gatherRadius = (1 - progress) * (18 + (i % 3) * 3);
    const jitter = Math.sin((progress * Math.PI * 3) + i) * 1.5;
    const x = tip[0] + (Math.cos(angle) * (gatherRadius + jitter));
    const y = tip[1] + (Math.sin(angle) * (gatherRadius * 0.7 + jitter));
    const shardLength = 3 + (progress * 4) + (i % 2);
    const shardWidth = 1.4 + (progress * 0.8);
    const alpha = 0.25 + (progress * 0.7);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.scale(1, 0.85);
    ctx.fillStyle = `rgba(150, 230, 255, ${alpha * 0.72})`;
    ctx.strokeStyle = `rgba(235, 252, 255, ${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -shardLength);
    ctx.lineTo(shardWidth, 0);
    ctx.lineTo(0, shardLength);
    ctx.lineTo(-shardWidth, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}
