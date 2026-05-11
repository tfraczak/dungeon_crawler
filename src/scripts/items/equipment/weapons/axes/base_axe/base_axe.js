import createWeapon from "@items/equipment/weapons/weapon";
import attachArcAttack from "@items/equipment/weapons/attacks/arc_attack";
import { playAxeHit } from "@items/equipment/weapons/axes/sound";
import { playSlashSwing } from "@items/equipment/weapons/swords/sound";

// Shared base for one-handed axes (hatchet, ...). Axes share the slashing
// swing visual with swords, but their damage profiles lean on partial
// crushing (heavy axe head) — that comes from the variant's config.
function createBaseAxe({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const axe = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "oneHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "slashing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { slashing: 0.75, crushing: 0.25 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  axe.arc = overrides.arc ?? defaults.arc;
  axe.cooldown = overrides.cooldown ?? defaults.cooldown;
  axe.duration = overrides.duration ?? defaults.duration;
  axe.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  axe.onAttackStart = () => playSlashSwing();
  axe.onHit = () => playAxeHit();

  // `reverse: true` flips the sweep direction so the asymmetric hatchet
  // sprite — drawn with its cutting edge on the lower-left perpendicular
  // of the haft — has the broad cutting edge lead the arc instead of the
  // narrow poll. Symmetric sprites (greataxes, etc.) keep the default.
  attachArcAttack(axe, { style: "slashing", reverse: true });
  return axe;
}

export default createBaseAxe;
