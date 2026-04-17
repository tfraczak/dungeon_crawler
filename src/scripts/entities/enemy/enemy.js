import createEntity from "../entity";
import createCoin from "../coin/coin";
import { BASE_SPEED } from "../../utils/global_vars";
import GAME_CONFIG from "../../core/game_config";

function createEnemy(pos, width, height, spritePalette, type, detectDist, gameState) {
  const enemy = createEntity(pos, width, height, spritePalette);
  const cfg = GAME_CONFIG.enemy;

  enemy.gameState = gameState;
  enemy.hp = cfg.hp;
  enemy.strength = cfg.strength;
  enemy.speed = BASE_SPEED * cfg.speedMultiplier;
  enemy.speedModifier = cfg.idleSpeedModifier;
  enemy.pace = 24 / enemy.speed;
  enemy.chasingPlayer = false;
  enemy.detectDist = detectDist;
  enemy.idleCount = 0;
  enemy.idleMax = cfg.idleMaxFrames;
  enemy.idlePaused = false;
  enemy.idlePauseTimer = 0;
  enemy.type = type;
  enemy.movement = { up: false, down: false, left: false, right: false };

  let x, y;
  switch (type) {
    case "blob":  x = 48 * 3; y = 48 * 0; break;
    case "bat":   x = 48 * 0; y = 48 * 0; break;
    case "ghost": x = 48 * 6; y = 48 * 4; break;
  }
  enemy.palXOffset = x;
  enemy.stride = {
    up:    { stepCount: 0, palY: (48 * 3) + y },
    down:  { stepCount: 0, palY: (48 * 0) + y },
    left:  { stepCount: 0, palY: (48 * 1) + y },
    right: { stepCount: 0, palY: (48 * 2) + y },
  };

  // Mirror player.stridePalettePos: derive a 4-phase cycle (idle, foot-down,
  // idle, foot-down) from stepCount/pace so fractional paces (smoothed
  // speedModifier) animate cleanly without arithmetic edge cases.
  enemy.stridePalettePos = (direction) => {
    const speed = Math.max(0.0001, enemy.speed * enemy.speedModifier);
    enemy.pace = 24 / speed;
    const stride = enemy.stride[direction];
    const cycleLength = Math.max(1, 4 * enemy.pace);
    const phase = Math.floor((stride.stepCount % cycleLength) / enemy.pace) % 4;

    stride.stepCount++;
    if (stride.stepCount >= cycleLength) stride.stepCount = 0;

    switch (phase) {
      case 1:  return (48 * 0) + enemy.palXOffset;
      case 3:  return (48 * 2) + enemy.palXOffset;
      default: return (48 * 1) + enemy.palXOffset;
    }
  };

  enemy.distToPlayer = () => {
    const player = enemy.gameState.session.player;
    const dx = enemy.center[0] - player.center[0];
    const dy = enemy.center[1] - player.center[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  enemy.normalizedVectorPos = () => {
    const player = enemy.gameState.session.player;
    // Unit-ish vector pointing FROM enemy TOWARD player (canvas convention:
    // +x is right, +y is down). Direction the enemy wants to travel.
    let dirX = player.center[0] - enemy.center[0];
    let dirY = player.center[1] - enemy.center[1];

    if (enemy.chasingPlayer) {
      enemy.idlePaused = false;
      enemy.idlePauseTimer = 0;
      enemy.dirX = dirX;
      enemy.dirY = dirY;
    } else if (enemy.idlePaused) {
      enemy.idlePauseTimer--;
      if (enemy.idlePauseTimer <= 0) {
        enemy.idlePaused = false;
        enemy.idleCount = 0;
      }
      enemy.movement = { up: false, down: false, left: false, right: false };
      return [0, 0];
    } else {
      if (!enemy.idleCount) {
        const randAngle = Math.random() * 2 * Math.PI;
        enemy.dirX = Math.cos(randAngle);
        enemy.dirY = Math.sin(randAngle);
        enemy.idleCount = 1;
      }
      enemy.idleCount++;
      if (enemy.idleCount >= enemy.idleMax) {
        enemy.idleCount = 0;
        if (Math.random() < cfg.idlePauseChance) {
          enemy.idlePaused = true;
          enemy.idlePauseTimer = cfg.idlePauseMin +
            Math.floor(Math.random() * (cfg.idlePauseMax - cfg.idlePauseMin));
          enemy.movement = { up: false, down: false, left: false, right: false };
          return [0, 0];
        }
      }
    }

    enemy.angle = Math.atan2(enemy.dirY, enemy.dirX);
    const speed = enemy.speed * enemy.speedModifier;
    const nx = Math.cos(enemy.angle) * speed;
    const ny = Math.sin(enemy.angle) * speed;

    enemy.movement.right = nx > 0;
    enemy.movement.left  = nx < 0;
    enemy.movement.down  = ny > 0;
    enemy.movement.up    = ny < 0;

    if (Math.abs(ny) > Math.abs(nx)) {
      enemy.spriteDir = ny < 0 ? "up" : "down";
    } else {
      enemy.spriteDir = nx < 0 ? "left" : "right";
    }

    return [nx, ny];
  };

  enemy.damage = () => Math.floor(Math.random() * (cfg.damageMax - cfg.damageMin + 1)) + cfg.damageMin;

  enemy.alive = () => enemy.hp > 0;

  // Roll each entry in the drop table and return spawned items by type
  enemy.drop = () => {
    const items = { coins: [] };
    for (const drop of cfg.drops) {
      if (Math.random() >= drop.chance) continue;
      if (drop.type === "coin") {
        const coin = createCoin(
          [enemy.center[0] - 8, enemy.center[1] - 8],
          16, 16, gameState.sprites.coin, gameState,
        );
        coin.startDrop(enemy.center[0], enemy.center[1]);
        items.coins.push(coin);
      }
    }
    return items;
  };

  enemy.knockbackVx = 0;
  enemy.knockbackVy = 0;

  enemy.takeDamage = (amount, knockback) => {
    enemy.hp -= amount;
    if (enemy.hp < 0) enemy.hp = 0;
    const player = enemy.gameState.session.player;
    const dx = enemy.center[0] - player.center[0];
    const dy = enemy.center[1] - player.center[1];
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    // knockbackFactor scales the impulse the enemy receives — think of it as
    // 1 - knockback resistance. 1.0 = full impulse, lower = stiffer enemy.
    const factor = cfg.knockbackFactor ?? 1;
    enemy.knockbackVx = (dx / dist) * knockback * factor;
    enemy.knockbackVy = (dy / dist) * knockback * factor;
  };

  const knockbackBounds = 35;

  enemy.applyKnockback = (walls) => {
    if (Math.abs(enemy.knockbackVx) < 0.1 && Math.abs(enemy.knockbackVy) < 0.1) {
      enemy.knockbackVx = 0;
      enemy.knockbackVy = 0;
      return;
    }
    enemy.pos[0] += enemy.knockbackVx;
    enemy.pos[1] += enemy.knockbackVy;
    enemy.updateSides();

    for (let wall of walls) { if (enemy.collidedOnSide("top", wall, knockbackBounds)) break; }
    if (enemy.collisions.top) {
      enemy.pos[1] = enemy.collisions.top - (enemy.height - enemy.colBox.height);
      enemy.knockbackVy = 0;
    }
    for (let wall of walls) { if (enemy.collidedOnSide("bottom", wall, knockbackBounds)) break; }
    if (enemy.collisions.bottom) {
      enemy.pos[1] = enemy.collisions.bottom - 48;
      enemy.knockbackVy = 0;
    }
    for (let wall of walls) { if (enemy.collidedOnSide("left", wall, knockbackBounds)) break; }
    if (enemy.collisions.left) {
      enemy.pos[0] = enemy.collisions.left - (enemy.colBox.width / 2);
      enemy.knockbackVx = 0;
    }
    for (let wall of walls) { if (enemy.collidedOnSide("right", wall, knockbackBounds)) break; }
    if (enemy.collisions.right) {
      enemy.pos[0] = enemy.collisions.right - (enemy.colBox.width + (enemy.colBox.width / 2));
      enemy.knockbackVx = 0;
    }

    enemy.knockbackVx *= 0.7;
    enemy.knockbackVy *= 0.7;
    enemy.updateSides();
  };

  enemy.hitPlayer = () => {
    const player = enemy.gameState.session.player;
    if (enemy.distToPlayer() < cfg.hitDistance && !player.invulnerable) {
      const dx = player.center[0] - enemy.center[0];
      const dy = player.center[1] - enemy.center[1];
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const knockback = GAME_CONFIG.player.hitKnockback;
      player.knockbackVx = (dx / dist) * knockback;
      player.knockbackVy = (dy / dist) * knockback;
      player.hp -= enemy.damage();
      if (player.hp < 0) player.hp = 0;
      player.hit();
    }
  };

  enemy.wallCheck = (walls) => {
    const { up, down, left, right } = enemy.movement;

    if (up) {
      for (let wall of walls) { if (enemy.collidedOnSide("top", wall)) break; }
      if (enemy.collisions.top) {
        enemy.pos[1] = enemy.collisions.top - (enemy.height - enemy.colBox.height);
      }
    }
    if (down) {
      for (let wall of walls) { if (enemy.collidedOnSide("bottom", wall)) break; }
      if (enemy.collisions.bottom) {
        enemy.pos[1] = enemy.collisions.bottom - 48;
      }
    }
    if (left) {
      for (let wall of walls) { if (enemy.collidedOnSide("left", wall)) break; }
      if (enemy.collisions.left) {
        enemy.pos[0] = enemy.collisions.left - (enemy.colBox.width / 2);
      }
    }
    if (right) {
      for (let wall of walls) { if (enemy.collidedOnSide("right", wall)) break; }
      if (enemy.collisions.right) {
        enemy.pos[0] = enemy.collisions.right - (enemy.colBox.width + (enemy.colBox.width / 2));
      }
    }
  };

  enemy.move = (walls) => {
    enemy.chasingPlayer = enemy.distToPlayer() < enemy.detectDist;
    const targetSpeedModifier = enemy.chasingPlayer
      ? cfg.chaseSpeedModifier
      : cfg.idleSpeedModifier;
    // Smoothly interpolate toward target so AI doesn't snap between states.
    const rate = cfg.speedTransitionRate ?? 1;
    enemy.speedModifier += (targetSpeedModifier - enemy.speedModifier) * rate;

    const [nx, ny] = enemy.normalizedVectorPos();
    enemy.pos[0] += nx;
    enemy.pos[1] += ny;

    enemy.applyKnockback(walls);
    enemy.wallCheck(walls);
    enemy.updateSides();

    switch (enemy.spriteDir) {
      case "up":
        enemy.drawOptions.palY = enemy.stride.up.palY;
        enemy.drawOptions.palX = enemy.stridePalettePos("up");
        break;
      case "down":
        enemy.drawOptions.palY = enemy.stride.down.palY;
        enemy.drawOptions.palX = enemy.stridePalettePos("down");
        break;
      case "left":
        enemy.drawOptions.palY = enemy.stride.left.palY;
        enemy.drawOptions.palX = enemy.stridePalettePos("left");
        break;
      case "right":
        enemy.drawOptions.palY = enemy.stride.right.palY;
        enemy.drawOptions.palX = enemy.stridePalettePos("right");
        break;
      default:
        enemy.drawOptions.palX = 48 * 1;
        break;
    }

    enemy.hitPlayer();
    enemy.updateSides();
    enemy.drawOptions.x = enemy.pos[0];
    enemy.drawOptions.y = enemy.pos[1];
  };

  return enemy;
}

export default createEnemy;
