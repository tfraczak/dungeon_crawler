import createWeapon from "@items/equipment/weapons/weapon";
import attachThrustAttack from "@items/equipment/weapons/attacks/thrust_attack";
import { playDaggerHit, playDaggerSwing } from "@items/equipment/weapons/daggers/sound";

// Shared base for unarmed strikes. Fists are never picked up or equipped
// from the inventory — `compatibleSlots` is empty so `itemFitsSlot` rejects
// any attempt to drop them into a hand slot. They only exist as the
// runtime fallback returned from `player.activeWeapon()` when both hands
// are empty. Damage is minor crushing, range is very short, and the
// "punch" thrust style draws a knuckle disc instead of a sprite blade.
function createBaseFists({ id, type, name, description, defaults, overrides = {} }) {
  const fists = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "oneHanded",
    compatibleSlots: [],
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "crushing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { crushing: 1 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: null,
  });
  fists.cooldown = overrides.cooldown ?? defaults.cooldown;
  fists.duration = overrides.duration ?? defaults.duration;
  fists.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  fists.thrustWidth = overrides.thrustWidth ?? defaults.thrustWidth;
  fists.unarmed = true;
  fists.onAttackStart = () => playDaggerSwing();
  fists.onHit = () => playDaggerHit();

  attachThrustAttack(fists, { style: "fist" });
  return fists;
}

export default createBaseFists;
