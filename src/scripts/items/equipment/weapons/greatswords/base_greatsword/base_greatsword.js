import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playSlashHit, playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for two-handed swords (claymore, ...). Locks the family to a
// two-handed grip, slashing arc visual, and the slashing swing/hit sound set.
function createBaseGreatsword({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const greatsword = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "twoHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "slashing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { slashing: 1 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  greatsword.arc = overrides.arc ?? defaults.arc;
  greatsword.cooldown = overrides.cooldown ?? defaults.cooldown;
  greatsword.duration = overrides.duration ?? defaults.duration;
  greatsword.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  greatsword.onAttackStart = () => playSlashSwing();
  greatsword.onHit = () => playSlashHit();

  attachArcAttack(greatsword, { style: "slashing" });
  return greatsword;
}

export default createBaseGreatsword;
