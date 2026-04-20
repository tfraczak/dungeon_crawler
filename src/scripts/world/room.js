import createWall from "./wall";
import createCoin from "../entities/coin/coin";
import createEnemy from "../entities/enemy/enemy";
import createLadder from "../entities/ladder/ladder";
import createPoof from "../effects/poof";
import { playPoofSound, playSlashHit, playSlashWhiff } from "../sounds";
import GAME_CONFIG from "../core/game_config";
import DEV_FLAGS from "../core/dev_flags";

import { shuffle } from "../utils/helpers";
import Random from "../utils/random";
import { pickVariantIndex, getForcedConfig } from "../utils/map_variants";
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

  // HP potions only enter a room as enemy drops; no procedural spawning.
  room.hpPotions = {};

  // Win-condition ladder. Each room rolls AT MOST ONCE for a ladder spawn,
  // and only after the player has reached the coin threshold (see
  // tryRollLadder below). Once `ladderRolled` flips true the room is done
  // -- a ladder either exists or that room will never spawn one.
  room.ladder = null;
  room.ladderRolled = false;

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

  // Dev short-circuit: when `forceNextMapConfig` is set, bypass the entire
  // procedural exit picker and stamp the room with the requested config.
  // This intentionally ignores `entryDir` and the valid-neighbor set, so it
  // can produce orphan rooms / doors that lead into walls -- documented and
  // accepted in dev_flags.js. Falls through to the normal picker if the
  // requested config has no matching background image loaded.
  const forcedPaths = getForcedConfig();
  let forcedBg = null;
  if (forcedPaths) {
    randIdx = pickVariantIndex(forcedPaths.length, forcedPaths);
    forcedBg = bgImgs[`${forcedPaths.length}${forcedPaths}${randIdx}`];
  }

  if (forcedBg) {
    numPaths = forcedPaths.length;
    room.background = forcedBg;
    room.bgConfig = { numPaths, paths: forcedPaths, variantIdx: randIdx };
    assignBlockedPaths(room, forcedPaths);
    walls = buildRoomWalls(forcedPaths);
    room.walls.push(...walls);
    session.rooms[`${room.nodePos}`] = room;
  } else if (neighbor) {
    pathsArr = pathsArr.filter(path => path !== entryDir);
    numPaths = randNumPaths(paths.length);
    if (numPaths === paths.length) {
      randIdx = pickVariantIndex(numPaths, paths);
      room.background = bgImgs[`${numPaths}${paths}${randIdx}`];
      room.bgConfig = { numPaths, paths, variantIdx: randIdx };
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
      randIdx = pickVariantIndex(numPaths + 1, newPaths);
      room.background = bgImgs[`${numPaths + 1}${newPaths}${randIdx}`];
      room.bgConfig = { numPaths: numPaths + 1, paths: newPaths, variantIdx: randIdx };
      assignBlockedPaths(room, newPaths);
      walls = buildRoomWalls(newPaths);
      room.walls.push(...walls);
      session.rooms[`${room.nodePos}`] = room;
    }
  } else {
    numPaths = randNumPaths(paths.length);
    if (numPaths === paths.length) {
      randIdx = pickVariantIndex(numPaths, paths);
      room.background = bgImgs[`${numPaths}${paths}${randIdx}`];
      room.bgConfig = { numPaths, paths, variantIdx: randIdx };
      walls = buildRoomWalls(paths);
      room.walls.push(...walls);
      session.rooms[`${room.nodePos}`] = room;
    } else {
      shuffle(pathsArr);
      for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()); }
      newPaths = newPaths.sort().join("");
      randIdx = pickVariantIndex(numPaths, newPaths);
      room.background = bgImgs[`${numPaths}${newPaths}${randIdx}`];
      room.bgConfig = { numPaths, paths: newPaths, variantIdx: randIdx };
      assignBlockedPaths(room, newPaths);
      walls = buildRoomWalls(newPaths);
      room.walls.push(...walls);
      session.rooms[`${room.nodePos}`] = room;
    }
  }

  // Generate enemies
  const numEnemies = Math.floor(Object.keys(session.rooms).length / 2);
  room.enemies = {};
  const enemySpawnMax = spawnCfg.enemyMax - 1;
  for (let i = 0; i < numEnemies; i++) {
    let x = Random.int(spawnCfg.enemyMin, enemySpawnMax);
    let y = Random.int(spawnCfg.enemyMin, enemySpawnMax);
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
      enemy.pos[0] = Random.int(spawnCfg.enemyMin, enemySpawnMax);
      enemy.pos[1] = Random.int(spawnCfg.enemyMin, enemySpawnMax);
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
          for (const potion of drops.hpPotions) {
            room.hpPotions[potion.id] = potion;
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

  // Once-per-room ladder roll. Called by the room-change pipeline every time
  // the player enters this room (including re-entries). The spawn gate is:
  //   1. Hasn't rolled yet AND no ladder already placed.
  //   2. Either the player has reached the win-coin threshold OR the dev
  //      `forceLadder` flag is on.
  // Once a roll happens the result is sticky -- a failed roll permanently
  // sets `ladderRolled` so the room won't roll again on a future re-entry.
  // `forceLadder` short-circuits both the threshold and the chance roll.
  room.tryRollLadder = (coinCount) => {
    if (room.ladder || room.ladderRolled) return;
    const force = DEV_FLAGS.forceLadder;
    if (!force && coinCount < GAME_CONFIG.game.winCoinCount) return;

    room.ladderRolled = true;
    const chance = (typeof DEV_FLAGS.ladderChance === "number")
      ? DEV_FLAGS.ladderChance
      : GAME_CONFIG.ladder.chance;
    if (!force && !Random.chance(chance)) return;

    room.ladder = createLadder(pickLadderPos(room), gameState);
  };

  room.animate = () => {
    room.collect();
    Object.values(room.coins).forEach(coin => coin.animate(room));
    Object.values(room.hpPotions).forEach(potion => potion.animate(room));
    room.poofs.forEach(p => p.update());
    room.poofs = room.poofs.filter(p => !p.done);
  };

  // Only one item per frame is collected so each pickup reads cleanly (own
  // sound, own HUD bump). Coins are checked first simply to match the order
  // they were historically the only pickup. The ladder is checked LAST and
  // does NOT consume itself -- it stays in the room and signals the game
  // loop (via session.climbing) that the win cinematic should start. The
  // ladder also no-ops once the cinematic has begun so it can't re-trigger.
  room.collect = () => {
    for (let coin of Object.values(room.coins)) {
      if (coin.collect()) {
        delete room.coins[coin.id];
        gameState.session.coinCount++;
        return;
      }
    }
    for (let potion of Object.values(room.hpPotions)) {
      if (potion.collect()) {
        delete room.hpPotions[potion.id];
        const player = gameState.session.player;
        const maxHp = GAME_CONFIG.player.hp;
        player.hp = Math.min(maxHp, player.hp + GAME_CONFIG.hpPotion.healAmount);
        return;
      }
    }
    if (room.ladder && !gameState.session.climbing && !gameState.session.climbed) {
      const player = gameState.session.player;
      if (room.ladder.checkPlayerOverlap(player)) {
        gameState.session.startClimb(room.ladder);
      }
    }
  };

  room.allEntities = (player) => {
    return [
      player,
      ...Object.values(room.enemies),
      ...Object.values(room.coins),
      ...Object.values(room.hpPotions),
      ...(room.ladder ? [room.ladder] : []),
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

    // HP bar reads left-to-right: red fill = remaining HP on top of a solid
    // black track (missing HP). Stamina stays yellow, invulnerability cyan.
    // "HP" / "ST" labels sit at the anchor (left edge of the old bar origin)
    // and the bars themselves are pushed right by LABEL_OFFSET to make room.
    const HP_FILL = "#d42c2c";
    const HP_EMPTY = "#111";
    const STAMINA = "#ffbb00";
    const INVULN = "#00dddd";
    const LABEL_OFFSET = 28;
    const BAR_LEN = 100;

    const drawLabel = (text, x, y) => {
      ctx.fillStyle = "#fffaf4";
      ctx.font = "bold 14px arial";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, y);
      ctx.textBaseline = "alphabetic";
    };

    if (isMobile) {
      const labelX = 15;
      const barX = labelX + LABEL_OFFSET;
      const barY = 48;
      drawLabel("HP", labelX, barY);
      drawLabel("ST", labelX, barY + 19);
      ctx.beginPath();
      ctx.strokeStyle = HP_EMPTY;
      ctx.lineWidth = 10;
      ctx.moveTo(barX, barY);
      ctx.lineTo(barX + BAR_LEN, barY);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = HP_FILL;
      ctx.lineWidth = 10;
      ctx.moveTo(barX, barY);
      ctx.lineTo(barX + (player.hp / maxHp) * BAR_LEN, barY);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = INVULN;
      ctx.lineWidth = 5;
      ctx.moveTo(barX, barY + 11);
      ctx.lineTo(barX + (player.invulnerable / 75) * BAR_LEN, barY + 11);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = STAMINA;
      ctx.lineWidth = 5;
      ctx.moveTo(barX, barY + 19);
      ctx.lineTo(barX + (player.stamina / maxStamina) * BAR_LEN, barY + 19);
      ctx.stroke();
    } else {
      const labelX = 15;
      const barX = labelX + LABEL_OFFSET;
      const barY = ctx.canvas.height - 15;
      drawLabel("HP", labelX, barY - 15);
      drawLabel("ST", labelX, barY);
      ctx.beginPath();
      ctx.strokeStyle = STAMINA;
      ctx.lineWidth = 5;
      ctx.moveTo(barX, barY);
      ctx.lineTo(barX + (player.stamina / maxStamina) * BAR_LEN, barY);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = HP_EMPTY;
      ctx.lineWidth = 10;
      ctx.moveTo(barX, barY - 15);
      ctx.lineTo(barX + BAR_LEN, barY - 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = HP_FILL;
      ctx.lineWidth = 10;
      ctx.moveTo(barX, barY - 15);
      ctx.lineTo(barX + (player.hp / maxHp) * BAR_LEN, barY - 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.strokeStyle = INVULN;
      ctx.lineWidth = 5;
      ctx.moveTo(barX, barY - 6);
      ctx.lineTo(barX + (player.invulnerable / 75) * BAR_LEN, barY - 6);
      ctx.stroke();
    }
  };

  return room;
}

// Picks a top-left position for the win-condition ladder. The ladder is
// mounted ON the top wall: y = 0 puts the rails flush with the top of the
// canvas so they overlay the wall texture (the bottom of the rails plus the
// drop shadow spill onto the floor tile just below the wall, grounding the
// prop). The horizontal slot is chosen at random from any tile-aligned
// column where the ladder won't overlap a top-wall doorway (3 tiles wide,
// centered at cols 6..8 when the room has a "U" exit).
function pickLadderPos(room) {
  const T = GAME_CONFIG.world.tileSize;
  const w = GAME_CONFIG.ladder.width;
  const y = 0;
  const hasTopDoor = room.neighbors.up !== "X";
  const candidates = [];
  // Tile columns 1..13 keep the ladder fully inside the room (col 0 and 14
  // are the side walls). For each candidate, drop it if its [x, x+w] span
  // overlaps the top-door gap [T*6, T*9].
  for (let col = 1; col <= 13; col++) {
    const x = col * T;
    if (hasTopDoor && x < T * 9 && x + w > T * 6) continue;
    candidates.push([x, y]);
  }
  // Pathological fallback: if every candidate happened to clip the door
  // (shouldn't be possible with the current geometry, but the room factory
  // shouldn't crash if we ever tighten the door dimensions), default to the
  // far-left tile so the ladder still spawns.
  if (candidates.length === 0) candidates.push([T, y]);
  return Random.pick(candidates);
}

// Picks a 1-D coin spawn coordinate that avoids the central exclusion band.
// Falls back to a clamped sample if the configured spawn range overlaps the
// exclusion entirely (which would otherwise be an infinite loop).
function randSpawnAxis(spawnCfg) {
  const coinSpawnMax = spawnCfg.coinMax - 1;
  const MAX_TRIES = 16;
  for (let i = 0; i < MAX_TRIES; i++) {
    const v = Random.int(spawnCfg.coinMin, coinSpawnMax);
    if (v <= spawnCfg.coinExcludeMin || v >= spawnCfg.coinExcludeMax) return v;
  }
  // Fallback: pick the closer non-excluded edge of the exclusion band.
  const lowerSpan = Math.max(0, spawnCfg.coinExcludeMin - spawnCfg.coinMin);
  const upperSpan = Math.max(0, spawnCfg.coinMax - spawnCfg.coinExcludeMax);
  if (lowerSpan === 0 && upperSpan === 0) return spawnCfg.coinMin;
  if (Random.chance(lowerSpan / (lowerSpan + upperSpan))) {
    return Random.int(spawnCfg.coinMin, spawnCfg.coinMin + lowerSpan - 1);
  }
  return Random.int(spawnCfg.coinExcludeMax, spawnCfg.coinExcludeMax + upperSpan - 1);
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
