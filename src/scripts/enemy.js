import createEntity from "./entity";
import { BASE_SPEED } from "./utils/global_vars";

function createEnemy(pos, width, height, spritePalette, type, detectDist, gameState) {
  const enemy = createEntity(pos, width, height, spritePalette);

  enemy.gameState = gameState;
  enemy.speed = BASE_SPEED * 0.8;
  enemy.speedModifier = 0.75;
  enemy.pace = 24 / enemy.speed;
  enemy.chasingPlayer = false;
  enemy.detectDist = detectDist;
  enemy.idleCount = 0;
  enemy.idleMax = 60;
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

  enemy.stridePalettePos = (direction) => {
    enemy.pace = 24 / (enemy.speed * enemy.speedModifier);
    const stride = enemy.stride[direction];
    if (stride.stepCount <= enemy.pace) {
      stride.stepCount++;
      return (48 * 1) + enemy.palXOffset;
    } else if (stride.stepCount <= 2 * enemy.pace) {
      stride.stepCount++;
      return (48 * 0) + enemy.palXOffset;
    } else if (stride.stepCount <= 3 * enemy.pace) {
      stride.stepCount++;
      return (48 * 1) + enemy.palXOffset;
    } else if (stride.stepCount <= 4 * enemy.pace) {
      stride.stepCount++;
      return (48 * 2) + enemy.palXOffset;
    } else if (stride.stepCount > 4 * enemy.pace) {
      stride.stepCount = 0;
      return (48 * 1) + enemy.palXOffset;
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
    let dx = enemy.center[0] - player.center[0];
    let dy = enemy.center[1] - player.center[1];

    if (!enemy.chasingPlayer && !enemy.idleCount) {
      const randAngle = Math.random() * 2 * Math.PI;
      enemy.dx = Math.cos(randAngle) * enemy.speed * enemy.speedModifier;
      enemy.dy = Math.sin(randAngle) * enemy.speed * enemy.speedModifier;
      enemy.idleCount = 1;
    }

    if (!enemy.chasingPlayer && enemy.idleCount) enemy.idleCount++;

    if (enemy.chasingPlayer) {
      enemy.dx = dx;
      enemy.dy = dy;
    }

    if (enemy.idleCount >= enemy.idleMax) enemy.idleCount = 0;

    enemy.angle = Math.atan(enemy.dy / enemy.dx);
    const ny = Math.sin(enemy.angle) * enemy.speed * enemy.speedModifier;
    const nx = Math.cos(enemy.angle) * enemy.speed * enemy.speedModifier;

    if (enemy.dy > 0) {
      enemy.movement["up"] = true;
      enemy.movement["down"] = false;
      if (Math.abs(enemy.dy) > Math.abs(enemy.dx)) enemy.spriteDir = "up";
    }
    if (enemy.dy < 0) {
      enemy.movement["down"] = true;
      enemy.movement["up"] = false;
      if (Math.abs(enemy.dy) > Math.abs(enemy.dx)) enemy.spriteDir = "down";
    }
    if (enemy.dx > 0) {
      enemy.movement["left"] = true;
      enemy.movement["right"] = false;
      if (Math.abs(enemy.dx) > Math.abs(enemy.dy)) enemy.spriteDir = "left";
    }
    if (enemy.dx < 0) {
      enemy.movement["right"] = true;
      enemy.movement["left"] = false;
      if (Math.abs(enemy.dx) > Math.abs(enemy.dy)) enemy.spriteDir = "right";
    }

    return [nx, ny];
  };

  enemy.damage = () => Math.floor((Math.random() * 4) + 1);

  enemy.hitPlayer = (walls) => {
    const player = enemy.gameState.session.player;
    if (enemy.distToPlayer() < 32 && !player.invulnerable) {
      player.pos[0] -= (0.4 * enemy.dx);
      player.pos[1] -= (0.4 * enemy.dy);
      player.updateSides();
      player.wallCheck(walls);
      player.updateSides();
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
    if (enemy.distToPlayer() < enemy.detectDist) {
      enemy.chasingPlayer = true;
      enemy.speedModifier = 1;
    } else {
      enemy.chasingPlayer = false;
      enemy.speedModifier = 0.75;
    }

    let newVectors = enemy.normalizedVectorPos();
    const { up, down, left, right } = enemy.movement;

    if (left && up)    { enemy.pos[0] -= newVectors[0]; enemy.pos[1] -= newVectors[1]; }
    if (left && down)  { enemy.pos[0] -= newVectors[0]; enemy.pos[1] -= newVectors[1]; }
    if (right && up)   { enemy.pos[0] += newVectors[0]; enemy.pos[1] += newVectors[1]; }
    if (right && down) { enemy.pos[0] += newVectors[0]; enemy.pos[1] += newVectors[1]; }

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

    enemy.hitPlayer(walls);
    enemy.gameState.session.player.wallCheck(walls);
    enemy.updateSides();
    enemy.drawOptions.x = enemy.pos[0];
    enemy.drawOptions.y = enemy.pos[1];
  };

  return enemy;
}

export default createEnemy;
