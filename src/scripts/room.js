import createWall from "./wall";
import createCoin from "./coin";
import createEnemy from "./enemy";
import createPoof from "./poof";
import { playPoofSound, playSlashWhiff, playSlashHit } from "./sound";
import GAME_CONFIG from "./game_config";

import { shuffle } from "./utils/helpers";
import {
  randNumPaths,
  addValidNeighbors,
  buildPaths,
  assignBlockedPaths,
  randNumCoins,
} from "./utils/room_generation";


function createRoom(neighbor, gameState) {
  const spawnCfg = GAME_CONFIG.spawn;
  const enemyCfg = GAME_CONFIG.enemy;
  const room = {
    gameState,
    walls: [],
    poofs: [],
    neighbors: {
      up: undefined,
      down: undefined,
      left: undefined,
      right: undefined,
    },
  };

  // Generate coins
  const numCoins = randNumCoins();
  room.coins = {};
  const coinRange = spawnCfg.coinMax - spawnCfg.coinMin;
  for (let i = 0; i < numCoins; i++) {
    let x = Math.floor(Math.random() * coinRange) + spawnCfg.coinMin;
    while (x > spawnCfg.coinExcludeMin && x < spawnCfg.coinExcludeMax) x = Math.floor(Math.random() * coinRange) + spawnCfg.coinMin;
    let y = Math.floor(Math.random() * coinRange) + spawnCfg.coinMin;
    while (y > spawnCfg.coinExcludeMin && y < spawnCfg.coinExcludeMax) y = Math.floor(Math.random() * coinRange) + spawnCfg.coinMin;
    let pos = [x, y];
    const coin = createCoin(pos, 16, 16, gameState.sprites.coin, gameState);
    room.coins[`${coin.pos}`] = coin;
  }

  let randIdx;
  let entryDir;
  if (neighbor) {
    const exitDir = Object.keys(neighbor)[0];
    const prevRoom = Object.values(neighbor)[0];
    room.nodePos = [...prevRoom.nodePos];
    switch (exitDir) {
      case "up":
        room.neighbors.down = prevRoom;
        entryDir = "D";
        room.nodePos[1]++;
        break;
      case "down":
        room.neighbors.up = prevRoom;
        entryDir = "U";
        room.nodePos[1]--;
        break;
      case "left":
        room.neighbors.right = prevRoom;
        entryDir = "R";
        room.nodePos[0]--;
        break;
      case "right":
        room.neighbors.left = prevRoom;
        entryDir = "L";
        room.nodePos[0]++;
        break;
    }
  } else {
    room.nodePos = [0, 0];
  }

  const session = gameState.session;
  const bgImgs = gameState.bgImgs;
  session.rooms[`${room.nodePos}`] = room;

  addValidNeighbors(room, gameState);
  let walls, numPaths;
  let newPaths = [];
  let paths = buildPaths(room, gameState);
  let pathsArr = paths.split("");

  if (neighbor) {
    pathsArr = pathsArr.filter(path => path !== entryDir);
    numPaths = randNumPaths(paths.length);
    if (numPaths === paths.length) {
      randIdx = Math.floor(Math.random() * 3);
      room.background = bgImgs[`${numPaths}${paths}${randIdx}`];
      assignBlockedPaths(room, paths);
      walls = buildRoomWalls(paths);
      room.walls.push(...walls);
      session.rooms[`${room.nodePos}`] = room;
    } else {
      shuffle(pathsArr);
      newPaths.push(entryDir);
      numPaths--;
      for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()); }
      newPaths = newPaths.sort().join("");
      randIdx = Math.floor(Math.random() * 3);
      room.background = bgImgs[`${numPaths + 1}${newPaths}${randIdx}`];
      assignBlockedPaths(room, newPaths);
      walls = buildRoomWalls(newPaths);
      room.walls.push(...walls);
      session.rooms[`${room.nodePos}`] = room;
    }
  } else {
    numPaths = randNumPaths(paths.length);
    if (numPaths === paths.length) {
      randIdx = Math.floor(Math.random() * 3);
      room.background = bgImgs[`${numPaths}${paths}${randIdx}`];
      walls = buildRoomWalls(paths);
      room.walls.push(...walls);
      session.rooms[`${room.nodePos}`] = room;
    } else {
      shuffle(pathsArr);
      for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()); }
      newPaths = newPaths.sort().join("");
      randIdx = Math.floor(Math.random() * 3);
      room.background = bgImgs[`${numPaths}${newPaths}${randIdx}`];
      assignBlockedPaths(room, newPaths);
      walls = buildRoomWalls(newPaths);
      room.walls.push(...walls);
      session.rooms[`${room.nodePos}`] = room;
    }
  }

  // Generate enemies
  const numEnemies = Math.floor(Object.keys(session.rooms).length / 2);
  room.enemies = {};
  const enemyRange = spawnCfg.enemyMax - spawnCfg.enemyMin;
  for (let i = 0; i < numEnemies; i++) {
    let x = Math.floor(Math.random() * enemyRange) + spawnCfg.enemyMin;
    let y = Math.floor(Math.random() * enemyRange) + spawnCfg.enemyMin;
    let pos = [x, y];
    const detectDist = enemyCfg.baseDetectDistance + (numEnemies * enemyCfg.detectDistancePerEnemy);
    const enemy = createEnemy(pos, 48, 48, gameState.sprites.monsters, "blob", detectDist, gameState);
    room.enemies[`${enemy.pos}`] = enemy;
  }

  room.scatterEnemies = () => {
    for (const enemy of Object.values(room.enemies)) {
      enemy.pos[0] = Math.floor(Math.random() * enemyRange) + spawnCfg.enemyMin;
      enemy.pos[1] = Math.floor(Math.random() * enemyRange) + spawnCfg.enemyMin;
      enemy.chasingPlayer = false;
      enemy.idleCount = 0;
      enemy.updateSides();
    }
  };

  room.resolveEnemyCollisions = () => {
    const enemies = Object.values(room.enemies);
    for (let i = 0; i < enemies.length; i++) {
      for (let j = i + 1; j < enemies.length; j++) {
        const a = enemies[i];
        const b = enemies[j];
        const aBox = a.colBox;
        const bBox = b.colBox;

        const overlapX = Math.min(aBox.pos[0] + aBox.width, bBox.pos[0] + bBox.width) - Math.max(aBox.pos[0], bBox.pos[0]);
        const overlapY = Math.min(aBox.pos[1] + aBox.height, bBox.pos[1] + bBox.height) - Math.max(aBox.pos[1], bBox.pos[1]);

        if (overlapX <= 0 || overlapY <= 0) continue;

        // Push apart along the axis with the smaller overlap
        if (overlapX < overlapY) {
          const sign = a.center[0] < b.center[0] ? -1 : 1;
          a.pos[0] += sign * (overlapX / 2);
          b.pos[0] -= sign * (overlapX / 2);
        } else {
          const sign = a.center[1] < b.center[1] ? -1 : 1;
          a.pos[1] += sign * (overlapY / 2);
          b.pos[1] -= sign * (overlapY / 2);
        }

        a.updateSides();
        b.updateSides();
      }
    }
  };

  room.resolvePlayerEnemyCollisions = (player) => {
    const pBox = player.colBox;
    for (const enemy of Object.values(room.enemies)) {
      const eBox = enemy.colBox;

      const overlapX = Math.min(pBox.pos[0] + pBox.width, eBox.pos[0] + eBox.width) - Math.max(pBox.pos[0], eBox.pos[0]);
      const overlapY = Math.min(pBox.pos[1] + pBox.height, eBox.pos[1] + eBox.height) - Math.max(pBox.pos[1], eBox.pos[1]);

      if (overlapX <= 0 || overlapY <= 0) continue;

      const totalStrength = player.strength + enemy.strength;
      const playerRatio = enemy.strength / totalStrength;
      const enemyRatio = player.strength / totalStrength;

      if (overlapX < overlapY) {
        const sign = player.center[0] < enemy.center[0] ? -1 : 1;
        player.pos[0] += sign * overlapX * playerRatio;
        enemy.pos[0] -= sign * overlapX * enemyRatio;
      } else {
        const sign = player.center[1] < enemy.center[1] ? -1 : 1;
        player.pos[1] += sign * overlapY * playerRatio;
        enemy.pos[1] -= sign * overlapY * enemyRatio;
      }

      player.pos[0] = Math.max(-24, Math.min(696, player.pos[0]));
      player.pos[1] = Math.max(-24, Math.min(696, player.pos[1]));
      player.updateSides();
      player.wallCheckKnockback(room.walls);
      player.updateSides();
      enemy.updateSides();
    }
  };

  room.resolvePlayerAttack = (player) => {
    if (!player.isAttacking()) return;
    if (player.attackTimer !== GAME_CONFIG.player.attackDuration) return;

    const hitbox = player.attackHitbox();
    const playerCfg = GAME_CONFIG.player;
    let hitAny = false;

    for (const [key, enemy] of Object.entries(room.enemies)) {
      const dx = enemy.center[0] - hitbox.x;
      const dy = enemy.center[1] - hitbox.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > hitbox.range) continue;

      let angle = Math.atan2(dy, dx);
      let start = hitbox.startAngle;
      let end = hitbox.endAngle;

      // Normalize angles for comparison
      while (angle < start) angle += Math.PI * 2;
      while (angle > end + Math.PI * 2) angle -= Math.PI * 2;

      if (angle >= start && angle <= end) {
        hitAny = true;
        const dmg = Math.floor(Math.random() * (playerCfg.attackDamageMax - playerCfg.attackDamageMin + 1)) + playerCfg.attackDamageMin;
        enemy.takeDamage(dmg);
        if (!enemy.alive()) {
          room.poofs.push(createPoof(enemy.center[0], enemy.center[1]));
          playPoofSound();
          delete room.enemies[key];
        }
      }
    }

    if (hitAny) {
      playSlashHit();
    } else {
      playSlashWhiff();
    }
  };

  room.animate = () => {
    room.collect();
    Object.values(room.coins).forEach(coin => coin.animate());
    room.poofs.forEach(p => p.update());
    room.poofs = room.poofs.filter(p => !p.done);
  };

  room.collect = () => {
    for (let coin of Object.values(room.coins)) {
      if (coin.collect()) {
        delete room.coins[`${coin.pos}`];
        gameState.session.coinCount++;
        return;
      }
    }
  };

  room.allEntities = (player) => {
    return [
      player,
      ...Object.values(room.enemies),
      ...Object.values(room.coins),
    ];
  };

  room.draw = (ctx, camera) => {
    ctx.drawImage(room.background, 0, 0);

    const ox = camera ? camera.x : 0;
    const oy = camera ? camera.y : 0;
    const viewW = camera ? camera.viewWidth : 720;

    ctx.fillStyle = "#fffaf4";
    ctx.font = "20px arial";
    ctx.fillText(`Room [ ${room.nodePos} ]`, ox + 15, oy + 30);

    const session = gameState.session;
    const player = session.player;
    ctx.fillText(`Coins x ${session.coinCount}`, ox + viewW - 130, oy + 30);

    const barY = camera ? oy + camera.viewHeight : 705;

    ctx.beginPath();
    ctx.strokeStyle = "#ffbb00";
    ctx.moveTo(ox + 15, barY);
    ctx.lineWidth = 5;
    const maxStamina = GAME_CONFIG.player.stamina;
    const maxHp = GAME_CONFIG.player.hp;
    ctx.lineTo(ox + 15 + (player.stamina / maxStamina) * 100, barY);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#33ff00";
    ctx.moveTo(ox + 15, barY - 15);
    ctx.lineWidth = 10;
    ctx.lineTo(ox + 15 + (player.hp / maxHp) * 100, barY - 15);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.moveTo(ox + 115 - (1 - player.hp / maxHp) * 100, barY - 15);
    ctx.lineWidth = 10;
    ctx.lineTo(ox + 115, barY - 15);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#00dddd";
    ctx.moveTo(ox + 15, barY - 6);
    ctx.lineWidth = 5;
    ctx.lineTo(ox + 15 + (player.invulnerable / 75) * 100, barY - 6);
    ctx.stroke();
  };

  return room;
}

