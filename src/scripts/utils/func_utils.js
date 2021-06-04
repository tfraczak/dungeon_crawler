import * as Global from "./global_vars";
import Wall from "../wall";
import Room from "../room";
import Game from "../game";
import Entity from "../entity";
import Coin from "../coin";


export const newGame = () => {
  if (Global.SESSION.game) {
    Global.SESSION.game.stop();
    delete Global.SESSION["game"];
    delete Global.SESSION["player"];
    delete Global.SESSION["coinCount"];
    for (let room in Global.ROOMS) {
      delete Global.ROOMS[`${room.nodePos}`];
    };
  }
  new Game(...Object.values(Global.GAME_OPTIONS));
}

export const collidedWithSide = (side, thisSide, otherSide) => {
  let collided = false;
  let upperDiff, lowerDiff;
  const upperBounds = 10;
  const lowerBounds = 0;
  if (side === "top" || side === "bottom") {
    const thisYVal = thisSide[1];
    const [thisXMin, thisXMax] = thisSide[0];
    const otherYVal = otherSide[1];
    const [otherXMin, otherXMax] = otherSide[0];
    
    switch (side) {
      case "top":
        upperDiff = (otherYVal - thisYVal) < upperBounds;
        lowerDiff = (otherYVal - thisYVal) > lowerBounds;
        collided = 
          (thisYVal < otherYVal) &&
          (thisXMin < otherXMax) &&
          (thisXMax > otherXMin) &&
          upperDiff && lowerDiff;
        break;
      case "bottom":
        upperDiff = (thisYVal - otherYVal) < upperBounds;
        lowerDiff = (thisYVal - otherYVal) > lowerBounds;
        collided = 
          (thisYVal > otherYVal) &&
          (thisXMin < otherXMax) &&
          (thisXMax > otherXMin) &&
          upperDiff && lowerDiff;
        break;
      default:
        break;
    }

    if (collided) return otherYVal;

  } else {
    const thisXVal = thisSide[0];
    const [thisYMin, thisYMax] = thisSide[1];
    const otherXVal = otherSide[0];
    const [otherYMin, otherYMax] = otherSide[1];
    
    switch (side) {
      case "left":
        upperDiff = (otherXVal - thisXVal) < upperBounds;
        lowerDiff = (otherXVal - thisXVal) > lowerBounds;
        collided = 
          (thisXVal < otherXVal) &&
          (thisYMin < otherYMax) &&
          (thisYMax > otherYMin) &&
          upperDiff && lowerDiff;
          break;
      case "right":
        upperDiff = (thisXVal - otherXVal) < upperBounds;
        lowerDiff = (thisXVal - otherXVal) > lowerBounds;
        collided = 
          (thisXVal > otherXVal) &&
          (thisYMin < otherYMax) &&
          (thisYMax > otherYMin) &&
          upperDiff && lowerDiff;
          break;
      default:
        break;
    }

    if (collided) return otherXVal;
    
  }

  return false;

};

export const roomChange = (exitDir, currRoom) => {
  let nextNodePos = [...currRoom.nodePos];
  switch(exitDir) {
    case "up":
      nextNodePos[1] += 1;
      break;
    case "down":
      nextNodePos[1] -= 1;
      break;
    case "left":
      nextNodePos[0] -= 1;
      break;
    case "right":
      nextNodePos[0] += 1;
      break;
  }
  if (Global.ROOMS[`${nextNodePos}`]) {
    Global.SESSION.game.room = Global.ROOMS[`${nextNodePos}`];
  } else {
    const neighbor = { [exitDir]: currRoom };
    Global.SESSION.game.room = new Room(neighbor);
    addValidNeighbors(currRoom);
    addValidNeighbors(Global.SESSION.game.room);
  }
};

