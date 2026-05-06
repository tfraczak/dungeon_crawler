import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createTarge({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.targe",
    name: "Targe",
    description: "Brass-nailed leather face over wood, with a center spike",
    defaults: GAME_CONFIG.items.equipment.shields.targe,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createTarge;
