import createEntity from "./entity";
import { BASE_SPEED } from "./utils/global_vars";
import { roomChange } from "./utils/func_utils";

function createPlayer(pos, width, height, spritePalette, gameState) {
  const player = createEntity(pos, width, height, spritePalette);

  player.gameState = gameState;
  player.speed = BASE_SPEED * 1.25;
  player.normalizedSpeed = player.speed / Math.sqrt(2);
  player.pace = 24 / player.speed;
  player.speedModifier = 1;
  player.stamina = 1000;
  player.invulnerable = 0;
  player.hp = 20;
  player.stride = {
    up:    { stepCount: 0, palY: 48 * 6 },
    down:  { stepCount: 0, palY: 48 * 0 },
    left:  { stepCount: 0, palY: 48 * 2 },
    right: { stepCount: 0, palY: 48 * 4 },
  };

  player.newRoomPos = (dir) => {
    switch (dir) {
      case "up":    player.pos[1] = 720 - 24; break;
      case "down":  player.pos[1] = -24; break;
      case "left":  player.pos[0] = 720 - 24; break;
      case "right": player.pos[0] = -24; break;
    }
  };

  player.stridePalettePos = (direction) => {
    player.pace = 24 / (player.speed * player.speedModifier);
    const stride = player.stride[direction];
    if (stride.stepCount <= player.pace) {
      stride.stepCount++;
      return 48 * 1;
    } else if (stride.stepCount <= 2 * player.pace) {
      stride.stepCount++;
      return 48 * 0;
    } else if (stride.stepCount <= 3 * player.pace) {
      stride.stepCount++;
      return 48 * 1;
    } else if (stride.stepCount <= 4 * player.pace) {
      stride.stepCount++;
      return 48 * 2;
    } else if (stride.stepCount > 4 * player.pace) {
      stride.stepCount = 0;
      return 48 * 1;
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

  player.hit = () => {
    player.invulnerable = 60;
  };

  player.move = (walls) => {
    const keys = player.gameState.keys;
    const [up, down, left, right, shift] = [
      keys["w"], keys["s"], keys["a"], keys["d"], keys["Shift"],
    ];

    if (shift && player.stamina > 0) {
      player.speedModifier = 1.5;
      player.stamina -= 4;
    } else {
      player.speedModifier = 1;
    }

    if (player.stamina < 0) player.stamina = 0;
    if (!shift && player.stamina < 1000) {
      if (!up && !down && !right && !left) {
        player.stamina += 2;
      } else {
        player.stamina += 1;
      }
    }
    if (player.invulnerable) player.invulnerable--;
    if (player.invulnerable < 0) player.invulnerable = 0;

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

    const [x, y] = player.pos;
    let exitDir;
    if (x < -24) {
      exitDir = "left";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (x > 720 - 24) {
      exitDir = "right";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (y < -24) {
      exitDir = "up";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    } else if (y > 720 - 24) {
      exitDir = "down";
      player.newRoomPos(exitDir);
      roomChange(exitDir, player.gameState.session.game.room, player.gameState);
    }

    if (!player.invulCheck()) {
      player.drawOptions.palX = 48 * 3;
    }

    player.updateSides();
    player.drawOptions.x = player.pos[0];
    player.drawOptions.y = player.pos[1];
  };

  return player;
}

export default createPlayer;
