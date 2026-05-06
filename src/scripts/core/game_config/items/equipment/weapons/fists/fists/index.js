// Unarmed fallback. The player always "wields" fists when no weapon is
// equipped — short range, very low damage, low stamina cost, and a fast
// punch cooldown so unarmed combat is at least viable as a panic option.
export default Object.freeze({
  cooldown: 12,
  criticalChance: 0.04,
  criticalMultiplier: 2,
  damageMax: 2,
  damageMin: 1,
  damageProfile: Object.freeze({ crushing: 1 }),
  damageType: "crushing",
  duration: 6,
  handedness: "oneHanded",
  knockback: 14,
  range: 30,
  staminaCost: 30,
  thrustWidth: 14,
});
