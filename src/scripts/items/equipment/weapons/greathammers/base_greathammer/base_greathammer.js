import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playGreathammerHit } from "@items/equipment/weapons/greathammers/sound";
import { playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for two-handed hammers (warhammer, ...). Big, slow crushing
// arc with maximum knockback.
function createBaseGreathammer({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const greathammer = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "twoHanded",
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
  greathammer.arc = overrides.arc ?? defaults.arc;
  greathammer.cooldown = overrides.cooldown ?? defaults.cooldown;
  greathammer.duration = overrides.duration ?? defaults.duration;
  greathammer.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  greathammer.onAttackStart = () => playSlashSwing();
  greathammer.onHit = () => playGreathammerHit();

  attachArcAttack(greathammer, { style: "crushing" });
  return greathammer;
}

export default createBaseGreathammer;
