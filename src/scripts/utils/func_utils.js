import { WEIGHTS, COIN_WEIGHTS } from "./global_vars";
import createRoom from "../room";
import createGame from "../game";


export const newGame = (gameState) => {
  gameState.reset();
  createGame(gameState);
};

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

export const roomChange = (exitDir, currRoom, gameState) => {
  const session = gameState.session;
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
  if (session.rooms[`${nextNodePos}`]) {
    session.game.room = session.rooms[`${nextNodePos}`];
  } else {
    const neighbor = { [exitDir]: currRoom };
    session.game.room = createRoom(neighbor, gameState);
    addValidNeighbors(currRoom, gameState);
    addValidNeighbors(session.game.room, gameState);
  }
};

export const randNumPaths = max => {
  let paths = [];
  if (max > 3) {
    for (let i = 0; i < WEIGHTS[max][4]; i++) { paths.push(4) }
    for (let i = 0; i < WEIGHTS[max][3]; i++) { paths.push(3) }
    for (let i = 0; i < WEIGHTS[max][2]; i++) { paths.push(2) }
    for (let i = 0; i < WEIGHTS[max][1]; i++) { paths.push(1) }
  } else if (max > 2) {
    for (let i = 0; i < WEIGHTS[max][3]; i++) { paths.push(3) }
    for (let i = 0; i < WEIGHTS[max][2]; i++) { paths.push(2) }
    for (let i = 0; i < WEIGHTS[max][1]; i++) { paths.push(1) }
  } else if (max > 1) {
    for (let i = 0; i < WEIGHTS[max][2]; i++) { paths.push(2) }
    for (let i = 0; i < WEIGHTS[max][1]; i++) { paths.push(1) }
  } else {
    paths.push(1);
  }

  shuffle(paths);

  return paths[Math.floor(Math.random()*paths.length)];
};

export const addValidNeighbors = (room, gameState) => {
  const rooms = gameState.session.rooms;
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
    rooms[up] && 
    (rooms[up].neighbors.down !== "X") && 
    !room.neighbors.up
  ) {
    room.neighbors.up = rooms[up];
    rooms[up].neighbors.down = room;
  }
  if (
    rooms[down] && 
    (rooms[down].neighbors.up !== "X") && 
    !room.neighbors.down
  ) {
    room.neighbors.down = rooms[down];
    rooms[down].neighbors.up = room;
  }
  if (
    rooms[left] && 
    (rooms[left].neighbors.right !== "X") && 
    !room.neighbors.left
  ) {
    room.neighbors.left = rooms[left];
    rooms[left].neighbors.right = room;
  }
  if (
    rooms[right] && 
    (rooms[right].neighbors.left !== "X") && 
    !room.neighbors.right
  ) {
    room.neighbors.right = rooms[right];
    rooms[right].neighbors.left = room;
  }
};

export const buildPaths = (room, gameState) => {
  const rooms = gameState.session.rooms;
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
  if (!rooms[up] || (rooms[up].neighbors.down !== "X")) {
    paths.push("U");
  }
  if (!rooms[down] || (rooms[down].neighbors.up !== "X")) {
    paths.push("D");
  }
  if (!rooms[left] || (rooms[left].neighbors.right !== "X")) {
    paths.push("L");
  }
  if (!rooms[right] || (rooms[right].neighbors.left !== "X")) {
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

export const randNumCoins = () => {
  let weightedNumCoins = [];
  for (let i = 0; i < COIN_WEIGHTS[3]; i++) { weightedNumCoins.push(3) }
  for (let i = 0; i < COIN_WEIGHTS[2]; i++) { weightedNumCoins.push(2) }
  for (let i = 0; i < COIN_WEIGHTS[1]; i++) { weightedNumCoins.push(1) }
  for (let i = 0; i < COIN_WEIGHTS[0]; i++) { weightedNumCoins.push(0) }
  const randIdx = Math.floor(Math.random() * weightedNumCoins.length);
  shuffle(weightedNumCoins);
  return weightedNumCoins[randIdx];
};

export const randCoinSound = () => {
  const i = Math.floor(Math.random() * 9);
  return document.getElementById(`coin${i}`);
};

export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};
