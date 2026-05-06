import DEV_FLAGS, { configValue } from "@core/dev_flags";
import Random from "@utils/random";

const ROOM_COUNT_POINTS = 1;
const ROOM_DIFFICULTY_POINTS = 1;
const POINTS_PER_EXTRA_ENEMY = 5;
const MAX_ENEMIES_PER_ROOM = 8;

const roomsExplored = session => Object.keys(session.rooms ?? {}).length;

// Enemy count pressure mostly comes from coins, with explored rooms adding
// ambient pressure so deep exploration still fills rooms even before looting.
export const enemyCountPoints = session => (
  (session.coinCount ?? 0) + (roomsExplored(session) * configValue({
    value: ROOM_COUNT_POINTS,
    override: DEV_FLAGS.difficultyRoomCountPoints,
  }))
);

// Enemy variety pressure mostly comes from kills, with explored rooms nudging
// harder monster odds up over time as the run expands.
export const enemyDifficultyPoints = session => (
  ((session.enemiesKilled ?? 0) * 2) + (roomsExplored(session) * configValue({
    value: ROOM_DIFFICULTY_POINTS,
    override: DEV_FLAGS.difficultyRoomDifficultyPoints,
  }))
);

const isStartingRoom = room => room?.nodePos?.[0] === 0 && room?.nodePos?.[1] === 0;

export const targetEnemyCount = (session, room) => {
  const points = enemyCountPoints(session);
  if (points === 0 && isStartingRoom(room)) return 0;
  const pointsPerEnemy = Math.max(1, configValue({
    value: POINTS_PER_EXTRA_ENEMY,
    override: DEV_FLAGS.difficultyPointsPerEnemy,
  }));
  // Rooms start light, then add roughly one enemy every five points until the
  // cap keeps fights from overcrowding the room.
  return Math.min(
    configValue({ value: MAX_ENEMIES_PER_ROOM, override: DEV_FLAGS.difficultyMaxEnemies }),
    1 + Math.floor(points / pointsPerEnemy),
  );
};

// Difficulty point thresholds at which each enemy type starts spawning. Kept
// in sync with the `enemyTypeWeights` curves below; bumping a threshold here
// is purely informational unless the matching weight curve is also updated.
export const ENEMY_DIFFICULTY_THRESHOLDS = Object.freeze({
  blob: 0,
  bat: 3,
  skeleton: 9,
  goblin: 17,
});

// Chests are loot-tier content tied to the skeleton phase: skeletons (and
// goblins later) are the only enemies that drop keys, so chests don't appear
// before either is reachable.
export const chestsCanSpawn = (session) => (
  enemyDifficultyPoints(session) >= ENEMY_DIFFICULTY_THRESHOLDS.skeleton
);

export const enemyTypeWeights = (points) => ({
  // Blobs fade from "default" to "occasional" as difficulty rises, while
  // harder monsters keep gaining weight. Goblins are currently the top threat,
  // so skeletons phase in before goblins and goblins ramp later.
  blob: Math.max(20, 100 - (points * 2)),
  bat: Math.min(85, Math.max(0, (points - ENEMY_DIFFICULTY_THRESHOLDS.bat + 1) * 5)),
  skeleton: Math.min(90, Math.max(0, (points - ENEMY_DIFFICULTY_THRESHOLDS.skeleton + 1) * 4)),
  goblin: Math.min(115, Math.max(0, (points - ENEMY_DIFFICULTY_THRESHOLDS.goblin + 1) * 5)),
});

export const pickEnemyType = (session) => (
  Random.weightedPick(enemyTypeWeights(enemyDifficultyPoints(session)))
);
