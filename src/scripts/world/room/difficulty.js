import Random from "@utils/random";

const COIN_POINTS = 1;
const KILL_POINTS = 2;
const POINTS_PER_EXTRA_ENEMY = 5;
const MAX_ENEMIES_PER_ROOM = 8;

// Difficulty is run-level pressure: coins reward exploration, while kills
// reward combat progress a little more heavily.
export const difficultyPoints = session => (
  ((session.coinCount ?? 0) * COIN_POINTS) + ((session.enemiesKilled ?? 0) * KILL_POINTS)
);

const isStartingRoom = room => room?.nodePos?.[0] === 0 && room?.nodePos?.[1] === 0;

export const targetEnemyCount = (session, room) => {
  const points = difficultyPoints(session);
  if (points === 0 && isStartingRoom(room)) return 0;
  // Rooms start light, then add roughly one enemy every five points until the
  // cap keeps fights from overcrowding the room.
  return Math.min(MAX_ENEMIES_PER_ROOM, 1 + Math.floor(points / POINTS_PER_EXTRA_ENEMY));
};

export const enemyTypeWeights = (points) => ({
  // Blobs fade from "default" to "occasional" as difficulty rises, while
  // harder monsters keep gaining weight so late rooms prefer goblins/skeletons.
  blob: Math.max(20, 100 - (points * 2)),
  bat: Math.min(85, Math.max(0, (points - 2) * 5)),
  goblin: Math.min(95, Math.max(0, (points - 8) * 5)),
  skeleton: Math.min(110, Math.max(0, (points - 16) * 5)),
});

export const pickEnemyType = (session) => (
  Random.weightedPick(enemyTypeWeights(difficultyPoints(session)))
);
