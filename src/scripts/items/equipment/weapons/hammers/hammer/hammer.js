import * as GAME_CONFIG from "@core/game_config";
import createBaseHammer from "@items/equipment/weapons/hammers/base_hammer/base_hammer";

function createHammer({ sprite, ...overrides } = {}) {
  return createBaseHammer({
    id: "hammers.hammer",
    type: "hammer",
    name: "Hammer",
    description: "A one-handed crushing hammer with a stout iron head",
    defaults: GAME_CONFIG.items.equipment.weapons.hammers.hammer,
    sprite,
    overrides,
  });
}

export default createHammer;
