import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createKiteShield({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.kiteShield",
    name: "Kite Shield",
    description: "A tall almond shield that protects from shoulder to shin",
    defaults: GAME_CONFIG.items.equipment.shields.kiteShield,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createKiteShield;
