import * as GAME_CONFIG from "@core/game_config";

const LOW_HP_THRESHOLD = 10;
const SPRINT_DELAY_MS = 300;
const CHASE_SPRINT_SPEED_MODIFIER = GAME_CONFIG.entities.player.sprintMultiplier * 0.93;
const FLEE_SPRINT_SPEED_MODIFIER = GAME_CONFIG.entities.player.sprintMultiplier * 0.75;
const EXIT_BLOCK_DISTANCE = 96;
const PLAYER_STANDOFF_DISTANCE = 8;
const ROOM_MIN = 0;
const ROOM_MAX = 720;
const EXIT_MIN = 288;
const EXIT_MAX = 432;
const EXITS = Object.freeze({
  U: Object.freeze({ dir: "up", x: 360, y: 0, dx: 0, dy: -1 }),
  D: Object.freeze({ dir: "down", x: 360, y: 720, dx: 0, dy: 1 }),
  L: Object.freeze({ dir: "left", x: 0, y: 360, dx: -1, dy: 0 }),
  R: Object.freeze({ dir: "right", x: 720, y: 360, dx: 1, dy: 0 }),
});

const exitDistance = (enemy, exit) => {
  const dx = exit.x - enemy.center[0];
  const dy = exit.y - enemy.center[1];
  return Math.sqrt((dx * dx) + (dy * dy));
};

const playerBlocksExit = (enemy, player, exit) => {
  const exitX = exit.x - enemy.center[0];
  const exitY = exit.y - enemy.center[1];
  const playerX = player.center[0] - enemy.center[0];
  const playerY = player.center[1] - enemy.center[1];
  const exitLenSq = (exitX * exitX) + (exitY * exitY);
  if (exitLenSq === 0) return false;

  const projection = ((playerX * exitX) + (playerY * exitY)) / exitLenSq;
  if (projection <= 0 || projection >= 1) return false;

  const closestX = enemy.center[0] + (exitX * projection);
  const closestY = enemy.center[1] + (exitY * projection);
  const distX = player.center[0] - closestX;
  const distY = player.center[1] - closestY;
  return Math.sqrt((distX * distX) + (distY * distY)) < EXIT_BLOCK_DISTANCE;
};

const normalize = (x, y) => {
  const dist = Math.sqrt((x * x) + (y * y)) || 1;
  return [x / dist, y / dist];
};

const directionToward = (from, to) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  if (Math.abs(dy) > Math.abs(dx)) return dy < 0 ? "up" : "down";
  return dx < 0 ? "left" : "right";
};

const boxDistance = (a, b, ax = a.pos[0], ay = a.pos[1]) => {
  const dx = Math.max(b.pos[0] - (ax + a.width), ax - (b.pos[0] + b.width), 0);
  const dy = Math.max(b.pos[1] - (ay + a.height), ay - (b.pos[1] + b.height), 0);
  return Math.sqrt((dx * dx) + (dy * dy));
};

const nearestPlayerSideTarget = (enemy, player) => {
  const [px, py] = player.colBox.pos;
  const [ex, ey] = enemy.center;
  const playerCenter = player.colBox.center;
  const halfEnemyW = enemy.colBox.width / 2;
  const halfEnemyH = enemy.colBox.height / 2;
  const candidates = [
    [playerCenter[0], py - PLAYER_STANDOFF_DISTANCE - halfEnemyH],
    [playerCenter[0], py + player.colBox.height + PLAYER_STANDOFF_DISTANCE + halfEnemyH],
    [px - PLAYER_STANDOFF_DISTANCE - halfEnemyW, playerCenter[1]],
    [px + player.colBox.width + PLAYER_STANDOFF_DISTANCE + halfEnemyW, playerCenter[1]],
  ];

  return candidates.reduce((nearest, candidate) => {
    const nearestDist = ((nearest[0] - ex) ** 2) + ((nearest[1] - ey) ** 2);
    const candidateDist = ((candidate[0] - ex) ** 2) + ((candidate[1] - ey) ** 2);
    return candidateDist < nearestDist ? candidate : nearest;
  });
};

const keepPlayerStandoff = (nx, ny, speed, enemy, player) => {
  const target = nearestPlayerSideTarget(enemy, player);
  const targetDx = target[0] - enemy.center[0];
  const targetDy = target[1] - enemy.center[1];
  const targetDistance = Math.sqrt((targetDx * targetDx) + (targetDy * targetDy));
  if (targetDistance > Math.max(1, speed)) {
    const [moveX, moveY] = normalize(targetDx, targetDy);
    return [moveX * speed, moveY * speed];
  }
  if (targetDistance > 0.5) return [targetDx, targetDy];

  const gap = boxDistance(enemy.colBox, player.colBox);
  if (gap < PLAYER_STANDOFF_DISTANCE) {
    const [awayX, awayY] = normalize(enemy.center[0] - player.center[0], enemy.center[1] - player.center[1]);
    const correction = Math.min(speed, PLAYER_STANDOFF_DISTANCE - gap);
    return [awayX * correction, awayY * correction];
  }

  const nextGap = boxDistance(
    enemy.colBox,
    player.colBox,
    enemy.colBox.pos[0] + nx,
    enemy.colBox.pos[1] + ny,
  );
  if (nextGap >= PLAYER_STANDOFF_DISTANCE || nextGap >= gap) return [nx, ny];

  const closingDistance = gap - nextGap;
  if (closingDistance <= 0) return [nx, ny];

  const scale = Math.max(0, Math.min(1, (gap - PLAYER_STANDOFF_DISTANCE) / closingDistance));
  return [nx * scale, ny * scale];
};

