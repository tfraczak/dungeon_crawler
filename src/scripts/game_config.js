const GAME_CONFIG = Object.freeze({
  world: {
    width: 720,
    height: 720,
    tileSize: 48,
  },

  player: {
    hp: 20,
    stamina: 1000,
    speedMultiplier: 1.25,
    sprintMultiplier: 1.5,
    staminaDrain: 4,
    staminaRegenIdle: 2,
    staminaRegenMoving: 1,
    invulnerabilityFrames: 60,
    attackDamageMin: 2,
    attackDamageMax: 5,
    attackRange: 50,
    attackArc: Math.PI / 2,
    attackCooldown: 20,
    attackDuration: 8,
    attackKnockback: 30,
    attackStaminaCost: 125,
    hitKnockback: 15,
    strength: 10,
  },

  enemy: {
    hp: 35,
    strength: 6,
    speedMultiplier: 0.8,
    idleSpeedModifier: 0.75,
    chaseSpeedModifier: 1,
    idleMaxFrames: 60,
    baseDetectDistance: 200,
    detectDistancePerEnemy: 50,
    damageMin: 1,
    damageMax: 4,
    knockbackFactor: 0.4,
    hitDistance: 32,
  },

  coin: {
    frameInterval: 12,
  },

  poof: {
    particleCount: 10,
    speedMin: 1,
    speedMax: 3,
    lifetime: 20,
    radiusMin: 3,
    radiusMax: 7,
    color: [200, 200, 200],
  },

  game: {
    fps: 60,
    winCoinCount: 10,
  },

  spawn: {
    coinMin: 64,
    coinMax: 656,
    coinExcludeMin: 336,
    coinExcludeMax: 384,
    enemyMin: 64,
    enemyMax: 614,
  },
});

export default GAME_CONFIG;
