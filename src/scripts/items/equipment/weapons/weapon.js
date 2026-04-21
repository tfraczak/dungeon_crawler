import createEquipment from "@items/equipment/equipment";
import Random from "@utils/random";
import DEV_FLAGS from "@core/dev_flags";

function createWeapon({ name, description, damageMin, damageMax, damageType, range, knockback }) {
  const weapon = createEquipment({ name, description, slot: "weapon" });
  weapon.damageMin = damageMin;
  weapon.damageMax = damageMax;
  weapon.damageType = damageType;
  weapon.range = range;
  weapon.knockback = knockback;

  // `one_shot` dev flag returns a damage value large enough to kill any enemy
  // (current max is GAME_CONFIG.entities.enemy.hp = 50, so 9999 is comfortably lethal
  // regardless of any enemy_hp override).
  weapon.rollDamage = () => {
    if (DEV_FLAGS.oneShot) return 9999;
    return Random.int(weapon.damageMin, weapon.damageMax);
  };

  weapon.hitsTarget = (hitbox, colBox) => false;

  return weapon;
}

export default createWeapon;
