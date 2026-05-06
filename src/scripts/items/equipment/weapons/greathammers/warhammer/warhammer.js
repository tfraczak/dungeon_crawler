import * as GAME_CONFIG from "@core/game_config";
import createBaseGreathammer from "@items/equipment/weapons/greathammers/base_greathammer/base_greathammer";

function createWarhammer({ sprite, ...overrides } = {}) {
  return createBaseGreathammer({
    id: "greathammers.warhammer",
    type: "warhammer",
    name: "Warhammer",
    description: "A massive two-handed hammer — slow swings, devastating impact",
    defaults: GAME_CONFIG.items.equipment.weapons.greathammers.warhammer,
    sprite,
    overrides,
  });
}

export default createWarhammer;
