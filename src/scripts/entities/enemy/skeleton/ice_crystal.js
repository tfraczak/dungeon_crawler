import createEntity from "@entities/entity";
import DEV_FLAGS from "@core/dev_flags";
import * as GAME_CONFIG from "@core/game_config";
import Random from "@utils/random";
import { boxesOverlap } from "../base_enemy/collision_boxes";

const HITBOX_SIZE = 10;

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

function createIceCrystal({ pos, angle }) {
  const cfg = GAME_CONFIG.entities.enemy.skeletonMagic;
  const speed = cfg.projectileSpeed;
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

  crystal.damage = () => Random.int(cfg.projectileDamageMin, cfg.projectileDamageMax);

  crystal.hitPlayer = (player) => {
    if (player.invulnerable) return;
    if (!DEV_FLAGS.godMode) {
      player.hp -= crystal.damage();
      if (player.hp < 0) player.hp = 0;
    }
    player.applyCold?.(cfg.coldDurationFrames);
    player.hit();
  };

  crystal.update = (_room, player) => {
    if (crystal.done) return;
    crystal.pos[0] += vx;
    crystal.pos[1] += vy;
    crystal.angle += crystal.spin;
    crystal.distance += speed;
    crystal.updateSides();

    if (boxesOverlap(crystal.colBox, player.colBox)) {
      crystal.hitPlayer(player);
      crystal.done = true;
      return;
    }

    if (crystal.distance >= cfg.projectileMaxDistance) crystal.done = true;
  };

  crystal.draw = (ctx) => {
    if (crystal.done) return;

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
}

export default createIceCrystal;
