import createCoin from "@entities/coin/coin";
import createChest from "@entities/chest/chest";
import createEnemy from "@entities/enemy/enemy";
import createLadder from "@entities/ladder/ladder";
import * as GAME_CONFIG from "@core/game_config";
import DEV_FLAGS, { configValue } from "@core/dev_flags";
import { shuffle } from "@utils/helpers";
import Random from "@utils/random";
import { drawCoinPouch, triggerCoinDropAnim, updateCoinPouchAnims } from "@ui/hud/coin_pouch";
import { drawKeyring } from "@ui/hud/keyring";
import setupRoomCombat from "./combat";
import { pickVariantIndex, getForcedConfig } from "./map_variants";
import createRoomMap from "./room_map";
import {
  chestsCanSpawn,
  enemyCountPoints,
  enemyDifficultyPoints,
  pickEnemyType,
  targetEnemyCount,
} from "./difficulty";
import {
  randNumPaths,
  addValidNeighbors,
  buildPaths,
  assignBlockedPaths,
  randNumCoins,
} from "./generation";

const ENEMY_SPAWN_FLAG_BY_TYPE = Object.freeze({
  bat: "enemyBatSpawnCount",
  blob: "enemyBlobSpawnCount",
  goblin: "enemyGoblinSpawnCount",
  skeleton: "enemySkeletonSpawnCount",
});

const EXIT_NODE_DELTA = Object.freeze({
  up: Object.freeze([0, 1]),
  down: Object.freeze([0, -1]),
  left: Object.freeze([-1, 0]),
  right: Object.freeze([1, 0]),
});

const ENTRY_POS_BY_EXIT = Object.freeze({
  up: Object.freeze({ x: [324, 348], y: [600, 624] }),
  down: Object.freeze({ x: [324, 348], y: [96, 120] }),
  left: Object.freeze({ x: [600, 624], y: [324, 348] }),
  right: Object.freeze({ x: [96, 120], y: [324, 348] }),
});

