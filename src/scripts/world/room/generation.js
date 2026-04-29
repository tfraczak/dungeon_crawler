import * as GAME_CONFIG from "@core/game_config";
import Random from "@utils/random";
import createRoom from "@world/room/room";

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
  currRoom.scatterEnemies();
  if (session.rooms[`${nextNodePos}`]) {
    session.game.room = session.rooms[`${nextNodePos}`];
  } else {
    const neighbor = { [exitDir]: currRoom };
    session.game.room = createRoom(neighbor, gameState);
    addValidNeighbors(currRoom, gameState);
    addValidNeighbors(session.game.room, gameState);
  }
  session.game.room.tickEnemyRespawns();
  session.game.room.scaleToDifficulty();
  // Win-condition ladder gets a fresh roll every time the player ENTERS a
  // room (newly-created or cached). Each room internally tracks whether it
  // has already rolled, so revisiting a room that already failed its roll
  // is a cheap no-op. Coin threshold + per-room dice are checked inside
  // tryRollLadder.
  session.game.room.tryRollLadder(session.coinCount);
};

export const randNumPaths = max => {
  const weights = GAME_CONFIG.world.room.generation.pathWeights[max];
  if (!weights) return 1;
  return Number(Random.weightedPick(weights));
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

export const randNumCoins = () =>
  Number(Random.weightedPick(GAME_CONFIG.world.room.generation.coinCountWeights));
