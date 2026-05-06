export default Object.freeze({
  hp: 30,
  // Bats lean a bit more on potions than coins because their poison
  // attack puts more sustained pressure on the player than the basic
  // melee enemies do.
  drops: Object.freeze([
    Object.freeze({ type: "coin", chance: 0.10 }),
    Object.freeze({ type: "hp_potion", chance: 0.07 }),
  ]),
  speedModifier: 1.3,
  colBox: Object.freeze({ width: 26, height: 20 }),
  animationPace: Object.freeze({
    idle: 7,
    chase: 5,
    dead: 10,
  }),
  flight: Object.freeze({
    minFrames: 5,
    maxFrames: 12,
    minStrength: 0.25,
    maxStrength: 0.75,
    maxSpeedMultiplier: 1.4,
  }),
  bite: Object.freeze({
    markDurationFrames: 30,
    snapFrames: 5,
    markWidth: 38,
    fangLength: 18,
    openDistance: 34,
    closedGap: 4,
    oozeCount: 7,
  }),
  poison: Object.freeze({
    chance: 0.42,
    durationFrames: 240,
    damageTickFrames: 60,
    damageMin: 1,
    damageMax: 2,
    stumblePulseFrames: 18,
    stumbleSlowMultiplier: 0.78,
    stumbleDriftStrength: 0.35,
    staminaDrainMultiplier: 1.5,
    bubbleCount: 7,
  }),
});
