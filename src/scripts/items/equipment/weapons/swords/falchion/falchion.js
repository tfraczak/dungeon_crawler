import * as GAME_CONFIG from "@core/game_config";
import createBaseSword from "@items/equipment/weapons/swords/base_sword/base_sword";

function createFalchion({ sprite, ...overrides } = {}) {
  return createBaseSword({
    id: "swords.falchion",
    type: "falchion",
    name: "Falchion",
    description: "A broad, single-edged chopping sword with an asymmetrical blade and keen cutting edge",
    defaults: GAME_CONFIG.items.equipment.weapons.swords.falchion,
    sprite,
    overrides,
  });
}

export default createFalchion;
