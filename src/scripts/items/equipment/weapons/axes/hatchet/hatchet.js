import * as GAME_CONFIG from "@core/game_config";
import createBaseAxe from "@items/equipment/weapons/axes/base_axe/base_axe";

function createHatchet({ sprite, ...overrides } = {}) {
  return createBaseAxe({
    id: "axes.hatchet",
    type: "hatchet",
    name: "Hatchet",
    description: "A compact one-handed axe with a heavy bite",
    defaults: GAME_CONFIG.items.equipment.weapons.axes.hatchet,
    sprite,
    overrides,
  });
}

export default createHatchet;