export const randNumPaths = max => {
  let paths = [];
  if (max > 3) {
    for (let i = 0; i < Global.WEIGHTS[max][4]; i++) { paths.push(4) }
    for (let i = 0; i < Global.WEIGHTS[max][3]; i++) { paths.push(3) }
    for (let i = 0; i < Global.WEIGHTS[max][2]; i++) { paths.push(2) }
    for (let i = 0; i < Global.WEIGHTS[max][1]; i++) { paths.push(1) }
  } else if (max > 2) {
    for (let i = 0; i < Global.WEIGHTS[max][3]; i++) { paths.push(3) }
    for (let i = 0; i < Global.WEIGHTS[max][2]; i++) { paths.push(2) }
    for (let i = 0; i < Global.WEIGHTS[max][1]; i++) { paths.push(1) }
  } else if (max > 1) {
    for (let i = 0; i < Global.WEIGHTS[max][2]; i++) { paths.push(2) }
    for (let i = 0; i < Global.WEIGHTS[max][1]; i++) { paths.push(1) }
  } else {
    paths.push(1);
  }

  shuffle(paths);

  return paths[Math.floor(Math.random()*paths.length)];
  
};

export const addValidNeighbors = room => {
  let up = [...room.nodePos];
  up[1] += 1;
  up = up.toString();
  let down = [...room.nodePos];
  down[1] -= 1;
  down = down.toString();
  let left = [...room.nodePos];
  left[0] -= 1;
  left = left.toString();
  let right = [...room.nodePos];
  right[0] += 1;
  right = right.toString();
  if (
    Global.ROOMS[up] && 
    (Global.ROOMS[up].neighbors.down !== "X") && 
    !room.neighbors.up
  ) {
    room.neighbors.up = Global.ROOMS[up];
    Global.ROOMS[up].neighbors.down = room;
  }
  if (
    Global.ROOMS[down] && 
    (Global.ROOMS[down].neighbors.up !== "X") && 
    !room.neighbors.down
  ) {
    room.neighbors.down = Global.ROOMS[down];
    Global.ROOMS[down].neighbors.up = room;
  }
  if (
    Global.ROOMS[left] && 
    (Global.ROOMS[left].neighbors.right !== "X") && 
    !room.neighbors.left
  ) {
    room.neighbors.left = Global.ROOMS[left];
    Global.ROOMS[left].neighbors.right = room;
  }
  if (
    Global.ROOMS[right] && 
    (Global.ROOMS[right].neighbors.left !== "X") && 
    !room.neighbors.right
  ) {
    room.neighbors.right = Global.ROOMS[right];
    Global.ROOMS[right].neighbors.left = room;
  }
};

export const buildPaths = room => {
  let paths = [];
  let up = [...room.nodePos];
  up[1] += 1;
  up = up.toString();
  let down = [...room.nodePos];
  down[1] -= 1;
  down = down.toString();
  let left = [...room.nodePos];
  left[0] -= 1;
  left = left.toString();
  let right = [...room.nodePos];
  right[0] += 1;
  right = right.toString();
  if (!Global.ROOMS[up] || (Global.ROOMS[up].neighbors.down !== "X")) {
    paths.push("U");
  }
  if (!Global.ROOMS[down] || (Global.ROOMS[down].neighbors.up !== "X")) {
    paths.push("D");
  }
  if (!Global.ROOMS[left] || (Global.ROOMS[left].neighbors.right !== "X")) {
    paths.push("L");
  }
  if (!Global.ROOMS[right] || (Global.ROOMS[right].neighbors.left !== "X")) {
    paths.push("R");
  }
  return paths.sort().join("");
};

export const assignBlockedPaths = (room, paths) => {
  if (!paths.includes("U")) {
    room.neighbors.up = "X";
  }
  if (!paths.includes("D")) {
    room.neighbors.down = "X";
  }
  if (!paths.includes("L")) {
    room.neighbors.left = "X";
  }
  if (!paths.includes("R")) {
    room.neighbors.right = "X";
  }
};

