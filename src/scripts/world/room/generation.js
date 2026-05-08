import * as GAME_CONFIG from "@core/game_config";
import { shuffle } from "@utils/helpers";
import Random from "@utils/random";
import createRoom from "@world/room/room";

const ROOM_DIRECTIONS = Object.freeze([
  Object.freeze({
    key: "up", letter: "U", opposite: "down", oppositeLetter: "D", delta: Object.freeze([0, 1]),
  }),
  Object.freeze({
    key: "down", letter: "D", opposite: "up", oppositeLetter: "U", delta: Object.freeze([0, -1]),
  }),
  Object.freeze({
    key: "left", letter: "L", opposite: "right", oppositeLetter: "R", delta: Object.freeze([-1, 0]),
  }),
  Object.freeze({
    key: "right", letter: "R", opposite: "left", oppositeLetter: "L", delta: Object.freeze([1, 0]),
  }),
]);

const DIRECTIONS_BY_KEY = Object.freeze(Object.fromEntries(
  ROOM_DIRECTIONS.map(direction => [direction.key, direction]),
));

const SORTED_PATH_ORDER = Object.freeze(["D", "L", "R", "U"]);

export const directionForExit = exitDir => DIRECTIONS_BY_KEY[exitDir] ?? null;

export const roomKey = nodePos => `${nodePos}`;

export const nodePosForExit = (nodePos, exitDir) => {
  const direction = directionForExit(exitDir);
  if (!direction) return [...nodePos];
  return [
    nodePos[0] + direction.delta[0],
    nodePos[1] + direction.delta[1],
  ];
};

export const sortedPaths = paths => SORTED_PATH_ORDER
  .filter(path => paths.includes(path))
  .join("");

const adjacentRoomFor = (room, direction, gameState) => {
  const nodePos = nodePosForExit(room.nodePos, direction.key);
  return gameState.session.rooms[roomKey(nodePos)] ?? null;
};

const roomHasPath = (room, path) => room?.bgConfig?.paths?.includes(path) ?? false;

export const roomAcceptsEntryFrom = (room, exitDir) => {
  const direction = directionForExit(exitDir);
  return Boolean(direction && roomHasPath(room, direction.oppositeLetter));
};

const availablePathsFor = (room, gameState) => ROOM_DIRECTIONS
  .filter((direction) => {
    const adjacentRoom = adjacentRoomFor(room, direction, gameState);
    return !adjacentRoom || roomHasPath(adjacentRoom, direction.oppositeLetter);
  })
  .map(direction => direction.letter);

export const requiredPathsFor = (room, entryDir, gameState) => {
  const required = new Set(entryDir ? [entryDir] : []);

  for (const direction of ROOM_DIRECTIONS) {
    const adjacentRoom = adjacentRoomFor(room, direction, gameState);
    if (roomHasPath(adjacentRoom, direction.oppositeLetter)) {
      required.add(direction.letter);
    }
  }

  return sortedPaths([...required].join(""));
};

export const pickRoomPaths = (room, entryDir, gameState) => {
  const requiredPaths = requiredPathsFor(room, entryDir, gameState).split("");
  const availablePaths = sortedPaths([
    ...new Set([...availablePathsFor(room, gameState), ...requiredPaths]),
  ].join("")).split("");
  const required = new Set(requiredPaths);
  const optionalPaths = availablePaths.filter(path => !required.has(path));
  const targetPathCount = Math.max(
    requiredPaths.length,
    Math.min(availablePaths.length, randNumPaths(availablePaths.length)),
  );
  const selectedPaths = [...requiredPaths];

  shuffle(optionalPaths);
  while (selectedPaths.length < targetPathCount && optionalPaths.length > 0) {
    selectedPaths.push(optionalPaths.pop());
  }

  return sortedPaths(selectedPaths.join(""));
};

export const applyRoomPaths = (room, paths, gameState) => {
  for (const direction of ROOM_DIRECTIONS) {
    if (!paths.includes(direction.letter)) {
      room.neighbors[direction.key] = "X";
      continue;
    }

    const adjacentRoom = adjacentRoomFor(room, direction, gameState);
    if (roomHasPath(adjacentRoom, direction.oppositeLetter)) {
      room.neighbors[direction.key] = adjacentRoom;
      adjacentRoom.neighbors[direction.opposite] = room;
    } else {
      room.neighbors[direction.key] = undefined;
    }
  }
};

const keepPlayerInCurrentRoom = (exitDir, gameState) => {
  const player = gameState.session.player;
  if (!player) return;

  switch (exitDir) {
    case "up":
      player.pos[1] = 24;
      break;
    case "down":
      player.pos[1] = 720 - 48;
      break;
    case "left":
      player.pos[0] = 24;
      break;
    case "right":
      player.pos[0] = 720 - 48;
      break;
  }
  player.updateSides();
  player.drawOptions.x = player.pos[0];
  player.drawOptions.y = player.pos[1];
};

