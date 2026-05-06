import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createVikingShield({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.vikingShield",
    name: "Viking Shield",
    description: "Planked wood with a riveted iron boss",
    defaults: GAME_CONFIG.items.equipment.shields.vikingShield,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createVikingShield;
