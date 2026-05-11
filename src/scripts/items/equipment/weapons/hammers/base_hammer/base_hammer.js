import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playHammerHit } from "@items/equipment/weapons/hammers/sound";
import { playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for one-handed hammers (hammer, ...). Same swing-arc geometry
// as the swords/axes/maces, but with the heavier "crushing" visual treatment.
function createBaseHammer({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const hammer = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "oneHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "crushing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { crushing: 1 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  hammer.arc = overrides.arc ?? defaults.arc;
  hammer.cooldown = overrides.cooldown ?? defaults.cooldown;
  hammer.duration = overrides.duration ?? defaults.duration;
  hammer.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  hammer.onAttackStart = () => playSlashSwing();
  hammer.onHit = () => playHammerHit();

  attachArcAttack(hammer, { style: "crushing" });
  return hammer;
}

export default createBaseHammer;
