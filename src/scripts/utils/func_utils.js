import * as Global from "./global_vars";
import Room from "../room";
import Game from "../game";


export const newGame = () => {
  if (Global.SESSION.game) {
    Global.SESSION.game.requestStop = true;
    delete Global.SESSION["game"];
    delete Global.SESSION["player"];
    delete Global.SESSION["coinCount"];
    delete Global.SESSION["rooms"];
  }
  new Game(...Object.values(Global.GAME_OPTIONS));
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
  if (Global.SESSION.rooms[`${nextNodePos}`]) {
    Global.SESSION.game.room = Global.SESSION.rooms[`${nextNodePos}`];
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
    Global.SESSION.rooms[up] && 
    (Global.SESSION.rooms[up].neighbors.down !== "X") && 
    !room.neighbors.up
  ) {
    room.neighbors.up = Global.SESSION.rooms[up];
    Global.SESSION.rooms[up].neighbors.down = room;
  }
  if (
    Global.SESSION.rooms[down] && 
    (Global.SESSION.rooms[down].neighbors.up !== "X") && 
    !room.neighbors.down
  ) {
    room.neighbors.down = Global.SESSION.rooms[down];
    Global.SESSION.rooms[down].neighbors.up = room;
  }
  if (
    Global.SESSION.rooms[left] && 
    (Global.SESSION.rooms[left].neighbors.right !== "X") && 
    !room.neighbors.left
  ) {
    room.neighbors.left = Global.SESSION.rooms[left];
    Global.SESSION.rooms[left].neighbors.right = room;
  }
  if (
    Global.SESSION.rooms[right] && 
    (Global.SESSION.rooms[right].neighbors.left !== "X") && 
    !room.neighbors.right
  ) {
    room.neighbors.right = Global.SESSION.rooms[right];
    Global.SESSION.rooms[right].neighbors.left = room;
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
  if (!Global.SESSION.rooms[up] || (Global.SESSION.rooms[up].neighbors.down !== "X")) {
    paths.push("U");
  }
  if (!Global.SESSION.rooms[down] || (Global.SESSION.rooms[down].neighbors.up !== "X")) {
    paths.push("D");
  }
  if (!Global.SESSION.rooms[left] || (Global.SESSION.rooms[left].neighbors.right !== "X")) {
    paths.push("L");
  }
  if (!Global.SESSION.rooms[right] || (Global.SESSION.rooms[right].neighbors.left !== "X")) {
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
};

export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

export const normalizedMovement = (myself, entity, chasingPlayer) => { 
  const mx = myself.center[0];
  const my = myself.center[1];
  const ex = entity.center[0];
  const ey = entity.center[1];
  let dx = mx - ex;
  let dy = my - ey;
  
  if (!chasingPlayer) {
    const randAngle = Math.random() * 2 * Math.PI;
    dx = Math.cos(randAngle) * myself.speed;
    dy = Math.sin(randAngle) * myself.speed;
  }
  
  const angle = Math.atan(dy/dx);
  const ny = Math.sin(angle) * myself.speed;
  const nx = Math.cos(angle) * myself.speed;

  return {
    dx,
    dy,
    nx,
    ny,
    up: (dy > 0) && (Math.abs(dy) > Math.abs(dx)),
    down: (dy < 0) && (Math.abs(dy) > Math.abs(dx)),
    left: (dx > 0) && (Math.abs(dx) > Math.abs(dy)),
    right: (dx < 0) && (Math.abs(dx) > Math.abs(dy)),
  };
};

export const distanceToPlayer = (myself, player) => {
  const mx = myself.center[0];
  const my = myself.center[1];
  const px = player.center[0];
  const py = player.center[1];
  let dx = px - mx;
  let dy = py - my;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};