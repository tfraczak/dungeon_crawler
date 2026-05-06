import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createTowerShield({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.towerShield",
    name: "Tower Shield",
    description: "A full-body wall of banded oak and iron",
    defaults: GAME_CONFIG.items.equipment.shields.towerShield,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createTowerShield;
