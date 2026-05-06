import createEquipment from "@items/equipment/equipment";
import { EQUIPMENT_SLOTS } from "@items/equipment/slots";
import Random from "@utils/random";
import TEST_STATE, { TEST_IDS } from "@core/player_testing";

function createWeapon({
  id,
  name,
  description,
  damageMin,
  damageMax,
  damageType,
  damageProfile,
  range,
  knockback,
  type,
  handedness = "oneHanded",
  // Weapons live in the main hand by default. Two-handed weapons stay in
  // main-hand only — the equip pipeline evicts whatever's in the off-hand
  // when a 2H weapon is equipped, and conversely a shield going into the
  // off-hand evicts a 2H weapon from main. Dual-wield variants can opt in
  // by passing a custom compatibleSlots that includes the off hand.
  compatibleSlots = [EQUIPMENT_SLOTS.mainHand],
  sprite = null,
  criticalChance = 0,
  criticalMultiplier = 1,
}) {
  const normalizedDamageType = damageType ?? "slashing";
  const profile = damageProfile ?? { [normalizedDamageType]: 1 };
  const weapon = createEquipment({
    id,
    name,
    description,
    slot: "hand",
    equipmentKind: "weapon",
    compatibleSlots,
    icon: sprite,
  });
  weapon.type = type;
  weapon.damageMin = damageMin;
  weapon.damageMax = damageMax;
  weapon.damageType = normalizedDamageType;
  weapon.damageProfile = profile;
  weapon.range = range;
  weapon.knockback = knockback;
  weapon.handedness = handedness;
  weapon.sprite = sprite;
  weapon.criticalChance = criticalChance;
  weapon.criticalMultiplier = criticalMultiplier;
  weapon.lastDamageRoll = { baseDamage: 0, critical: false, damage: 0 };

  // `one_shot` dev flag returns a damage value large enough to kill any enemy
  // (current max is GAME_CONFIG.entities.enemy.hp = 50, so 9999 is comfortably lethal
  // regardless of any enemy_hp override).
  weapon.rollDamage = () => {
    if (TEST_STATE[TEST_IDS.c]) {
      weapon.lastDamageRoll = { baseDamage: 9999, critical: false, damage: 9999 };
      return 9999;
    }

    const baseDamage = Random.int(weapon.damageMin, weapon.damageMax);
    const critical = Random.chance(weapon.criticalChance);
    const damage = critical
      ? Math.round(baseDamage * weapon.criticalMultiplier)
      : baseDamage;

    weapon.lastDamageRoll = { baseDamage, critical, damage };
    return damage;
  };

  weapon.hitsTarget = (_hitbox, _colBox) => false;
  weapon.onAttackStart = () => {};
  weapon.onHit = () => {};

  return weapon;
}

export default createWeapon;
