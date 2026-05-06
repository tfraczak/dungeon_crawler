import * as GAME_CONFIG from "@core/game_config";
import createBaseSword from "@items/equipment/weapons/swords/base_sword/base_sword";

function createShortsword({ sprite, ...overrides } = {}) {
  return createBaseSword({
    id: "swords.shortsword",
    type: "shortsword",
    name: "Shortsword",
    description: "A balanced short blade",
    defaults: GAME_CONFIG.items.equipment.weapons.swords.shortsword,
    sprite,
    overrides,
  });
}

export default createShortsword;
