import createWeapon from "@items/equipment/weapons/weapon";
import attachThrustAttack from "@items/equipment/weapons/attacks/thrust_attack";
import { playDaggerHit, playDaggerSwing } from "@items/equipment/weapons/daggers/sound";

// Shared base for one-handed daggers. Quick, short-range piercing thrust with
// the cool blue trail that the family is known for.
function createBaseDagger({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const dagger = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "oneHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "piercing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { piercing: 1 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  dagger.cooldown = overrides.cooldown ?? defaults.cooldown;
  dagger.duration = overrides.duration ?? defaults.duration;
  dagger.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  dagger.thrustWidth = overrides.thrustWidth ?? defaults.thrustWidth;
  // Dagger sprite tip sits at ~(8, 8); ~22px from sprite center along the
  // canonical -3π/4 natural blade angle, so the drawn point lines up with
  // the hitbox tip during a thrust.
  dagger.spriteTipOffset = 22;
  dagger.onAttackStart = () => playDaggerSwing();
  dagger.onHit = () => playDaggerHit();

  attachThrustAttack(dagger, { style: "piercing" });
  return dagger;
}

export default createBaseDagger;
