import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playStaffHit } from "@items/equipment/weapons/staves/sound";
import { playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for two-handed staves (staff, ...). For non-magic users this
// is purely a physical bo-style swing — same arc geometry as the swords/axes
// but with the heavier crushing visual treatment to read as a club hit.
// Future magic-user variants can layer additional behavior on top.
function createBaseStaff({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const staff = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "twoHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "crushing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { crushing: 0.65, piercing: 0.35 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  staff.arc = overrides.arc ?? defaults.arc;
  staff.cooldown = overrides.cooldown ?? defaults.cooldown;
  staff.duration = overrides.duration ?? defaults.duration;
  staff.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  staff.onAttackStart = () => playSlashSwing();
  staff.onHit = () => playStaffHit();

  attachArcAttack(staff, { style: "crushing" });
  return staff;
}

export default createBaseStaff;
