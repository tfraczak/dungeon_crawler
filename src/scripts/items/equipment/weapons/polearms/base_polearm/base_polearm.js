import createWeapon from "@items/equipment/weapons/weapon";
import attachThrustAttack from "@items/equipment/weapons/attacks/thrust_attack";
import { playDaggerHit, playDaggerSwing } from "@items/equipment/weapons/daggers/sound";

// Shared base for two-handed polearms. Polearms thrust like a dagger but with
// significantly longer reach and a wider thrust band — they're the long-range
// option among physical weapons.
function createBasePolearm({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const polearm = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "twoHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "piercing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { piercing: 0.7, slashing: 0.3 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  polearm.cooldown = overrides.cooldown ?? defaults.cooldown;
  polearm.duration = overrides.duration ?? defaults.duration;
  polearm.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  polearm.thrustWidth = overrides.thrustWidth ?? defaults.thrustWidth;
  // Polearm spear point sits at ~(4,4); ~28px from sprite center.
  polearm.spriteTipOffset = 28;
  polearm.onAttackStart = () => playDaggerSwing();
  polearm.onHit = () => playDaggerHit();

  attachThrustAttack(polearm, { style: "polearm" });
  return polearm;
}

export default createBasePolearm;