const sortByDistance = (enemy, exits) => [...exits].sort((a, b) => (
  exitDistance(enemy, a) - exitDistance(enemy, b)
));

const openExitsFor = (room) => (
  (room?.bgConfig?.paths ?? "")
    .split("")
    .map(key => EXITS[key])
    .filter(Boolean)
);

const inExitOpening = (enemy, exitDir) => {
  const [x, y] = enemy.colBox.center;
  if (exitDir === "up" || exitDir === "down") return x >= EXIT_MIN && x <= EXIT_MAX;
  return y >= EXIT_MIN && y <= EXIT_MAX;
};

const reachedExit = (enemy, exitDir) => {
  if (!inExitOpening(enemy, exitDir)) return false;

  switch (exitDir) {
    case "up":
      return enemy.colBox.top[1] <= ROOM_MIN;
    case "down":
      return enemy.colBox.bottom[1] >= ROOM_MAX;
    case "left":
      return enemy.colBox.left[0] <= ROOM_MIN;
    case "right":
      return enemy.colBox.right[0] >= ROOM_MAX;
    default:
      return false;
  }
};

const chooseExit = (enemy, player, exits) => {
  const nearest = sortByDistance(enemy, exits);
  if (!playerBlocksExit(enemy, player, nearest[0])) return nearest[0];

  const playerX = player.center[0] - enemy.center[0];
  const playerY = player.center[1] - enemy.center[1];
  const pointsAwayFromPlayer = exit => ((exit.dx * playerX) + (exit.dy * playerY)) < 0;
  const unblocked = nearest.filter(exit => !playerBlocksExit(enemy, player, exit));
  const opposite = unblocked.filter(pointsAwayFromPlayer);
  return opposite[0] ?? unblocked[0] ?? nearest.find(pointsAwayFromPlayer) ?? nearest[0];
};

const circleAroundPlayer = (enemy, player, exit, speed) => {
  const toExitX = exit.x - enemy.center[0];
  const toExitY = exit.y - enemy.center[1];
  const fromPlayerX = enemy.center[0] - player.center[0];
  const fromPlayerY = enemy.center[1] - player.center[1];
  const cross = (toExitX * fromPlayerY) - (toExitY * fromPlayerX);
  const turn = cross >= 0 ? 1 : -1;
  const [awayX, awayY] = normalize(fromPlayerX, fromPlayerY);
  const orbitX = -awayY * turn;
  const orbitY = awayX * turn;
  const [moveX, moveY] = normalize((awayX * 0.35) + orbitX, (awayY * 0.35) + orbitY);
  return [moveX * speed, moveY * speed];
};

export const createGoblinBehavior = () => {
  let sprintRequestedAt = null;

  const fleeing = enemy => enemy.hp < LOW_HP_THRESHOLD;

  const resolveSpeedModifier = (enemy, cfg) => {
    const player = enemy.gameState.session.player;
    if (fleeing(enemy)) {
      sprintRequestedAt = null;
      return FLEE_SPRINT_SPEED_MODIFIER;
    }

    if (!enemy.chasingPlayer || !player.sprinting) {
      sprintRequestedAt = null;
      return enemy.chasingPlayer ? cfg.chaseSpeedModifier : cfg.idleSpeedModifier;
    }

    sprintRequestedAt ??= Date.now();
    return Date.now() - sprintRequestedAt >= SPRINT_DELAY_MS
      ? CHASE_SPRINT_SPEED_MODIFIER
      : cfg.chaseSpeedModifier;
  };

  const adjustMovement = (nx, ny, speed, enemy) => {
    const player = enemy.gameState.session.player;
    if (!fleeing(enemy)) {
      enemy.fleeExitDir = null;
      if (enemy.chasingPlayer) return keepPlayerStandoff(nx, ny, speed, enemy, player);
      return [nx, ny];
    }

    const exits = openExitsFor(enemy.room);
    enemy.fleeExitDir = null;
    if (exits.length === 0) {
      const [awayX, awayY] = normalize(enemy.center[0] - player.center[0], enemy.center[1] - player.center[1]);
      return [awayX * speed, awayY * speed];
    }

    const exit = chooseExit(enemy, player, exits);
    enemy.fleeExitDir = exit.dir;
    if (exits.length === 1 && playerBlocksExit(enemy, player, exit)) {
      return circleAroundPlayer(enemy, player, exit, speed);
    }

    const [exitX, exitY] = normalize(exit.x - enemy.center[0], exit.y - enemy.center[1]);
    return [exitX * speed, exitY * speed];
  };

  const transferIfReady = (enemy) => {
    if (!fleeing(enemy) || !enemy.fleeExitDir) return;
    if (!reachedExit(enemy, enemy.fleeExitDir)) return;
    return enemy.room?.transferEnemyToExit?.(enemy, enemy.fleeExitDir);
  };

  const resolveSpriteDir = (nx, ny, enemy) => {
    if (enemy.chasingPlayer && !fleeing(enemy)) {
      const player = enemy.gameState.session.player;
      return directionToward(enemy.center, player.center);
    }

    if (Math.abs(ny) > Math.abs(nx)) return ny < 0 ? "up" : "down";
    if (Math.abs(nx) > 0) return nx < 0 ? "left" : "right";
    return enemy.spriteDir;
  };

  return {
    beforeWallCheck: transferIfReady,
    adjustMovement,
    afterMove: transferIfReady,
    forceMovement: fleeing,
    resolveSpriteDir,
    resolveSpeedModifier,
  };
};
