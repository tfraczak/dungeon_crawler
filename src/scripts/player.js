import createEntity from "./entity";
import { BASE_SPEED } from "./utils/global_vars";
import GAME_CONFIG from "./game_config";
import { roomChange } from "./utils/func_utils";

function createPlayer(pos, width, height, spritePalette, gameState) {
  const player = createEntity(pos, width, height, spritePalette);
  const cfg = GAME_CONFIG.player;

  player.gameState = gameState;
  player.speed = BASE_SPEED * cfg.speedMultiplier;
  player.normalizedSpeed = player.speed / Math.sqrt(2);
  player.pace = 24 / player.speed;
  player.speedModifier = 1;
  player.stamina = cfg.stamina;
  player.invulnerable = 0;
  player.hp = cfg.hp;
  player.strength = cfg.strength;
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

  player.facing = "down";
  player.attackTimer = 0;
  player.attackCooldownTimer = 0;
  player.knockbackVx = 0;
  player.knockbackVy = 0;

  player.hit = () => {
    player.invulnerable = cfg.invulnerabilityFrames;
  };

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

  player.attackHitbox = () => {
    const [cx, cy] = player.center;
    const halfArc = cfg.attackArc / 2;
    let baseAngle;
    switch (player.facing) {
      case "up":    baseAngle = -Math.PI / 2; break;
      case "down":  baseAngle = Math.PI / 2; break;
      case "left":  baseAngle = Math.PI; break;
      case "right": baseAngle = 0; break;
    }
    return {
      x: cx,
      y: cy,
      range: cfg.attackRange,
      startAngle: baseAngle - halfArc,
      endAngle: baseAngle + halfArc,
      baseAngle,
    };
  };

  player.move = (walls) => {
    const keys = player.gameState.keys;
    const [up, down, left, right, shift] = [
      keys["w"], keys["s"], keys["a"], keys["d"], keys["Shift"],
    ];

    const moving = up || down || left || right;

    if (shift && player.stamina > 0 && moving) {
      player.speedModifier = cfg.sprintMultiplier;
      player.stamina -= cfg.staminaDrain;
    } else {
      player.speedModifier = 1;
    }

    if (player.stamina < 0) player.stamina = 0;
    if (player.stamina < cfg.stamina) {
      if (!moving) {
        player.stamina += cfg.staminaRegenIdle;
      } else if (!shift) {
        player.stamina += cfg.staminaRegenMoving;
      }
    }
    if (player.invulnerable) player.invulnerable--;
    if (player.invulnerable < 0) player.invulnerable = 0;

    player.applyKnockback(walls);

    if (player.attackCooldownTimer > 0) player.attackCooldownTimer--;
    if (player.attackTimer > 0) player.attackTimer--;

    if (keys[" "] && player.attackCooldownTimer === 0 && player.stamina >= cfg.attackStaminaCost) {
      player.stamina -= cfg.attackStaminaCost;
      player.attackTimer = cfg.attackDuration;
      player.attackCooldownTimer = cfg.attackCooldown;
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
    player.drawOptions.x = player.pos[0];
    player.drawOptions.y = player.pos[1];
  };

  return player;
}

export default createPlayer;