function buildRoomWalls(paths) {
  let walls = [];
  switch (paths) {
    case "DLRU":
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      return walls;
    case "DLU":
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([720 - 48, 0], 48, 720));
      return walls;
    case "LRU":
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 720 - 48], 720, 48));
      return walls;
    case "DRU":
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 0], 48, 720));
      return walls;
    case "DLR":
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 0], 720, 48));
      return walls;
    case "LU":
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([720 - 48, 0], 48, 720));
      walls.push(createWall([0, 720 - 48], 720, 48));
      return walls;
    case "DU":
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([0, 0], 48, 720));
      walls.push(createWall([720 - 48, 0], 48, 720));
      return walls;
    case "RU":
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([0, 720 - 48], 720, 48));
      walls.push(createWall([0, 0], 48, 720));
      return walls;
    case "DL":
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([0, 0], 720, 48));
      walls.push(createWall([720 - 48, 0], 48, 720));
      return walls;
    case "DR":
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([0, 0], 48, 720));
      walls.push(createWall([0, 0], 720, 48));
      return walls;
    case "LR":
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 720 - 48], 720, 48));
      walls.push(createWall([0, 0], 720, 48));
      return walls;
    case "L":
      walls.push(createWall([0, 0], 48, 48 * 6));
      walls.push(createWall([0, 48 * 9], 48, 48 * 6));
      walls.push(createWall([720 - 48, 0], 48, 720));
      walls.push(createWall([0, 720 - 48], 720, 48));
      walls.push(createWall([0, 0], 720, 48));
      return walls;
    case "R":
      walls.push(createWall([720 - 48, 0], 48, 48 * 6));
      walls.push(createWall([720 - 48, 48 * 9], 48, 48 * 6));
      walls.push(createWall([0, 720 - 48], 720, 48));
      walls.push(createWall([0, 0], 48, 720));
      walls.push(createWall([0, 0], 720, 48));
      return walls;
    case "U":
      walls.push(createWall([0, 0], 48 * 6, 48));
      walls.push(createWall([48 * 9, 0], 48 * 6, 48));
      walls.push(createWall([720 - 48, 0], 48, 720));
      walls.push(createWall([0, 720 - 48], 720, 48));
      walls.push(createWall([0, 0], 48, 720));
      return walls;
    case "D":
      walls.push(createWall([0, 720 - 48], 48 * 6, 48));
      walls.push(createWall([48 * 9, 720 - 48], 48 * 6, 48));
      walls.push(createWall([720 - 48, 0], 48, 720));
      walls.push(createWall([0, 0], 48, 720));
      walls.push(createWall([0, 0], 720, 48));
      return walls;
  }
}

export default createRoom;
