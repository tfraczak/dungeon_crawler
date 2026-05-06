import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playSlashHit, playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for one-handed swords. Concrete variants (shortsword, longsword,
// ...) call this with their id/name/description/config/sprite. Family-level
// invariants (1H grip, slashing arc visual + sound) are locked in here so the
// variants stay thin and consistent.
function createBaseSword({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const sword = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "oneHanded",
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
  sword.arc = overrides.arc ?? defaults.arc;
  sword.cooldown = overrides.cooldown ?? defaults.cooldown;
  sword.duration = overrides.duration ?? defaults.duration;
  sword.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  sword.onAttackStart = () => playSlashSwing();
  sword.onHit = () => playSlashHit();

  attachArcAttack(sword, { style: "slashing" });
  return sword;
}

export default createBaseSword;