const warnRoomGraph = (message, details) => {
  if (process.env.NODE_ENV === "production") return;
  console.warn(`[room-generation] ${message}`, details);
};

export const validateRoomGraph = (gameState, context = "room graph") => {
  if (process.env.NODE_ENV === "production") return true;

  const rooms = gameState.session?.rooms ?? {};
  const warnings = [];
  for (const [key, room] of Object.entries(rooms)) {
    if (!room?.bgConfig) continue;

    for (const direction of ROOM_DIRECTIONS) {
      const hasPath = roomHasPath(room, direction.letter);
      const neighbor = room.neighbors[direction.key];
      const adjacentRoom = adjacentRoomFor(room, direction, gameState);
      const adjacentHasPath = roomHasPath(adjacentRoom, direction.oppositeLetter);

      if (hasPath && neighbor === "X") {
        warnings.push({ key, side: direction.key, reason: "open path is marked blocked" });
      }
      if (!hasPath && neighbor !== "X") {
        warnings.push({ key, side: direction.key, reason: "closed path is not marked blocked" });
      }
      if (hasPath && adjacentRoom && !adjacentHasPath) {
        warnings.push({
          key,
          side: direction.key,
          reason: "adjacent room lacks reciprocal entrance",
          adjacentKey: roomKey(adjacentRoom.nodePos),
          paths: room.bgConfig.paths,
          adjacentPaths: adjacentRoom.bgConfig?.paths,
        });
      }
      if (hasPath && adjacentHasPath && neighbor !== adjacentRoom) {
        warnings.push({
          key,
          side: direction.key,
          reason: "neighbor reference is not reciprocal adjacent room",
          adjacentKey: roomKey(adjacentRoom.nodePos),
        });
      }
    }
  }

  if (warnings.length > 0) {
    warnRoomGraph(`invalid ${context}`, warnings);
    return false;
  }
  return true;
};

export const roomChange = (exitDir, currRoom, gameState) => {
  const session = gameState.session;
  const nextNodePos = nodePosForExit(currRoom.nodePos, exitDir);
  if (session.rooms[roomKey(nextNodePos)]) {
    const nextRoom = session.rooms[roomKey(nextNodePos)];
    if (!roomAcceptsEntryFrom(nextRoom, exitDir)) {
      keepPlayerInCurrentRoom(exitDir, gameState);
      session.game.room = currRoom;
      warnRoomGraph("blocked mismatched room transition", {
        from: roomKey(currRoom.nodePos),
        to: roomKey(nextNodePos),
        exitDir,
        fromPaths: currRoom.bgConfig?.paths,
        toPaths: nextRoom.bgConfig?.paths,
      });
      validateRoomGraph(gameState, "blocked transition");
      return false;
    }
    session.game.room = nextRoom;
  } else {
    const neighbor = { [exitDir]: currRoom };
    session.game.room = createRoom(neighbor, gameState);
    addValidNeighbors(currRoom, gameState);
    addValidNeighbors(session.game.room, gameState);
  }
  currRoom.scatterEnemies();
  session.game.room.tickEnemyRespawns();
  session.game.room.scaleToDifficulty();
  // Win-condition ladder gets a fresh roll every time the player ENTERS a
  // room (newly-created or cached). Each room internally tracks whether it
  // has already rolled, so revisiting a room that already failed its roll
  // is a cheap no-op. Coin threshold + per-room dice are checked inside
  // tryRollLadder.
  session.game.room.tryRollLadder(session.coinCount);
  // Chests follow the same "roll on entry" pattern but with a per-room
  // cooldown timer instead of a one-shot flag — see room.tryRollChest for
  // the gating rules (difficulty + 5-minute cooldown + one-at-a-time).
  session.game.room.tryRollChest();
  validateRoomGraph(gameState, "room transition");
  return true;
};

export const randNumPaths = max => {
  const weights = GAME_CONFIG.world.room.generation.pathWeights[max];
  if (!weights) return 1;
  return Number(Random.weightedPick(weights));
};

export const addValidNeighbors = (room, gameState) => {
  for (const direction of ROOM_DIRECTIONS) {
    const adjacentRoom = adjacentRoomFor(room, direction, gameState);
    if (
      adjacentRoom &&
      roomHasPath(room, direction.letter) &&
      roomHasPath(adjacentRoom, direction.oppositeLetter)
    ) {
      room.neighbors[direction.key] = adjacentRoom;
      adjacentRoom.neighbors[direction.opposite] = room;
    }
  }
};

export const buildPaths = (room, gameState) => {
  return sortedPaths(availablePathsFor(room, gameState).join(""));
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
