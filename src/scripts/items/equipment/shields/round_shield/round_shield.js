import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createRoundShield({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.roundShield",
    name: "Round Shield",
    description: "A sturdy iron-rimmed wooden round",
    defaults: GAME_CONFIG.items.equipment.shields.roundShield,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createRoundShield;
