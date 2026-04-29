import Random from "@utils/random";
import { updateSpriteFrame } from "./animation";

const KNOCKBACK_BOUNDS = 35;

const correctCollision = (enemy, side) => {
  const offsetX = enemy.colBox.pos[0] - enemy.pos[0];
  const offsetY = enemy.colBox.pos[1] - enemy.pos[1];
  switch (side) {
    case "top":
      enemy.pos[1] = enemy.collisions.top - offsetY;
      break;
    case "bottom":
      enemy.pos[1] = enemy.collisions.bottom - offsetY - enemy.colBox.height;
      break;
    case "left":
      enemy.pos[0] = enemy.collisions.left - offsetX;
      break;
    case "right":
      enemy.pos[0] = enemy.collisions.right - offsetX - enemy.colBox.width;
      break;
    default:
      break;
  }
};

const applyKnockback = (enemy, walls) => {
  if (Math.abs(enemy.knockbackVx) < 0.1 && Math.abs(enemy.knockbackVy) < 0.1) {
    enemy.knockbackVx = 0;
    enemy.knockbackVy = 0;
    return;
  }
  enemy.pos[0] += enemy.knockbackVx;
  enemy.pos[1] += enemy.knockbackVy;
  enemy.updateSides();

  for (let wall of walls) { if (enemy.collidedOnSide("top", wall, KNOCKBACK_BOUNDS)) break; }
  if (enemy.collisions.top) {
    correctCollision(enemy, "top");
    enemy.knockbackVy = 0;
  }
  for (let wall of walls) { if (enemy.collidedOnSide("bottom", wall, KNOCKBACK_BOUNDS)) break; }
  if (enemy.collisions.bottom) {
    correctCollision(enemy, "bottom");
    enemy.knockbackVy = 0;
  }
  for (let wall of walls) { if (enemy.collidedOnSide("left", wall, KNOCKBACK_BOUNDS)) break; }
  if (enemy.collisions.left) {
    correctCollision(enemy, "left");
    enemy.knockbackVx = 0;
  }
  for (let wall of walls) { if (enemy.collidedOnSide("right", wall, KNOCKBACK_BOUNDS)) break; }
  if (enemy.collisions.right) {
    correctCollision(enemy, "right");
    enemy.knockbackVx = 0;
  }

  enemy.knockbackVx *= 0.7;
  enemy.knockbackVy *= 0.7;
  enemy.updateSides();
};

const wallCheck = (enemy, walls) => {
  const { up, down, left, right } = enemy.movement;

  if (up) {
    for (let wall of walls) { if (enemy.collidedOnSide("top", wall)) break; }
    if (enemy.collisions.top) correctCollision(enemy, "top");
  }
  if (down) {
    for (let wall of walls) { if (enemy.collidedOnSide("bottom", wall)) break; }
    if (enemy.collisions.bottom) correctCollision(enemy, "bottom");
  }
  if (left) {
    for (let wall of walls) { if (enemy.collidedOnSide("left", wall)) break; }
    if (enemy.collisions.left) correctCollision(enemy, "left");
  }
  if (right) {
    for (let wall of walls) { if (enemy.collidedOnSide("right", wall)) break; }
    if (enemy.collisions.right) correctCollision(enemy, "right");
  }
};

export const setupMovement = (enemy, cfg) => {
  enemy.distToPlayer = () => {
    const player = enemy.gameState.session.player;
    const dx = enemy.center[0] - player.center[0];
    const dy = enemy.center[1] - player.center[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  enemy.normalizedVectorPos = () => {
    const player = enemy.gameState.session.player;
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
        const randAngle = Random.range(0, 2 * Math.PI);
        enemy.dirX = Math.cos(randAngle);
        enemy.dirY = Math.sin(randAngle);
        enemy.idleCount = 1;
      }
      enemy.idleCount++;
      if (enemy.idleCount >= enemy.idleMax) {
        enemy.idleCount = 0;
        if (Random.chance(cfg.idlePauseChance)) {
          enemy.idlePaused = true;
          enemy.idlePauseTimer = Random.int(cfg.idlePauseMin, cfg.idlePauseMax - 1);
          enemy.movement = { up: false, down: false, left: false, right: false };
          return [0, 0];
        }
      }
    }

    enemy.angle = Math.atan2(enemy.dirY, enemy.dirX);
    const speed = enemy.speed * enemy.speedModifier;
    const [nx, ny] = enemy.adjustMovement(
      Math.cos(enemy.angle) * speed,
      Math.sin(enemy.angle) * speed,
      speed,
      enemy,
    );

    enemy.movement.right = nx > 0;
    enemy.movement.left  = nx < 0;
    enemy.movement.down  = ny > 0;
    enemy.movement.up    = ny < 0;

    const spriteDir = enemy.resolveSpriteDir?.(nx, ny, enemy);
    if (spriteDir) {
      enemy.spriteDir = spriteDir;
    } else if (Math.abs(ny) > Math.abs(nx)) {
      enemy.spriteDir = ny < 0 ? "up" : "down";
    } else {
      enemy.spriteDir = nx < 0 ? "left" : "right";
    }

    return [nx, ny];
  };

  enemy.move = (walls) => {
    enemy.chasingPlayer = enemy.distToPlayer() < enemy.detectDist;
    if (enemy.forceMovement(enemy)) enemy.chasingPlayer = true;
    const targetSpeedModifier = enemy.resolveSpeedModifier
      ? enemy.resolveSpeedModifier(enemy, cfg)
      : (enemy.chasingPlayer ? cfg.chaseSpeedModifier : cfg.idleSpeedModifier);
    const rate = cfg.speedTransitionRate ?? 1;
    enemy.speedModifier += (targetSpeedModifier - enemy.speedModifier) * rate;

    const [nx, ny] = enemy.normalizedVectorPos();
    enemy.pos[0] += nx;
    enemy.pos[1] += ny;
    enemy.updateSides();
    if (enemy.beforeWallCheck(enemy)) return;

    applyKnockback(enemy, walls);
    wallCheck(enemy, walls);
    enemy.updateSides();
    updateSpriteFrame(enemy);
    enemy.hitPlayer();
    enemy.updateSides();
    enemy.drawOptions.x = enemy.pos[0];
    enemy.drawOptions.y = enemy.pos[1];
    enemy.afterMove(enemy);
  };
};
