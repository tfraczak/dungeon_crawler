import * as GAME_CONFIG from "@core/game_config";
import createBaseShield from "@items/equipment/shields/base_shield/base_shield";

function createRotella({ sprite = null, spriteSide = null, ...overrides } = {}) {
  return createBaseShield({
    id: "shields.rotella",
    name: "Rotella",
    description: "An ornate engraved Italian round shield",
    defaults: GAME_CONFIG.items.equipment.shields.rotella,
    sprite,
    spriteSide,
    overrides,
  });
}

export default createRotella;