function createRoom(neighbor, gameState) {
  const coinSpawnCfg = GAME_CONFIG.entities.coin.spawn;
  const enemySpawnCfg = GAME_CONFIG.entities.enemy.spawn;
  const enemyCfg = GAME_CONFIG.entities.enemy;
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
    const pos = [randSpawnAxis(coinSpawnCfg), randSpawnAxis(coinSpawnCfg)];
    const coin = createCoin(pos, 16, 16, gameState.sprites.coin, gameState);
    room.coins[coin.id] = coin;
  }

  // HP potions only enter a room as enemy drops; no procedural spawning.
  room.hpPotions = {};
  room.equipmentPickups = {};
  room.keys = {};
  room.chests = {};
  // Earliest timestamp (ms) at which this room is eligible for its next
  // chest spawn roll. 0 = "rollable right now". The timer is updated by
  // `tryRollChest` (on a failed roll) and by `onChestOpened` (after the
  // player loots a chest). Successful spawns intentionally do NOT advance
  // the timer — the spawned chest sits there indefinitely until opened.
  room.chestRollAvailableAt = 0;

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
  let numPaths;
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
    room.map = createRoomMap(forcedPaths, room.bgConfig);
    room.walls.push(...room.map.movementWalls);
    session.rooms[`${room.nodePos}`] = room;
  } else if (neighbor) {
    pathsArr = pathsArr.filter(path => path !== entryDir);
    numPaths = randNumPaths(paths.length);
    if (numPaths === paths.length) {
      randIdx = pickVariantIndex(numPaths, paths);
      room.background = bgImgs[`${numPaths}${paths}${randIdx}`];
      room.bgConfig = { numPaths, paths, variantIdx: randIdx };
      assignBlockedPaths(room, paths);
      room.map = createRoomMap(paths, room.bgConfig);
      room.walls.push(...room.map.movementWalls);
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
      room.map = createRoomMap(newPaths, room.bgConfig);
      room.walls.push(...room.map.movementWalls);
      session.rooms[`${room.nodePos}`] = room;
    }
  } else {
    numPaths = randNumPaths(paths.length);
    if (numPaths === paths.length) {
      randIdx = pickVariantIndex(numPaths, paths);
      room.background = bgImgs[`${numPaths}${paths}${randIdx}`];
      room.bgConfig = { numPaths, paths, variantIdx: randIdx };
      room.map = createRoomMap(paths, room.bgConfig);
      room.walls.push(...room.map.movementWalls);
      session.rooms[`${room.nodePos}`] = room;
    } else {
      shuffle(pathsArr);
      for (let i = 0; i < numPaths; i++) { newPaths.push(pathsArr.pop()); }
      newPaths = newPaths.sort().join("");
      randIdx = pickVariantIndex(numPaths, newPaths);
      room.background = bgImgs[`${numPaths}${newPaths}${randIdx}`];
      room.bgConfig = { numPaths, paths: newPaths, variantIdx: randIdx };
      assignBlockedPaths(room, newPaths);
      room.map = createRoomMap(newPaths, room.bgConfig);
      room.walls.push(...room.map.movementWalls);
      session.rooms[`${room.nodePos}`] = room;
    }
  }

  room.enemies = {};
  room.enemyProjectiles = [];
  const enemySpawnMax = enemySpawnCfg.max - 1;

  const devEnemySpawnCounts = () => {
    let hasOverride = false;
    const counts = {};
    for (const type of enemyCfg.types) {
      const value = DEV_FLAGS[ENEMY_SPAWN_FLAG_BY_TYPE[type]];
      if (Number.isFinite(value)) hasOverride = true;
      counts[type] = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
    }
    return hasOverride ? counts : null;
  };

  const addEnemy = (enemy) => {
    enemy.room = room;
    enemy.id ??= uniqueEnemyId();
    let key = `${enemy.pos}`;
    let suffix = 1;
    while (room.enemies[key]) {
      key = `${enemy.pos}-${suffix}`;
      suffix++;
    }
    room.enemies[key] = enemy;
  };

  room.addEnemy = addEnemy;

  const roomKey = () => `${room.nodePos}`;

  const roomRespawns = () => session.enemyRespawns[roomKey()] ?? [];

  const setRoomRespawns = (respawns) => {
    if (respawns.length === 0) {
      delete session.enemyRespawns[roomKey()];
    } else {
      session.enemyRespawns[roomKey()] = respawns;
    }
  };

  const uniqueEnemyId = () => {
    let id;
    do {
      id = Math.random().toString(16).slice(2, 9);
    } while (Object.values(room.enemies).some(enemy => enemy.id === id));
    return id;
  };

  room.addEnemyProjectile = (projectile) => {
    room.enemyProjectiles.push(projectile);
  };

  const addChest = (chest) => {
    chest.updateSides();
    room.chests[chest.id] = chest;
  };

  room.updateEnemyProjectiles = (player) => {
    if (room.enemyProjectiles.length === 0) return;
    room.enemyProjectiles.forEach(projectile => projectile.update(room, player));
    room.enemyProjectiles = room.enemyProjectiles.filter(projectile => !projectile.done);
  };

  room.drawEnemyProjectiles = (ctx) => {
    room.enemyProjectiles.forEach(projectile => projectile.draw(ctx));
  };

  const removeEnemy = (enemy) => {
    for (const [key, roomEnemy] of Object.entries(room.enemies)) {
      if (roomEnemy === enemy) {
        delete room.enemies[key];
        return true;
      }
    }
    return false;
  };

  const enemyEntryPos = (exitDir, enemy) => {
    const zone = ENTRY_POS_BY_EXIT[exitDir];
    return [
      Random.int(zone.x[0], zone.x[1]) - (enemy.width / 2),
      Random.int(zone.y[0], zone.y[1]) - (enemy.height / 2),
    ];
  };

  room.enemyCanExit = (exitDir) => {
    const exitLetters = { up: "U", down: "D", left: "L", right: "R" };
    return room.bgConfig?.paths?.includes(exitLetters[exitDir]) ?? false;
  };

  room.transferEnemyToExit = (enemy, exitDir) => {
    if (!room.enemyCanExit(exitDir) || !EXIT_NODE_DELTA[exitDir]) return false;

    const [dx, dy] = EXIT_NODE_DELTA[exitDir];
    const nextNodePos = [room.nodePos[0] + dx, room.nodePos[1] + dy];
    const session = gameState.session;
    let nextRoom = session.rooms[`${nextNodePos}`];
    if (!nextRoom) {
      nextRoom = createRoom({ [exitDir]: room }, gameState);
      addValidNeighbors(room, gameState);
      addValidNeighbors(nextRoom, gameState);
    }

    if (!removeEnemy(enemy)) return false;

    enemy.pos = enemyEntryPos(exitDir, enemy);
    enemy.chasingPlayer = false;
    enemy.idleCount = 0;
    enemy.room = nextRoom;
    enemy.updateSides();
    enemy.drawOptions.x = enemy.pos[0];
    enemy.drawOptions.y = enemy.pos[1];
    nextRoom.addEnemy(enemy);
    return true;
  };

  room.spawnEnemy = (type, totalEnemies, spawnPos = null, id = null) => {
    const pos = spawnPos ?? [
      Random.int(enemySpawnCfg.min, enemySpawnMax),
      Random.int(enemySpawnCfg.min, enemySpawnMax),
    ];
    const detectDist = enemyCfg.baseDetectDistance + (totalEnemies * enemyCfg.detectDistancePerEnemy);
    const enemy = createEnemy({
      pos,
      width: 48,
      height: 48,
      spritePalette: gameState.sprites.monsters,
      type,
      detectDist,
      gameState,
    });
    if (!enemy) return;
    if (id) enemy.id = id;
    addEnemy(enemy);
  };

  room.scheduleEnemyRespawn = (enemy, now = Date.now()) => {
    setRoomRespawns([...roomRespawns(), {
      id: enemy.id ?? uniqueEnemyId(),
      type: enemy.type,
      respawnAt: now + enemyCfg.respawnDelayMs,
    }]);
  };

  room.tickEnemyRespawns = (now = Date.now()) => {
    const respawns = roomRespawns();
    if (respawns.length === 0) return;

    const pending = [];
    const due = [];
    for (const respawn of respawns) {
      if (respawn.respawnAt <= now) {
        due.push(respawn);
      } else {
        pending.push(respawn);
      }
    }

    setRoomRespawns(pending);
    if (due.length === 0) return;

    const totalEnemies = Math.max(1, Object.keys(room.enemies).length + due.length);
    for (const respawn of due) {
      const type = devEnemySpawnCounts() ? respawn.type : pickEnemyType(session);
      room.spawnEnemy(type, totalEnemies, null, respawn.id);
    }
  };

  setupRoomCombat(room, gameState);

  room.spawnEnemies = (counts) => {
    const totalToSpawn = Object.values(counts).reduce((total, count) => total + count, 0);
    const totalEnemies = Math.max(1, Object.keys(room.enemies).length + totalToSpawn);
    for (const type of enemyCfg.types) {
      for (let i = 0; i < counts[type]; i++) {
        room.spawnEnemy(type, totalEnemies);
      }
    }
  };

  room.spawnScaledEnemies = (targetCount = targetEnemyCount(session, room)) => {
    if (devEnemySpawnCounts()) return;
    const liveEnemies = Object.keys(room.enemies).length;
    const pendingRespawns = roomRespawns().length;
    const countToSpawn = Math.max(0, targetCount - liveEnemies - pendingRespawns);
    const totalEnemies = Math.max(1, liveEnemies + countToSpawn);
    for (let i = 0; i < countToSpawn; i++) {
      room.spawnEnemy(pickEnemyType(session), totalEnemies);
    }
  };

  room.scaleToDifficulty = () => {
    if (devEnemySpawnCounts()) return;
    room.lastScaledEnemyCountPoints = enemyCountPoints(session);
    room.lastScaledEnemyDifficultyPoints = enemyDifficultyPoints(session);
    room.lastScaledTargetCount = targetEnemyCount(session, room);
    room.spawnScaledEnemies(room.lastScaledTargetCount);
  };

  room.spawnDevEnemies = () => {
    const counts = devEnemySpawnCounts();
    if (!counts) return;
    room.spawnEnemies(counts);
  };

  // Generate enemies
  const configuredSpawnCounts = devEnemySpawnCounts();
  if (configuredSpawnCounts) {
    room.spawnEnemies(configuredSpawnCounts);
  }

  // Per-entry chest roll. Called on first creation (below) and again on
  // every re-entry by `roomChange`, mirroring the ladder roll pattern.
  //
  // Rolling rules:
  //   - Difficulty gate: chests don't appear before the skeleton tier so
  //     they can't show up before the player has any way to get keys.
  //   - One-at-a-time gate: if there's already a non-broken, unopened
  //     chest in the room, skip the roll entirely (don't even consume the
  //     cooldown — the existing chest is the "winning" roll until opened).
  //   - Cooldown gate: rolls are limited to once every `rerollMs` per
  //     room. Failed rolls advance the cooldown; successful rolls do not
  //     (they stick the chest in the room indefinitely, and the next
  //     cooldown is started when the chest is eventually opened).
  room.tryRollChest = (now = Date.now()) => {
    if (!chestsCanSpawn(session)) return;
    if (now < room.chestRollAvailableAt) return;
    const hasUnopenedChest = Object.values(room.chests)
      .some(chest => !chest.opened && !chest.broken);
    if (hasUnopenedChest) return;
    const cfg = GAME_CONFIG.entities.chest;
    if (Random.chance(cfg.chance)) {
      addChest(createChest([
        randSpawnAxis(coinSpawnCfg),
        randSpawnAxis(coinSpawnCfg),
      ], gameState));
    } else {
      room.chestRollAvailableAt = now + cfg.rerollMs;
    }
  };

  // Hook called by `chest.open` (key or brute) so the room knows to start
  // its post-open cooldown timer. After this fires, the next eligible
  // entry won't roll again for `rerollMs` ms.
  room.onChestOpened = (now = Date.now()) => {
    room.chestRollAvailableAt = now + GAME_CONFIG.entities.chest.rerollMs;
  };

  // Dev/test escape hatch: drop a chest in the room right now, ignoring the
  // difficulty gate, the per-room reroll cooldown, and the one-at-a-time
  // rule. Returns the spawned chest. Used by the dev-options "Force chest
  // spawn" button — production gameplay should always go through
  // `tryRollChest`.
  room.spawnChestNow = () => {
    const chest = createChest([
      randSpawnAxis(coinSpawnCfg),
      randSpawnAxis(coinSpawnCfg),
    ], gameState);
    addChest(chest);
    return chest;
  };

  // Note: the initial chest roll for this room is NOT triggered from
  // inside createRoom. The caller (game.js for the starting room,
  // roomChange for entry transitions) calls tryRollChest, mirroring the
  // tryRollLadder pattern so the "roll on entry" semantics live in one
  // place and new-room creation doesn't double-roll.

  // Movement-collision sources: room walls plus every still-intact chest's
  // colBox. Brute-broken chests are skipped because they're already
  // mid-debris (their drop has been collected and the silhouette is gone).
  // Key-opened chests still block — they remain rendered as a closed-looking
  // sprite, so passing through them would read as a bug.
  room.movementBlockers = () => {
    const blockers = room.walls.slice();
    for (const chest of Object.values(room.chests)) {
      if (chest.broken) continue;
      blockers.push(chest.colBox);
    }
    return blockers;
  };

  room.scatterEnemies = () => {
    for (const enemy of Object.values(room.enemies)) {
      enemy.pos[0] = Random.int(enemySpawnCfg.min, enemySpawnMax);
      enemy.pos[1] = Random.int(enemySpawnCfg.min, enemySpawnMax);
      enemy.chasingPlayer = false;
      enemy.idleCount = 0;
      enemy.updateSides();
    }
  };

  room.resolveEnemyCollisions = () => {
    const collisionBoxFor = (entity, otherEntity) => {
      if (otherEntity.flying && !entity.flying && entity.headColBox) return entity.headColBox;
      return entity.colBox;
    };

    const enemies = Object.values(room.enemies);
    for (let i = 0; i < enemies.length; i++) {
      for (let j = i + 1; j < enemies.length; j++) {
        const a = enemies[i];
        const b = enemies[j];
        const aBox = collisionBoxFor(a, b);
        const bBox = collisionBoxFor(b, a);

        const overlapX = Math.min(aBox.pos[0] + aBox.width, bBox.pos[0] + bBox.width) - Math.max(aBox.pos[0], bBox.pos[0]);
        const overlapY = Math.min(aBox.pos[1] + aBox.height, bBox.pos[1] + bBox.height) - Math.max(aBox.pos[1], bBox.pos[1]);

        if (overlapX <= 0 || overlapY <= 0) continue;

        // Push apart along the axis with the smaller overlap
        if (overlapX < overlapY) {
          const sign = aBox.center[0] < bBox.center[0] ? -1 : 1;
          a.pos[0] += sign * (overlapX / 2);
          b.pos[0] -= sign * (overlapX / 2);
        } else {
          const sign = aBox.center[1] < bBox.center[1] ? -1 : 1;
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
      if (enemy.flying) continue;

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
      player.wallCheckKnockback(room.movementBlockers());
      player.updateSides();
      enemy.updateSides();
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
    const winCoinCount = configValue({
      value: GAME_CONFIG.game.winCoinCount,
      override: DEV_FLAGS.winCoinCount,
    });
    if (!force && coinCount < winCoinCount) return;

    room.ladderRolled = true;
    const chance = (typeof DEV_FLAGS.ladderChance === "number")
      ? DEV_FLAGS.ladderChance
      : GAME_CONFIG.entities.ladder.chance;
    if (!force && !Random.chance(chance)) return;

    room.ladder = createLadder(pickLadderPos(room), gameState);
  };

  room.animate = () => {
    room.collect();
    Object.values(room.coins).forEach(coin => coin.animate(room));
    Object.values(room.hpPotions).forEach(potion => potion.animate(room));
    Object.values(room.equipmentPickups).forEach(pickup => pickup.animate(room));
    Object.values(room.keys).forEach(key => key.animate(room));
    Object.values(room.chests).forEach(chest => chest.animate(room));
    for (const [id, chest] of Object.entries(room.chests)) {
      if (chest.done) delete room.chests[id];
    }
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
        triggerCoinDropAnim(gameState.session.player);
        return;
      }
    }
    for (let potion of Object.values(room.hpPotions)) {
      if (potion.collect()) {
        delete room.hpPotions[potion.id];
        const player = gameState.session.player;
        const maxHp = GAME_CONFIG.entities.player.hp;
        const healAmount = configValue({
          value: GAME_CONFIG.entities.hpPotion.healAmount,
          override: DEV_FLAGS.hpPotionHealAmount,
        });
        player.hp = Math.min(maxHp, player.hp + healAmount);
        return;
      }
    }
    for (let pickup of Object.values(room.equipmentPickups)) {
      if (pickup.collect()) {
        delete room.equipmentPickups[pickup.id];
        return;
      }
    }
    for (let key of Object.values(room.keys)) {
      if (key.collect()) {
        delete room.keys[key.id];
        return;
      }
    }
    if (gameState.keys.e) {
      const player = gameState.session.player;
      for (let chest of Object.values(room.chests)) {
        if (chest.tryKeyOpen(player, room)) return;
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
      ...Object.values(room.equipmentPickups),
      ...Object.values(room.keys),
      ...Object.values(room.chests),
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

    const maxStamina = GAME_CONFIG.entities.player.stamina;
    const maxHp = GAME_CONFIG.entities.player.hp;
    const isMobile = gameState.isMobile;

    ctx.fillStyle = "#fffaf4";
    ctx.font = "20px arial";
    // Room coordinates are a debug aid. Webpack replaces process.env.NODE_ENV
    // at build time, so the label drops out of the production bundle entirely
    // (yarn serve/watch keep it visible; yarn build hides it).
    if (process.env.NODE_ENV !== "production") {
      ctx.fillText(`Room [ ${room.nodePos} ]`, 15, 30);
      ctx.fillText(`Kills x ${session.enemiesKilled ?? 0}`, 15, 55);
    }
    // Pouch + keyring are stacked side-by-side in the bottom-right of the
    // HUD. The pouch fills as the player accumulates coins (capped at the
    // win threshold of 10 with an overflow visual), and the keyring grows a
    // hanging key per key collected up to the configured maxKeys. Both
    // widgets shrink/grow live with the underlying state — goblins
    // stealing coins or the player spending a key updates the visual on
    // the next frame without any extra event plumbing.
    const POUCH_SIZE = 44;
    const KEYRING_SIZE = 44;
    const WIDGET_GAP = 12;
    const RIGHT_MARGIN = 15;
    const BOTTOM_MARGIN = 8;

    updateCoinPouchAnims(player, session.coinCount ?? 0);

    const widgetsWidth = POUCH_SIZE + WIDGET_GAP + KEYRING_SIZE;
    const widgetY = ctx.canvas.height - POUCH_SIZE - BOTTOM_MARGIN;
    const pouchX = ctx.canvas.width - widgetsWidth - RIGHT_MARGIN;
    const keyringX = pouchX + POUCH_SIZE + WIDGET_GAP;

    drawCoinPouch(ctx, pouchX, widgetY, session.coinCount ?? 0, POUCH_SIZE, player, gameState.sprites.coinPouch);
    drawKeyring(ctx, keyringX, widgetY, player.keyCount ?? 0, KEYRING_SIZE);

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
  const w = GAME_CONFIG.entities.ladder.width;
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
  const spawnMax = spawnCfg.max - 1;
  const MAX_TRIES = 16;
  for (let i = 0; i < MAX_TRIES; i++) {
    const v = Random.int(spawnCfg.min, spawnMax);
    if (v <= spawnCfg.excludeMin || v >= spawnCfg.excludeMax) return v;
  }
  // Fallback: pick the closer non-excluded edge of the exclusion band.
  const lowerSpan = Math.max(0, spawnCfg.excludeMin - spawnCfg.min);
  const upperSpan = Math.max(0, spawnCfg.max - spawnCfg.excludeMax);
  if (lowerSpan === 0 && upperSpan === 0) return spawnCfg.min;
  if (Random.chance(lowerSpan / (lowerSpan + upperSpan))) {
    return Random.int(spawnCfg.min, spawnCfg.min + lowerSpan - 1);
  }
  return Random.int(spawnCfg.excludeMax, spawnCfg.excludeMax + upperSpan - 1);
}

export default createRoom;
