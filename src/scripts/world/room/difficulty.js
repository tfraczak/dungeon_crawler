import Random from "@utils/random";

const ROOM_COUNT_POINTS = 1;
const ROOM_DIFFICULTY_POINTS = 1;
const POINTS_PER_EXTRA_ENEMY = 5;
const MAX_ENEMIES_PER_ROOM = 8;

const roomsExplored = session => Object.keys(session.rooms ?? {}).length;

// Enemy count pressure mostly comes from coins, with explored rooms adding
// ambient pressure so deep exploration still fills rooms even before looting.
export const enemyCountPoints = session => (
  (session.coinCount ?? 0) + (roomsExplored(session) * ROOM_COUNT_POINTS)
);

// Enemy variety pressure mostly comes from kills, with explored rooms nudging
// harder monster odds up over time as the run expands.
export const enemyDifficultyPoints = session => (
  ((session.enemiesKilled ?? 0) * 2) + (roomsExplored(session) * ROOM_DIFFICULTY_POINTS)
);

const isStartingRoom = room => room?.nodePos?.[0] === 0 && room?.nodePos?.[1] === 0;

export const targetEnemyCount = (session, room) => {
  const points = enemyCountPoints(session);
  if (points === 0 && isStartingRoom(room)) return 0;
  // Rooms start light, then add roughly one enemy every five points until the
  // cap keeps fights from overcrowding the room.
  return Math.min(MAX_ENEMIES_PER_ROOM, 1 + Math.floor(points / POINTS_PER_EXTRA_ENEMY));
};

export const enemyTypeWeights = (points) => ({
  // Blobs fade from "default" to "occasional" as difficulty rises, while
  // harder monsters keep gaining weight. Goblins are currently the top threat,
  // so skeletons phase in before goblins and goblins ramp later.
  blob: Math.max(20, 100 - (points * 2)),
  bat: Math.min(85, Math.max(0, (points - 2) * 5)),
  skeleton: Math.min(90, Math.max(0, (points - 8) * 4)),
  goblin: Math.min(115, Math.max(0, (points - 16) * 5)),
});

export const pickEnemyType = (session) => (
  Random.weightedPick(enemyTypeWeights(enemyDifficultyPoints(session)))
);
