export { default as buckler } from "./buckler";
export { default as targe } from "./targe";
export { default as rotella } from "./rotella";
export { default as vikingShield } from "./viking_shield";
export { default as roundShield } from "./round_shield";
export { default as heaterShield } from "./heater_shield";
export { default as towerShield } from "./tower_shield";
export { default as kiteShield } from "./kite_shield";

// Block-stat defaults keyed by `shield.size`. The base shield factory pulls
// from this table and lets each shield's config override individual fields.
//
// Trends, by design:
//   - Larger shields nullify more damage, knock attackers back further, cover
//     a wider arc, and have a longer post-impact recovery.
//   - Larger shields cost more stamina per frame to hold up and slow the
//     player's movement more (75% / 50% / 25% retained speed).
//   - Smaller shields trade protection for mobility and quick recovery.
//
// `staminaCost` is a per-frame drain at ~60 fps against the 1000-stamina pool
// (sprint drain is 4/frame for reference). `cooldown` is in frames.
export const SIZE_DEFAULTS = Object.freeze({
  small: Object.freeze({
    attackerKnockback:  30,
    blockAngle:         Math.PI * 0.78,
    cooldown:           10,
    damageReduction:    0.70,
    projectileBehavior: "deflect",
    speedMultiplier:    0.75,
    staminaCost:        1.0,
  }),
  medium: Object.freeze({
    attackerKnockback:  44,
    blockAngle:         Math.PI * 0.90,
    cooldown:           15,
    damageReduction:    0.90,
    projectileBehavior: "deflect",
    speedMultiplier:    0.50,
    staminaCost:        2.0,
  }),
  large: Object.freeze({
    attackerKnockback:  58,
    blockAngle:         Math.PI,
    cooldown:           22,
    damageReduction:    1.00,
    projectileBehavior: "nullify",
    speedMultiplier:    0.25,
    staminaCost:        3.5,
  }),
});
