import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playGreataxeHit } from "@items/equipment/weapons/greataxes/sound";
import { playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for two-handed axes (battleaxe, ...). Big, slow, slashing arc
// with partial crushing in the damage profile.
function createBaseGreataxe({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const greataxe = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "twoHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "slashing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { slashing: 0.7, crushing: 0.3 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  greataxe.arc = overrides.arc ?? defaults.arc;
  greataxe.cooldown = overrides.cooldown ?? defaults.cooldown;
  greataxe.duration = overrides.duration ?? defaults.duration;
  greataxe.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  greataxe.onAttackStart = () => playSlashSwing();
  greataxe.onHit = () => playGreataxeHit();

  attachArcAttack(greataxe, { style: "slashing" });
  return greataxe;
}

export default createBaseGreataxe;
