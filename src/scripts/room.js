import createWall from "./wall";
import createCoin from "./coin";
import createEnemy from "./enemy";

import {
  randNumPaths,
  addValidNeighbors,
  buildPaths,
  shuffle,
  assignBlockedPaths,
  randNumCoins
} from "./utils/func_utils";


function createRoom(neighbor, gameState) {
  const room = {
    gameState,
    walls: [],
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
    let x = Math.floor(Math.random() * 592) + 64;
    while (x > 336 && x < 384) x = Math.floor(Math.random() * 592) + 64;
    let y = Math.floor(Math.random() * 592) + 64;
    while (y > 336 && y < 384) y = Math.floor(Math.random() * 592) + 64;
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
  for (let i = 0; i < numEnemies; i++) {
    let x = Math.floor(Math.random() * 550) + 64;
    let y = Math.floor(Math.random() * 550) + 64;
    let pos = [x, y];
    const enemy = createEnemy(pos, 48, 48, gameState.sprites.monsters, "blob", 200 + (numEnemies * 50), gameState);
    room.enemies[`${enemy.pos}`] = enemy;
  }

  room.scatterEnemies = () => {
    for (const enemy of Object.values(room.enemies)) {
      enemy.pos[0] = Math.floor(Math.random() * 550) + 64;
      enemy.pos[1] = Math.floor(Math.random() * 550) + 64;
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

  room.animate = () => {
    room.collect();
    Object.values(room.coins).forEach(coin => coin.animate());
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

  room.draw = (ctx) => {
    ctx.drawImage(room.background, 0, 0);
    ctx.fillStyle = "#fffaf4";
    ctx.font = "20px arial";
    ctx.fillText(`Room [ ${room.nodePos} ]`, 15, 30);

    const session = gameState.session;
    const player = session.player;
    ctx.fillText(`Coins x ${session.coinCount}`, 590, 30);
    ctx.beginPath();
    ctx.strokeStyle = "#ffbb00";
    ctx.moveTo(15, 705);
    ctx.lineWidth = 5;
    ctx.lineTo(15 + (player.stamina / 1000) * 100, 705);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#33ff00";
    ctx.moveTo(15, 690);
    ctx.lineWidth = 10;
    ctx.lineTo(15 + (player.hp / 20) * 100, 690);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.moveTo(115 - (1 - player.hp / 20) * 100, 690);
    ctx.lineWidth = 10;
    ctx.lineTo(115, 690);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#00dddd";
    ctx.moveTo(15, 699);
    ctx.lineWidth = 5;
    ctx.lineTo(15 + (player.invulnerable / 75) * 100, 699);
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
