import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createHeaterShield({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.heaterShield",
    name: "Heater Shield",
    description: "A flat-topped, point-bottomed knight's shield",
    defaults: GAME_CONFIG.items.equipment.shields.heaterShield,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createHeaterShield;