export const buildRoomWalls = paths => {
  let walls = [];
  switch(paths) {
    case "DLRU":
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      return walls;
    case "DLU":
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([720-48,0], 48, 720)); // right blocked
      return walls;
    case "LRU":
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      walls.push(new Wall([0,720-48], 720, 48)); // down blocked
      return walls;
    case "DRU":
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      walls.push(new Wall([0,0], 48, 720)); // left blocked
      return walls;
    case "DLR":
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      walls.push(new Wall([0,0], 720, 48)); // up blocked
      return walls;
    case "LU":
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([720-48,0], 48, 720)); // right blocked
      walls.push(new Wall([0,720-48], 720, 48)); // down blocked
      return walls;
    case "DU":
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([0,0], 48, 720)); // left blocked
      walls.push(new Wall([720-48,0], 48, 720)); // right blocked
      return walls;
    case "RU":
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([0,720-48], 720, 48)); // down blocked
      walls.push(new Wall([0,0], 48, 720)); // left blocked
      return walls;
    case "DL":
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([0,0], 720, 48)); // up blocked
      walls.push(new Wall([720-48,0], 48, 720)); // right blocked
      return walls;
    case "DR":
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([0,0], 48, 720)); // left blocked
      walls.push(new Wall([0,0], 720, 48)); // up blocked
      return walls;
    case "LR":
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      walls.push(new Wall([0,720-48], 720, 48)); // down blocked
      walls.push(new Wall([0,0], 720, 48)); // up blocked
      return walls;
    case "L":
      walls.push(new Wall([0,0], 48, 48*6)); // left up
      walls.push(new Wall([0,48*9], 48, 48*6)); // left down
      walls.push(new Wall([720-48,0], 48, 720)); // right blocked
      walls.push(new Wall([0,720-48], 720, 48)); // down blocked
      walls.push(new Wall([0,0], 720, 48)); // up blocked
      return walls;
    case "R":
      walls.push(new Wall([720-48,0], 48, 48*6)); // right up
      walls.push(new Wall([720-48,48*9], 48, 48*6)); // right down
      walls.push(new Wall([0,720-48], 720, 48)); // down blocked
      walls.push(new Wall([0,0], 48, 720)); // left blocked
      walls.push(new Wall([0,0], 720, 48)); // up blocked
      return walls;
    case "U":
      walls.push(new Wall([0,0], 48*6, 48)); // up left
      walls.push(new Wall([48*9,0], 48*6, 48)); // up right
      walls.push(new Wall([720-48,0], 48, 720)); // right blocked
      walls.push(new Wall([0,720-48], 720, 48)); // down blocked
      walls.push(new Wall([0,0], 48, 720)); // left blocked
      return walls;
    case "D":
      walls.push(new Wall([0,720-48], 48*6, 48)); // down left
      walls.push(new Wall([48*9,720-48], 48*6, 48)); // down right
      walls.push(new Wall([720-48,0], 48, 720)); // right blocked
      walls.push(new Wall([0,0], 48, 720)); // left blocked
      walls.push(new Wall([0,0], 720, 48)); // up blocked
      return walls;
  }
};

const randNumCoins = () => {
  let weightedNumCoins = [];
  for (let i = 0; i < Global.COIN_WEIGHTS[3]; i++) { weightedNumCoins.push(3) }
  for (let i = 0; i < Global.COIN_WEIGHTS[2]; i++) { weightedNumCoins.push(2) }
  for (let i = 0; i < Global.COIN_WEIGHTS[1]; i++) { weightedNumCoins.push(1) }
  for (let i = 0; i < Global.COIN_WEIGHTS[0]; i++) { weightedNumCoins.push(0) }
  const randIdx = Math.floor(Math.random() * weightedNumCoins.length);
  shuffle(weightedNumCoins);
  return weightedNumCoins[randIdx];
};

export const randCoinSound = () => {
  const i = Math.floor(Math.random() * 9);
  return document.getElementById(`coin${i}`);
}

export const generateCoins = () => {
  const numCoins = randNumCoins();
  let coins = {};
  for (let i = 0; i < numCoins; i++) {
    let x = Math.floor(Math.random()*592) + 64;
    while (x > 336 && x < 384) x = Math.floor(Math.random()*592) + 64;
    let y = Math.floor(Math.random()*592) + 64;
    while (y > 336 && y < 384) y = Math.floor(Math.random()*592) + 64;
    let pos = [x,y];
    const coin = new Coin(pos, 16,16,Global.SPRITES.coin);
    coins[`${coin.pos}`] = coin;
  }
  return coins;
};

export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};