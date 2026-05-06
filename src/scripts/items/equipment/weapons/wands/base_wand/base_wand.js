import createWeapon from "@items/equipment/weapons/weapon";
import attachThrustAttack from "@items/equipment/weapons/attacks/thrust_attack";
import { playDaggerHit, playDaggerSwing } from "@items/equipment/weapons/daggers/sound";

// Shared base for one-handed wands. For non-magic users this is a small,
// quick poke — short range, low stamina cost, but deceptively responsive.
// Future magic-user variants can layer additional behavior on top.
function createBaseWand({ id, type, name, description, defaults, sprite, overrides = {} }) {
  const wand = createWeapon({
    id,
    name,
    description,
    type,
    handedness: defaults.handedness ?? "oneHanded",
    damageMin: overrides.damageMin ?? defaults.damageMin,
    damageMax: overrides.damageMax ?? defaults.damageMax,
    damageType: overrides.damageType ?? defaults.damageType ?? "crushing",
    damageProfile: overrides.damageProfile ?? defaults.damageProfile ?? { crushing: 0.5, piercing: 0.5 },
    range: overrides.range ?? defaults.range,
    knockback: overrides.knockback ?? defaults.knockback,
    criticalChance: overrides.criticalChance ?? defaults.criticalChance,
    criticalMultiplier: overrides.criticalMultiplier ?? defaults.criticalMultiplier,
    sprite: overrides.sprite ?? sprite ?? null,
  });
  wand.cooldown = overrides.cooldown ?? defaults.cooldown;
  wand.duration = overrides.duration ?? defaults.duration;
  wand.staminaCost = overrides.staminaCost ?? defaults.staminaCost;
  wand.thrustWidth = overrides.thrustWidth ?? defaults.thrustWidth;
  // Wand carved tip sits at ~(14,14); ~14px from sprite center.
  wand.spriteTipOffset = 14;
  wand.onAttackStart = () => playDaggerSwing();
  wand.onHit = () => playDaggerHit();

  attachThrustAttack(wand, { style: "wand" });
  return wand;
}

export default createBaseWand;
