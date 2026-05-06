export default Object.freeze({
  hp: 50,
  // Blobs are the lowest-tier enemy and only drop the basics. No keys —
  // keys are tied to the late-game (skeleton/goblin) loot loop.
  drops: Object.freeze([
    Object.freeze({ type: "coin", chance: 0.10 }),
    Object.freeze({ type: "hp_potion", chance: 0.05 }),
  ]),
  hitEffect: Object.freeze({
    durationFrames: 38,
    burstDurationFrames: 14,
    splatCount: 8,
    oozeCount: 10,
    oozeColor: "rgba(45, 155, 225, 0.95)",
    oozeHighlightColor: "rgba(185, 235, 255, 0.78)",
  }),
});
