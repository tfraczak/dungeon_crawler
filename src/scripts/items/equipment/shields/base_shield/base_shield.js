import * as GAME_CONFIG from "@core/game_config";
import createEquipment from "@items/equipment/equipment";
import { EQUIPMENT_SLOTS } from "@items/equipment/slots";
import { playShieldBlock } from "@items/equipment/shields/sound";

// Shared base for every shield. Concrete variants (buckler, viking shield,
// tower shield, ...) call this with their id/name/description/config/sprite.
// Family-level invariants (1H grip, hand-slot compatibility, block sound,
// size-driven block stats) are locked in here so the variants stay thin.
//
// `defaults` is the per-shield config (e.g. { size: "small" } with optional
// overrides). Block stats default to the size's entry in SIZE_DEFAULTS;
// individual fields can be overridden either by the per-shield config or by
// the caller's `overrides` argument.
function createBaseShield({ id, name, description, defaults, sprite, spriteSide = null, overrides = {} }) {
  const size = overrides.size ?? defaults.size ?? "medium";
  const sizeDefaults = GAME_CONFIG.items.equipment.shields.SIZE_DEFAULTS[size]
    ?? GAME_CONFIG.items.equipment.shields.SIZE_DEFAULTS.medium;

  const pick = (key) => overrides[key] ?? defaults[key] ?? sizeDefaults[key];

  const shield = createEquipment({
    id,
    name: overrides.name ?? name,
    description: overrides.description ?? description,
    slot: "hand",
    equipmentKind: "shield",
    // Off-hand only — pairing a shield with a 2H weapon is impossible because
    // 2H weapons occupy both hand slots, and the equip pipeline auto-unequips
    // the 2H weapon when a shield drops into the off-hand.
    compatibleSlots: [EQUIPMENT_SLOTS.offHand],
    icon: sprite,
  });
  shield.handedness = "oneHanded";
  shield.size = size;
  shield.sprite = sprite;
  // Edge-on view drawn for left/right facing in `player.drawBlock`. Drawn so
  // the convex face points LEFT in the asset; the renderer flips the sprite
  // horizontally when the player is facing right.
  shield.spriteSide = spriteSide;
  shield.block = {
    attackerKnockback:  pick("attackerKnockback"),
    blockAngle:         pick("blockAngle"),
    cooldown:           pick("cooldown"),
    damageReduction:    pick("damageReduction"),
    projectileBehavior: pick("projectileBehavior"),
    speedMultiplier:    pick("speedMultiplier"),
    staminaCost:        pick("staminaCost"),
  };
  shield.onBlock = () => playShieldBlock();
  return shield;
}

export default createBaseShield;
