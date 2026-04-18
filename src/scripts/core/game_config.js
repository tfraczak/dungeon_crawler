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
    hitKnockback: 15,
    strength: 10,
  },

  sword: {
    damageMin: 2,
    damageMax: 5,
    range: 60,
    arc: Math.PI / 2,
    cooldown: 20,
    duration: 8,
    knockback: 30,
    staminaCost: 125,
  },

  enemy: {
    hp: 50,
    strength: 6,
    speedMultiplier: 0.8,
    idleSpeedModifier: 0.5,
    chaseSpeedModifier: 1,
    idleMaxFrames: 60,
    idlePauseChance: 0.5,
    idlePauseMin: 30,
    idlePauseMax: 120,
    baseDetectDistance: 150,
    detectDistancePerEnemy: 20,
    damageMin: 1,
    damageMax: 4,
    drops: [
      { type: "coin", chance: 0.1 },
      { type: "hp_potion", chance: 0.05 },
    ],
    knockbackFactor: 0.4,
    hitDistance: 32,
    speedTransitionRate: 0.08,
  },

  coin: {
    frameInterval: 12,
    // Sprite frames are 16x16 on the sheet; rendered slightly larger so the
    // coin reads better against floor tiles. Collision/drop physics still use
    // the 16x16 entity size.
    renderSize: 20,
    // Procedural sparkle pool per coin. Each sparkle picks a random angle
    // around the coin and a random lifetime, then respawns on death so the
    // twinkle positions never repeat. Radii are measured from the coin's
    // logical center (frameSize/2) in source pixels; the rendered coin's
    // visual edge sits around radius 9 (silhouette radius 7 * 1.25 render
    // scale), so the radii here hug that edge with only a small outward halo.
    sparkle: {
      count: 3,
      radiusMin: 7,
      radiusRand: 3,
      lifeMin: 24,
      lifeRand: 36,
    },
  },

  hpPotion: {
    healAmount: 5,
    // Procedural bubbles inside the liquid. Each picks a random column and
    // rises from yBottom to yTop over a randomized lifetime, then respawns.
    // Coordinates are in source-pixel space within the 32x32 sprite.
    bubble: {
      count: 2,
      colMin: 10,
      colRange: 12,
      yBottom: 26,
      yTop: 17,
      lifeMin: 30,
      lifeRand: 30,
      delayRand: 30,
    },
    // Procedural red heal crosses drifting up either side. Each spawn picks a
    // random side, slight column jitter, and an independent lifetime so the
    // two never sync up. Column/row ranges are tuned to hug the widest-body
    // edges of the bottle (x=8..23 at y=16..24) -- the plus shape is ±1 px
    // around the center, so these values leave just a 1-2 px gap from the
    // glass outline for the bulk of the rise.
    cross: {
      count: 2,
      leftXMin: 5,
      rightXMin: 25,
      xJitter: 2,
      yBottom: 25,
      yTop: 8,
      lifeMin: 36,
      lifeRand: 30,
      delayRand: 40,
    },
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

  // Win-condition ladder. Once the player has hit `game.winCoinCount`, every
  // newly-entered room rolls (exactly once) for a ladder spawn at `chance`.
  // Climbing the ladder triggers a multi-stage win cinematic, in order:
  //   1. climbDuration  — player ascends the ladder, sprite walking up
  //   2. fadeDuration   — canvas alpha-fades to white
  //   3. sceneHoldDuration   — full white "blink" before the reveal starts
  //   4. sceneFadeDuration   — the "out of the cave" scene image fades in
  //                            over the white (cover-fit to the canvas)
  //   5. textFadeDuration    — the win text + restart prompt fade in over
  //                            a translucent dark panel for legibility
  // After (5) completes the game halts and the final frame is held until
  // the player restarts.
  ladder: {
    chance: 0.08,
    climbDuration: 1400,
    fadeDuration: 700,
    sceneHoldDuration: 250,
    sceneFadeDuration: 700,
    textFadeDuration: 600,
    width: 48,
    height: 64,
  },

  // Available "you escaped the cave" backdrops. Asset files for each ID live
  // at `src/assets/images/end_of_game/<id>_<desktop|mobile>.png` and are
  // preloaded at startup. The orientation variant is picked at climb time
  // based on `gameState.isMobile` (mobile uses the wide 16:9 art; desktop
  // uses the square art that matches the 720x720 canvas). The DEV_FLAGS
  // `winScene` override can pin the picker to a specific ID for testing.
  endScenes: [
    "aurora_cliff",
    "autumn_forest",
    "jungle_waterfall",
    "lakeside_dawn",
  ],

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
