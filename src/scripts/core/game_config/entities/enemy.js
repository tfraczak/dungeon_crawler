// Drop tables intentionally do NOT live here — each enemy's drops are
// declared on its own config (see `src/scripts/entities/enemy/<type>/
// config.js`) so individual creature loot can be tuned independently.
// New enemies that don't ship a `drops` array won't drop anything.
export default Object.freeze({
  baseDetectDistance: 150,
  chaseSpeedModifier: 1,
  damageMax: 4,
  damageMin: 1,
  detectDistancePerEnemy: 20,
  hitDistance: 32,
  hp: 50,
  hpVariance: 0.05,
  idleMaxFrames: 60,
  idlePauseChance: 0.5,
  idlePauseMax: 120,
  idlePauseMin: 30,
  idleSpeedModifier: 0.5,
  knockbackFactor: 0.4,
  respawnDelayMs: 5 * 60 * 1000,
  spawn: {
    max: 614,
    min: 64,
  },
  speedMultiplier: 0.8,
  speedTransitionRate: 0.08,
  strength: 6,
  types: Object.freeze(["bat", "blob", "goblin", "skeleton"]),
});
