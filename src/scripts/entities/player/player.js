import createEntity from "@entities/entity";
import { createWeaponById, DEFAULT_WEAPON_ID } from "@items/equipment/weapons/registry";
import * as GAME_CONFIG from "@core/game_config";
import DEV_FLAGS from "@core/dev_flags";
import Random from "@utils/random";
import { roomChange } from "@world/room/generation";
import playFootstep from "./sound";

const { baseSpeed: BASE_SPEED } = GAME_CONFIG.world;
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

function createPlayer(pos, width, height, spritePalette, gameState) {
  const player = createEntity(pos, width, height, spritePalette);
  const cfg = GAME_CONFIG.entities.player;
  const flyingHitBox = {
    width: width / 2,
    height: height / 2,
    pos: [pos[0] + (width / 4), pos[1] + 6],
  };

  player.gameState = gameState;
  player.speed = BASE_SPEED * cfg.speedMultiplier;
  player.normalizedSpeed = player.speed / Math.sqrt(2);
  player.pace = 24 / player.speed;
  player.speedModifier = 1;
  player.sprinting = false;
  player.stamina = cfg.stamina;
  player.invulnerable = 0;
  player.coldTimer = 0;
  player.coldDuration = 0;
  player.coldShards = [];
  player.hp = cfg.hp;
  player.strength = cfg.strength;
  player.stride = {
    up:    { stepCount: 0, lastPhase: -1, palY: 48 * 3 },
    down:  { stepCount: 0, lastPhase: -1, palY: 48 * 0 },
    left:  { stepCount: 0, lastPhase: -1, palY: 48 * 1 },
    right: { stepCount: 0, lastPhase: -1, palY: 48 * 2 },
  };

  player.newRoomPos = (dir) => {
    switch (dir) {
      case "up":    player.pos[1] = 720 - 24; break;
      case "down":  player.pos[1] = -24; break;
      case "left":  player.pos[0] = 720 - 24; break;
      case "right": player.pos[0] = -24; break;
    }
  };

  // Stride is a 4-phase cycle: idle, left-foot-down, idle, right-foot-down.
  // Each phase lasts `pace` frames. We compute the current phase from
  // stepCount and fire the footstep sound only on transitions into a
  // foot-down phase, which is robust to fractional pace values (e.g. sprint).
  player.stridePalettePos = (direction) => {
    player.pace = 24 / (player.speed * player.speedModifier);
    const stride = player.stride[direction];
    const cycleLength = Math.max(1, 4 * player.pace);
    const phase = Math.floor((stride.stepCount % cycleLength) / player.pace) % 4;

    if (phase !== stride.lastPhase) {
      if (phase === 1 || phase === 3) playFootstep(player.speedModifier > 1);
      stride.lastPhase = phase;
    }

    stride.stepCount++;
    if (stride.stepCount >= cycleLength) stride.stepCount = 0;

    switch (phase) {
      case 1:  return 48 * 0;
      case 3:  return 48 * 2;
      default: return 48 * 1;
    }
  };

  player.wallCheck = (walls) => {
    for (let wall of walls) { if (player.collidedOnSide("top", wall)) break; }
    if (player.collisions.top) {
      player.pos[1] = player.collisions.top - 32;
    }

    for (let wall of walls) { if (player.collidedOnSide("bottom", wall)) break; }
    if (player.collisions.bottom) {
      player.pos[1] = player.collisions.bottom - 48;
    }

    for (let wall of walls) { if (player.collidedOnSide("left", wall)) break; }
    if (player.collisions.left) {
      player.pos[0] = player.collisions.left - 12;
    }

    for (let wall of walls) { if (player.collidedOnSide("right", wall)) break; }
    if (player.collisions.right) {
      player.pos[0] = player.collisions.right - 36;
    }
  };

  player.invulCheck = () => {
    return Math.floor(player.invulnerable / 5) % 2 === 0;
  };

  player.weapon = createWeaponById(DEV_FLAGS.playerWeapon || DEFAULT_WEAPON_ID, gameState);
  player.facing = "down";
  player.attackTimer = 0;          // frames remaining in current swing
  player.attackCooldownTimer = 0;  // frames before next swing allowed
  player.attackHitIds = new Set(); // enemy keys already hit this swing
  player.knockbackVx = 0;
  player.knockbackVy = 0;
  player.velocity = [0, 0];
  player.flyingHitBox = flyingHitBox;

  player.updateFlyingHitBox = () => {
    const x = player.pos[0] + ((player.width - player.flyingHitBox.width) / 2);
    const y = player.pos[1] + 6;
    player.flyingHitBox.pos = [x, y];
    player.flyingHitBox.center = [
      x + (player.flyingHitBox.width / 2),
      y + (player.flyingHitBox.height / 2),
    ];
  };

  player.flyingHitBox.draw = (ctx) => {
    if (!DEV_FLAGS.showCollisionBoxes) return;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00aaff";
    ctx.strokeRect(
      player.flyingHitBox.pos[0],
      player.flyingHitBox.pos[1],
      player.flyingHitBox.width,
      player.flyingHitBox.height,
    );
  };

  const baseUpdateSides = player.updateSides;
  player.updateSides = () => {
    baseUpdateSides();
    player.updateFlyingHitBox();
  };
  player.updateFlyingHitBox();

  player.hit = () => {
    player.invulnerable = cfg.invulnerabilityFrames;
  };

  player.applyCold = (duration) => {
    player.coldTimer = duration;
    player.coldDuration = duration;
    const count = Random.int(5, 7);
    player.coldShards = Array.from(
      { length: count },
      (_, index) => makeColdShard(player.width, player.height, index, count),
    );
  };

  const coldMask = typeof document === "undefined" ? null : document.createElement("canvas");
  const coldMaskCtx = coldMask?.getContext("2d");
  if (coldMask) {
    coldMask.width = player.width;
    coldMask.height = player.height;
  }

  const knockbackBounds = 35;

  player.wallCheckKnockback = (walls) => {
    for (let wall of walls) { if (player.collidedOnSide("top", wall, knockbackBounds)) break; }
    if (player.collisions.top) {
      player.pos[1] = player.collisions.top - 32;
      player.knockbackVy = 0;
    }
    for (let wall of walls) { if (player.collidedOnSide("bottom", wall, knockbackBounds)) break; }
    if (player.collisions.bottom) {
      player.pos[1] = player.collisions.bottom - 48;
      player.knockbackVy = 0;
    }
    for (let wall of walls) { if (player.collidedOnSide("left", wall, knockbackBounds)) break; }
    if (player.collisions.left) {
      player.pos[0] = player.collisions.left - 12;
      player.knockbackVx = 0;
    }
    for (let wall of walls) { if (player.collidedOnSide("right", wall, knockbackBounds)) break; }
    if (player.collisions.right) {
      player.pos[0] = player.collisions.right - 36;
      player.knockbackVx = 0;
    }
  };

  player.applyKnockback = (walls) => {
    if (Math.abs(player.knockbackVx) < 0.1 && Math.abs(player.knockbackVy) < 0.1) {
      player.knockbackVx = 0;
      player.knockbackVy = 0;
      return;
    }
    player.pos[0] += player.knockbackVx;
    player.pos[1] += player.knockbackVy;

    // Prevent knockback from pushing through exit zones
    player.pos[0] = Math.max(-24, Math.min(696, player.pos[0]));
    player.pos[1] = Math.max(-24, Math.min(696, player.pos[1]));

    player.updateSides();
    player.wallCheckKnockback(walls);
    player.knockbackVx *= 0.7;
    player.knockbackVy *= 0.7;
    player.updateSides();
  };

  player.isAttacking = () => player.attackTimer > 0;

  player.attackHitbox = () =>
    player.weapon.computeHitbox(player.center, player.facing, player.attackTimer);

  const baseDraw = player.draw;
  player.draw = (ctx) => {
    baseDraw(ctx);
    if (player.coldTimer > 0 && coldMaskCtx) {
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
    }
    player.flyingHitBox.draw(ctx);
  };

  player.move = (walls) => {
    const previousCenter = [...player.center];
    const keys = player.gameState.keys;
    const [up, down, left, right, shift] = [
      keys["w"], keys["s"], keys["a"], keys["d"], keys["Shift"],
    ];

    const moving = up || down || left || right;

    if (player.coldTimer > 0) player.coldTimer--;
    if (player.coldTimer < 0) player.coldTimer = 0;

    player.sprinting = shift && player.stamina > 0 && moving;
    if (player.sprinting) {
      player.speedModifier = cfg.sprintMultiplier;
      player.stamina -= cfg.staminaDrain;
    } else {
      player.speedModifier = 1;
    }

    if (player.coldTimer > 0) {
      player.speedModifier *= GAME_CONFIG.entities.enemy.skeletonMagic.coldSpeedMultiplier;
    }

    if (player.stamina < 0) player.stamina = 0;
    if (player.stamina < cfg.stamina) {
      if (!moving) {
        player.stamina += cfg.staminaRegenIdle;
      } else if (!shift) {
        player.stamina += cfg.staminaRegenMoving;
      }
    }
    if (DEV_FLAGS.infiniteStamina) player.stamina = cfg.stamina;
    if (player.invulnerable) player.invulnerable--;
    if (player.invulnerable < 0) player.invulnerable = 0;

    player.applyKnockback(walls);

    if (player.attackCooldownTimer > 0) player.attackCooldownTimer--;
    if (player.attackTimer > 0) player.attackTimer--;

    // Start a new attack: drain stamina, set timers, clear hit tracking
    const weapon = player.weapon;
    if (keys[" "] && player.attackCooldownTimer === 0 && player.stamina >= weapon.staminaCost) {
      player.stamina -= weapon.staminaCost;
      player.attackTimer = weapon.duration;
      player.attackCooldownTimer = weapon.cooldown;
      player.attackHitIds.clear();
    }

    if (up) player.facing = "up";
    if (down) player.facing = "down";
    if (left) player.facing = "left";
    if (right) player.facing = "right";

    player.wallCheck(walls);

    if (up) {
      if ((left || right) && !player.collisions.top) { // normalize diagonal speed unless blocked on top
        player.pos[1] += -player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[1] += -player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.up.palY;
      if (!left && !right) {
        player.drawOptions.palX = player.stridePalettePos("up");
      }
    }

    if (down) {
      if (left || right) {
        player.pos[1] += player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[1] += player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.down.palY;
      if (!left && !right) {
        player.drawOptions.palX = player.stridePalettePos("down");
      }
    }

    if (left) {
      if ((up || down) && !player.collisions.left) { // normalize diagonal speed unless blocked on left
        player.pos[0] += -player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[0] += -player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.left.palY;
      player.drawOptions.palX = player.stridePalettePos("left");
    }

    if (right) {
      if (up || down) {
        player.pos[0] += player.normalizedSpeed * player.speedModifier;
      } else {
        player.pos[0] += player.speed * player.speedModifier;
      }
      player.drawOptions.palY = player.stride.right.palY;
      player.drawOptions.palX = player.stridePalettePos("right");
    }

    if (!up && !down && !right && !left) {
      player.drawOptions.palX = 48 * 1;
    }

    const beingKnockedBack = player.knockbackVx !== 0 || player.knockbackVy !== 0;
    const [x, y] = player.pos;
    let exitDir;
    if (!beingKnockedBack && x < -24) {
      exitDir = "left";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (!beingKnockedBack && x > 720 - 24) {
      exitDir = "right";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (!beingKnockedBack && y < -24) {
      exitDir = "up";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (!beingKnockedBack && y > 720 - 24) {
      exitDir = "down";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    }

    if (!player.invulCheck()) {
      player.drawOptions.palX = 48 * 3;
    }

    player.updateSides();
    player.velocity = exitDir
      ? [0, 0]
      : [
        player.center[0] - previousCenter[0],
        player.center[1] - previousCenter[1],
      ];
    player.drawOptions.x = player.pos[0];
    player.drawOptions.y = player.pos[1];
  };

  return player;
}

export default createPlayer;
