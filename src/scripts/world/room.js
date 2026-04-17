import createWall from "./wall";
import createCoin from "../entities/coin/coin";
import createEnemy from "../entities/enemy/enemy";
import createPoof from "../effects/poof";
import { playPoofSound, playSlashHit, playSlashWhiff } from "../sounds";
import GAME_CONFIG from "../core/game_config";

import { shuffle } from "../utils/helpers";
import {
  randNumPaths,
  addValidNeighbors,
  buildPaths,
  assignBlockedPaths,
  randNumCoins,
} from "../utils/room_generation";


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
  for (let i = 0; i < numCoins; i++) {
    const pos = [randSpawnAxis(spawnCfg), randSpawnAxis(spawnCfg)];
    const coin = createCoin(pos, 16, 16, gameState.sprites.coin, gameState);
    room.coins[coin.id] = coin;
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
    // NOTE: Only "blob" is spawned today. Per-type stats/behaviors and
    // depth-based spawn weighting are tracked in tmp/docs/planned-features.md
    // (Enemy Variety + Depth Scaling). The bat/ghost sprite offsets in
    // enemy.js are intentionally retained as scaffolding for that feature.
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

  // Runs every frame while the player is attacking. The weapon's full
  // arc hitbox is tested against each enemy's collision box. Each enemy
  // can only be hit once per swing (tracked by player.attackHitIds).
  // On contact: roll damage, apply knockback, and kill if HP depleted.
  // Whiff sound plays only if the entire swing completes with zero hits.
  room.resolvePlayerAttack = (player) => {
    if (!player.isAttacking()) return;

    const weapon = player.weapon;
    const hitbox = player.attackHitbox();
    let hitAny = false;

    for (const [key, enemy] of Object.entries(room.enemies)) {
      if (player.attackHitIds.has(key)) continue;
      if (weapon.hitsTarget(hitbox, enemy.colBox)) {
        hitAny = true;
        player.attackHitIds.add(key);
        enemy.takeDamage(weapon.rollDamage(), weapon.knockback);
        if (!enemy.alive()) {
          room.poofs.push(createPoof(enemy.center[0], enemy.center[1]));
          playPoofSound();
          const drops = enemy.drop();
          for (const coin of drops.coins) {
            room.coins[coin.id] = coin;
          }
          delete room.enemies[key];
        }
      }
    }

    if (hitAny) {
      playSlashHit();
    } else if (player.attackTimer === 1 && player.attackHitIds.size === 0) {
      playSlashWhiff();
    }
  };

  room.animate = () => {
    room.collect();
    Object.values(room.coins).forEach(coin => coin.animate(room));
    room.poofs.forEach(p => p.update());
    room.poofs = room.poofs.filter(p => !p.done);
  };

  room.collect = () => {
    for (let coin of Object.values(room.coins)) {
      if (coin.collect()) {
        delete room.coins[coin.id];
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

  // World-space pass: background tile plus (dev-only) wall outlines. HUD is
  // rendered separately by drawHUD() after the game loop restores the camera
  // transform, so the HUD can use canvas (screen) coordinates directly.
  // `wall.draw` is a no-op unless the collision_boxes_visible dev flag is set.
  room.draw = (ctx) => {
    ctx.drawImage(room.background, 0, 0);
    room.walls.forEach(wall => wall.draw(ctx));
  };

  // Screen-space pass: room label, coin counter, and player status bars.
  // Must be called AFTER ctx.restore() so coordinates are in canvas space.
  // On mobile, the HUD is anchored to the top-left/top-right of the visible
  // canvas. On desktop, status bars hug the bottom of the 720x720 view.
  room.drawHUD = (ctx) => {
    const session = gameState.session;
    const player = session.player;
    if (!player) return;

    const maxStamina = GAME_CONFIG.player.stamina;
    const maxHp = GAME_CONFIG.player.hp;
    const isMobile = gameState.isMobile;

    ctx.fillStyle = "#fffaf4";
    ctx.font = "20px arial";
    // Room coordinates are a debug aid. Webpack replaces process.env.NODE_ENV
    // at build time, so the label drops out of the production bundle entirely
    // (yarn serve/watch keep it visible; yarn build hides it).
    if (process.env.NODE_ENV !== "production") {
      ctx.fillText(`Room [ ${room.nodePos} ]`, 15, 30);
    }
    ctx.fillText(`Coins x ${session.coinCount}`, ctx.canvas.width - 130, 30);

    if (isMobile) {
      const barX = 15;
      const barY = 48;
      ctx.beginPath();
      ctx.strokeStyle = "#33ff00";
      ctx.lineWidth = 10;
      ctx.moveTo(barX, barY);
      ctx.lineTo(barX + (player.hp / maxHp) * 100, barY);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 10;
      ctx.moveTo(barX + 100 - (1 - player.hp / maxHp) * 100, barY);
      ctx.lineTo(barX + 100, barY);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#00dddd";
      ctx.lineWidth = 5;
      ctx.moveTo(barX, barY + 11);
      ctx.lineTo(barX + (player.invulnerable / 75) * 100, barY + 11);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#ffbb00";
      ctx.lineWidth = 5;
      ctx.moveTo(barX, barY + 19);
      ctx.lineTo(barX + (player.stamina / maxStamina) * 100, barY + 19);
      ctx.stroke();
    } else {
      const barY = ctx.canvas.height - 15;
      ctx.beginPath();
      ctx.strokeStyle = "#ffbb00";
      ctx.lineWidth = 5;
      ctx.moveTo(15, barY);
      ctx.lineTo(15 + (player.stamina / maxStamina) * 100, barY);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#33ff00";
      ctx.lineWidth = 10;
      ctx.moveTo(15, barY - 15);
      ctx.lineTo(15 + (player.hp / maxHp) * 100, barY - 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#ff0000";
      ctx.lineWidth = 10;
      ctx.moveTo(115 - (1 - player.hp / maxHp) * 100, barY - 15);
      ctx.lineTo(115, barY - 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = "#00dddd";
      ctx.lineWidth = 5;
      ctx.moveTo(15, barY - 6);
      ctx.lineTo(15 + (player.invulnerable / 75) * 100, barY - 6);
      ctx.stroke();
    }
  };

  return room;
}

// Picks a 1-D coin spawn coordinate that avoids the central exclusion band.
// Falls back to a clamped sample if the configured spawn range overlaps the
// exclusion entirely (which would otherwise be an infinite loop).
function randSpawnAxis(spawnCfg) {
  const range = spawnCfg.coinMax - spawnCfg.coinMin;
  const MAX_TRIES = 16;
  for (let i = 0; i < MAX_TRIES; i++) {
    const v = Math.floor(Math.random() * range) + spawnCfg.coinMin;
    if (v <= spawnCfg.coinExcludeMin || v >= spawnCfg.coinExcludeMax) return v;
  }
  // Fallback: pick the closer non-excluded edge of the exclusion band.
  const lowerSpan = Math.max(0, spawnCfg.coinExcludeMin - spawnCfg.coinMin);
  const upperSpan = Math.max(0, spawnCfg.coinMax - spawnCfg.coinExcludeMax);
  if (lowerSpan === 0 && upperSpan === 0) return spawnCfg.coinMin;
  if (Math.random() * (lowerSpan + upperSpan) < lowerSpan) {
    return spawnCfg.coinMin + Math.floor(Math.random() * lowerSpan);
  }
  return spawnCfg.coinExcludeMax + Math.floor(Math.random() * upperSpan);
}

function buildRoomWalls(paths) {
  const T = GAME_CONFIG.world.tileSize;
  const S = T * 15;
  const walls = [];

  if (paths.includes("U")) {
    walls.push(createWall([0, 0], T * 6, T));
    walls.push(createWall([T * 9, 0], T * 6, T));
  } else {
    walls.push(createWall([0, 0], S, T));
  }

  if (paths.includes("D")) {
    walls.push(createWall([0, S - T], T * 6, T));
    walls.push(createWall([T * 9, S - T], T * 6, T));
  } else {
    walls.push(createWall([0, S - T], S, T));
  }

  if (paths.includes("L")) {
    walls.push(createWall([0, 0], T, T * 6));
    walls.push(createWall([0, T * 9], T, T * 6));
  } else {
    walls.push(createWall([0, 0], T, S));
  }

  if (paths.includes("R")) {
    walls.push(createWall([S - T, 0], T, T * 6));
    walls.push(createWall([S - T, T * 9], T, T * 6));
  } else {
    walls.push(createWall([S - T, 0], T, S));
  }

  return walls;
}

export default createRoom;
