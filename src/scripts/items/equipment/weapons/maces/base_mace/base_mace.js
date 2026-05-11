import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playMaceHit } from "@items/equipment/weapons/maces/sound";
import { playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for one-handed maces (morningstar, ...). Maces use the swing
// arc geometry with the heavier "crushing" visual treatment — bronze trail
// and an impact pulse at the apex of the swing.
function createBaseMace({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const mace = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "oneHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "crushing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { crushing: 0.8, piercing: 0.2 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  mace.arc = overrides.arc ?? defaults.arc;
  mace.cooldown = overrides.cooldown ?? defaults.cooldown;
  mace.duration = overrides.duration ?? defaults.duration;
  mace.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  mace.onAttackStart = () => playSlashSwing();
  mace.onHit = () => playMaceHit();

  attachArcAttack(mace, { style: "crushing" });
  return mace;
}

export default createBaseMace;
