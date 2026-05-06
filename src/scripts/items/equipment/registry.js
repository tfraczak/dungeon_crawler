import createBuckler       from "@items/equipment/shields/buckler/buckler";
import createTarge         from "@items/equipment/shields/targe/targe";
import createRotella       from "@items/equipment/shields/rotella/rotella";
import createVikingShield  from "@items/equipment/shields/viking_shield/viking_shield";
import createRoundShield   from "@items/equipment/shields/round_shield/round_shield";
import createHeaterShield  from "@items/equipment/shields/heater_shield/heater_shield";
import createKiteShield    from "@items/equipment/shields/kite_shield/kite_shield";
import createTowerShield   from "@items/equipment/shields/tower_shield/tower_shield";
import { createWeaponById, WEAPON_ITEMS } from "@items/equipment/weapons/registry";

export const SHIELD_ITEMS = Object.freeze([
  Object.freeze({ id: "shields.buckler",      label: "Buckler" }),
  Object.freeze({ id: "shields.targe",        label: "Targe" }),
  Object.freeze({ id: "shields.rotella",      label: "Rotella" }),
  Object.freeze({ id: "shields.vikingShield", label: "Viking Shield" }),
  Object.freeze({ id: "shields.roundShield",  label: "Round Shield" }),
  Object.freeze({ id: "shields.heaterShield", label: "Heater Shield" }),
  Object.freeze({ id: "shields.kiteShield",   label: "Kite Shield" }),
  Object.freeze({ id: "shields.towerShield",  label: "Tower Shield" }),
]);

// Used by the dev-options shield picker (and future UI groupings) to render
// labelled sections by size.
export const SHIELD_GROUPS = Object.freeze([
  Object.freeze({
    label: "Small Shields",
    options: Object.freeze([
      Object.freeze({ id: "shields.buckler", label: "Buckler" }),
      Object.freeze({ id: "shields.targe",   label: "Targe" }),
      Object.freeze({ id: "shields.rotella", label: "Rotella" }),
    ]),
  }),
  Object.freeze({
    label: "Medium Shields",
    options: Object.freeze([
      Object.freeze({ id: "shields.vikingShield", label: "Viking Shield" }),
      Object.freeze({ id: "shields.roundShield",  label: "Round Shield" }),
      Object.freeze({ id: "shields.heaterShield", label: "Heater Shield" }),
    ]),
  }),
  Object.freeze({
    label: "Large Shields",
    options: Object.freeze([
      Object.freeze({ id: "shields.kiteShield",  label: "Kite Shield" }),
      Object.freeze({ id: "shields.towerShield", label: "Tower Shield" }),
    ]),
  }),
]);

export const EQUIPMENT_ITEMS = Object.freeze([
  ...WEAPON_ITEMS,
  ...SHIELD_ITEMS,
]);

export const createEquipmentById = (id, gameState) => {
  const s = gameState.sprites;
  switch (id) {
    case "shields.buckler":      return createBuckler({      sprite: s.buckler,      spriteSide: s.bucklerSide });
    case "shields.targe":        return createTarge({        sprite: s.targe,        spriteSide: s.targeSide });
    case "shields.rotella":      return createRotella({      sprite: s.rotella,      spriteSide: s.rotellaSide });
    case "shields.vikingShield": return createVikingShield({ sprite: s.vikingShield, spriteSide: s.vikingShieldSide });
    case "shields.roundShield":  return createRoundShield({  sprite: s.roundShield,  spriteSide: s.roundShieldSide });
    case "shields.heaterShield": return createHeaterShield({ sprite: s.heaterShield, spriteSide: s.heaterShieldSide });
    case "shields.kiteShield":   return createKiteShield({   sprite: s.kiteShield,   spriteSide: s.kiteShieldSide });
    case "shields.towerShield":  return createTowerShield({  sprite: s.towerShield,  spriteSide: s.towerShieldSide });
    default:                     return createWeaponById(id, gameState);
  }
};
