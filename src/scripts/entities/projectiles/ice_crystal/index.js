import createEntity from "@entities/entity";
import DEV_FLAGS, { configValue } from "@core/dev_flags";
import { resolveIncomingPlayerHit } from "@entities/player/incoming_hit";
import Random from "@utils/random";
import { projectileBlockerImpact } from "@world/room/projectile_collision";
import { boxesOverlap } from "@entities/enemy/base_enemy/collision_boxes";
import ICE_CRYSTAL_CONFIG, { ICE_CRYSTAL_HITBOX_SIZE } from "./config";
import { playIceCrystalHit, playIceCrystalWallHit } from "./sound";

export { ICE_CRYSTAL_HITBOX_SIZE };

const HITBOX_SIZE = ICE_CRYSTAL_HITBOX_SIZE;
const SHATTER_DIRECTION_BY_SIDE = Object.freeze({
  U: Math.PI / 2,
  D: -Math.PI / 2,
  L: 0,
  R: Math.PI,
});

const makeShardPoints = () => {
  const length = Random.range(14, 22);
  const halfWidth = Random.range(3.5, 6);
  return [
    [length / 2, 0],
    [Random.range(1, 5), -halfWidth],
    [-length / 2, Random.range(-2, 1)],
    [Random.range(-2, 3), halfWidth],
  ];
};

const makeShatterShardPoints = () => {
  const length = Random.range(5, 10);
  const halfWidth = Random.range(1.5, 3);
  return [
    [length / 2, 0],
    [Random.range(0.5, 2.5), -halfWidth],
    [-length / 2, Random.range(-1, 1)],
    [Random.range(0.5, 2.5), halfWidth],
  ];
};

const makeShatterShard = (impact) => {
  const baseAngle = SHATTER_DIRECTION_BY_SIDE[impact.side] ?? 0;
  const angle = baseAngle + Random.range(-0.78, 0.78);
  const speed = Random.range(1.1, 2.6);
  const life = Random.int(18, 34);
  return {
    x: impact.point[0] + Random.range(-2, 2),
    y: impact.point[1] + Random.range(-2, 2),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    angle,
    spin: Random.range(-0.24, 0.24),
    life,
    maxLife: life,
    points: makeShatterShardPoints(),
    scale: Random.range(0.75, 1.15),
  };
};

const updateShatterShards = (crystal) => {
  for (const shard of crystal.shatterShards) {
    shard.life--;
    shard.x += shard.vx;
    shard.y += shard.vy;
    shard.vx *= 0.94;
    shard.vy *= 0.94;
    shard.angle += shard.spin;
    shard.spin *= 0.96;
  }
  crystal.shatterShards = crystal.shatterShards.filter(shard => shard.life > 0);
  crystal.done = crystal.shatterShards.length === 0;
};

const drawShatterShards = (ctx, crystal) => {
  for (const shard of crystal.shatterShards) {
    const alpha = Math.max(0, shard.life / shard.maxLife);
    ctx.save();
    ctx.translate(shard.x, shard.y);
    ctx.rotate(shard.angle);
    ctx.scale(shard.scale, shard.scale);
    ctx.fillStyle = `rgba(150, 230, 255, ${0.72 * alpha})`;
    ctx.strokeStyle = `rgba(235, 250, 255, ${0.92 * alpha})`;
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

const startWallShatter = (crystal, impact) => {
  playIceCrystalWallHit();
  crystal.shattering = true;
  crystal.shatterShards = Array.from(
    { length: Random.int(16, 24) },
    () => makeShatterShard(impact),
  );
};

const createIceCrystal = ({ pos, angle, onWallHit = () => {} }) => {
  const cfg = ICE_CRYSTAL_CONFIG;
  const speed = configValue({ value: cfg.speed, override: DEV_FLAGS.iceCrystalSpeed });
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  const crystal = createEntity(
    [pos[0] - (HITBOX_SIZE / 2), pos[1] - (HITBOX_SIZE / 2)],
    HITBOX_SIZE,
    HITBOX_SIZE,
    null,
    { width: HITBOX_SIZE, height: HITBOX_SIZE },
  );
  crystal.angle = angle;
  crystal.distance = 0;
  crystal.done = false;
  crystal.points = makeShardPoints();
  crystal.spin = Random.range(-0.05, 0.05);
  crystal.shattering = false;
  crystal.shatterShards = [];

  crystal.damage = () => Random.int(
    configValue({ value: cfg.damageMin, override: DEV_FLAGS.iceCrystalDamageMin }),
    configValue({ value: cfg.damageMax, override: DEV_FLAGS.iceCrystalDamageMax }),
  );

  crystal.hitPlayer = (player) => {
    const result = resolveIncomingPlayerHit(player, {
      source: crystal,
      sourceCenter: crystal.center,
      hitCenter: player.center,
      damage: () => crystal.damage(),
      knockback: 0,
      applyStatus: () => player.applyCold?.(configValue({
        value: cfg.coldDurationFrames,
        override: DEV_FLAGS.iceCrystalColdDurationFrames,
      })),
      onBlocked: () => playIceCrystalWallHit(),
      onHit: () => playIceCrystalHit(),
    });
    return result;
  };

  crystal.update = (room, player) => {
    if (crystal.done) return;
    if (crystal.shattering) {
      updateShatterShards(crystal);
      return;
    }

    crystal.pos[0] += vx;
    crystal.pos[1] += vy;
    crystal.angle += crystal.spin;
    crystal.distance += speed;
    crystal.updateSides();

    const blockerImpact = projectileBlockerImpact(crystal, room);
    if (blockerImpact) {
      startWallShatter(crystal, blockerImpact);
      onWallHit(blockerImpact, crystal);
      return;
    }

    if (boxesOverlap(crystal.colBox, player.colBox)) {
      const result = crystal.hitPlayer(player);
      crystal.done = true;
      if (result?.blocked) {
        crystal.shattering = false;
        crystal.shatterShards = [];
      }
      return;
    }

    if (crystal.distance >= configValue({ value: cfg.maxDistance, override: DEV_FLAGS.iceCrystalMaxDistance })) {
      crystal.done = true;
    }
  };

  crystal.draw = (ctx) => {
    if (crystal.done) return;
    if (crystal.shattering) {
      drawShatterShards(ctx, crystal);
      return;
    }

    ctx.save();
    ctx.translate(crystal.center[0], crystal.center[1]);
    ctx.rotate(crystal.angle);

    ctx.fillStyle = "rgba(150, 230, 255, 0.88)";
    ctx.strokeStyle = "rgba(230, 250, 255, 0.95)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    crystal.points.forEach(([x, y], idx) => {
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(6, 0);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.stroke();
    ctx.restore();
    crystal.colBox.draw(ctx);
  };

  crystal.updateSides();
  return crystal;
};

export default createIceCrystal;
