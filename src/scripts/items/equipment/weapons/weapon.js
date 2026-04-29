import createEquipment from "@items/equipment/equipment";
import Random from "@utils/random";
import DEV_FLAGS from "@core/dev_flags";

function createWeapon({
  name,
  description,
  damageMin,
  damageMax,
  damageType,
  range,
  knockback,
  type,
  criticalChance = 0,
  criticalMultiplier = 1,
}) {
  const weapon = createEquipment({ name, description, slot: "weapon" });
  weapon.type = type;
  weapon.damageMin = damageMin;
  weapon.damageMax = damageMax;
  weapon.damageType = damageType;
  weapon.range = range;
  weapon.knockback = knockback;
  weapon.criticalChance = criticalChance;
  weapon.criticalMultiplier = criticalMultiplier;
  weapon.lastDamageRoll = { baseDamage: 0, critical: false, damage: 0 };

  // `one_shot` dev flag returns a damage value large enough to kill any enemy
  // (current max is GAME_CONFIG.entities.enemy.hp = 50, so 9999 is comfortably lethal
  // regardless of any enemy_hp override).
  weapon.rollDamage = () => {
    if (DEV_FLAGS.oneShot) {
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

  return weapon;
}

export default createWeapon;
