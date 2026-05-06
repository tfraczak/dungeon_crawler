import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createBuckler({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.buckler",
    name: "Buckler",
    description: "A small round shield with a central steel boss",
    defaults: GAME_CONFIG.items.equipment.shields.buckler,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createBuckler;
