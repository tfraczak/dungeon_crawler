import createEquipment from "../equipment";

function createWeapon({ name, description, damageMin, damageMax, damageType, range, knockback }) {
  const weapon = createEquipment({ name, description, slot: "weapon" });
  weapon.damageMin = damageMin;
  weapon.damageMax = damageMax;
  weapon.damageType = damageType;
  weapon.range = range;
  weapon.knockback = knockback;

  weapon.rollDamage = () =>
    Math.floor(Math.random() * (weapon.damageMax - weapon.damageMin + 1)) + weapon.damageMin;

  weapon.hitsTarget = (hitbox, colBox) => false;

  return weapon;
}

export default createWeapon;
