import ICE_CRYSTAL_CONFIG from "@entities/projectiles/ice_crystal/config";
import DEV_FLAGS, { configValue } from "@core/dev_flags";
import Random from "@utils/random";

const makeColdShard = (width, height, index, count) => {
  const length = Random.range(11, 21);
  const halfWidth = Random.range(2.4, 4.6);
  const spread = count <= 1 ? 0 : (index / (count - 1)) - 0.5;
  const baseX = width * 0.5;
  const baseY = height - 2;
  return {
    angle: (-Math.PI / 2) + (spread * 0.9) + Random.range(-0.12, 0.12),
    points: [
      [length, 0],
      [Random.range(3, 6), -halfWidth],
      [Random.range(-1, 1), -halfWidth * 0.55],
      [Random.range(-1, 1), halfWidth * 0.55],
      [Random.range(3, 6), halfWidth],
    ],
    scale: Random.range(0.85, 1.25),
    x: baseX + (spread * width * 0.42) + Random.range(-2, 2),
    y: baseY + Random.range(-1, 2),
  };
};

const makeColdImpactShard = (player, index, count) => {
  const ring = count <= 1 ? 0 : index / count;
  const burstAngle = (ring * Math.PI * 2) + Random.range(-0.28, 0.28);
  const speed = Random.range(0.55, 1.1);
  const length = Random.range(5, 10);
  const halfWidth = Random.range(1.1, 2.4);
  const life = Random.int(28, 44);
  const ellipseX = Math.cos(burstAngle);
  const ellipseY = Math.sin(burstAngle) * 0.72;
  const velocityScale = Math.hypot(ellipseX, ellipseY) || 1;

  return {
    x: player.center[0] + (ellipseX * Random.range(1, 4.5)),
    y: player.center[1] + (ellipseY * Random.range(4, 9)),
    vx: (ellipseX / velocityScale) * speed,
    vy: (ellipseY / velocityScale) * speed,
    dropZ: 0,
    dropVz: Random.range(3.8, 6.4),
    gravity: Random.range(0.28, 0.38),
    angle: burstAngle + Random.range(-0.3, 0.3),
    spin: Random.range(-0.16, 0.16),
    life,
    maxLife: life,
    scale: Random.range(0.75, 1.15),
    points: [
      [length, 0],
      [Random.range(2, 4), -halfWidth],
      [Random.range(-1, 1), -halfWidth * 0.4],
      [Random.range(-1, 1), halfWidth * 0.4],
      [Random.range(2, 4), halfWidth],
    ],
  };
};

const updateColdImpactShards = (player) => {
  if (player.coldImpactShards.length === 0) return;
  for (const shard of player.coldImpactShards) {
    if (shard.life <= 0) continue;
    shard.life--;
    shard.dropVz -= shard.gravity;
    shard.dropZ += shard.dropVz;
    shard.x += shard.vx;
    shard.y += shard.vy;
    shard.angle += shard.spin;

    if (shard.dropZ <= 0) {
      shard.dropZ = 0;
      shard.dropVz = 0;
      shard.vx *= 0.82;
      shard.vy *= 0.82;
      shard.spin *= 0.82;
    }
  }
  player.coldImpactShards = player.coldImpactShards.filter(shard => shard.life > 0);
};

const drawColdMask = (ctx, player, coldMask, coldMaskCtx) => {
  if (player.coldTimer <= 0 || !coldMaskCtx) return;

  const ratio = player.coldDuration > 0 ? player.coldTimer / player.coldDuration : 0;
  const alpha = 0.2 + (ratio * 0.42);
  coldMaskCtx.clearRect(0, 0, player.width, player.height);
  coldMaskCtx.drawImage(
    player.spritePalette,
    player.drawOptions.palX,
    player.drawOptions.palY,
    player.width,
    player.height,
    0,
    0,
    player.width,
    player.height,
  );
  coldMaskCtx.globalCompositeOperation = "source-in";
  coldMaskCtx.fillStyle = `rgba(100, 190, 255, ${alpha})`;
  coldMaskCtx.fillRect(0, 0, player.width, player.height);
  coldMaskCtx.globalCompositeOperation = "source-over";
  ctx.drawImage(coldMask, player.pos[0], player.pos[1]);

  ctx.save();
  ctx.globalAlpha = 0.25 + (ratio * 0.65);
  for (const shard of player.coldShards) {
    ctx.save();
    ctx.translate(player.pos[0] + shard.x, player.pos[1] + shard.y);
    ctx.rotate(shard.angle);
    ctx.scale(shard.scale, shard.scale);
    ctx.fillStyle = "rgba(150, 230, 255, 0.78)";
    ctx.strokeStyle = "rgba(235, 250, 255, 0.95)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    shard.points.forEach(([x, y], idx) => {
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
};

const drawColdImpactShards = (ctx, player) => {
  for (const shard of player.coldImpactShards) {
    const alpha = Math.max(0, shard.life / shard.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(shard.x, shard.y - shard.dropZ);
    ctx.rotate(shard.angle);
    ctx.scale(shard.scale, shard.scale);
    ctx.fillStyle = "rgba(155, 230, 255, 0.82)";
    ctx.strokeStyle = "rgba(240, 252, 255, 0.95)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    shard.points.forEach(([x, y], idx) => {
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
};

export const setupColdStatus = (player) => {
  player.coldTimer = 0;
  player.coldDuration = 0;
  player.coldShards = [];
  player.coldImpactShards = [];

  player.applyCold = (duration) => {
    player.coldTimer = duration;
    player.coldDuration = duration;
    const count = Random.int(5, 7);
    player.coldShards = Array.from(
      { length: count },
      (_, index) => makeColdShard(player.width, player.height, index, count),
    );
    const impactCount = Random.int(8, 12);
    player.coldImpactShards.push(
      ...Array.from(
        { length: impactCount },
        (_, index) => makeColdImpactShard(player, index, impactCount),
      ),
    );
    player.coldImpactShards = player.coldImpactShards.slice(-36);
  };
};

export const updateColdStatus = (player) => {
  if (player.coldTimer > 0) player.coldTimer--;
  if (player.coldTimer < 0) player.coldTimer = 0;
  updateColdImpactShards(player);
};

export const applyColdSpeedModifier = (player) => {
  if (player.coldTimer > 0) {
    player.speedModifier *= configValue({
      value: ICE_CRYSTAL_CONFIG.coldSpeedMultiplier,
      override: DEV_FLAGS.iceCrystalColdSpeedMultiplier,
    });
  }
};

export const drawColdStatus = (ctx, player, coldMask) => {
  drawColdMask(ctx, player, coldMask.mask, coldMask.ctx);
  drawColdImpactShards(ctx, player);
};
