import * as GAME_CONFIG from "@core/game_config";
import createBaseSword from "@items/equipment/weapons/swords/base_sword/base_sword";

function createLongsword({ sprite, ...overrides } = {}) {
  return createBaseSword({
    id: "swords.longsword",
    type: "longsword",
    name: "Longsword",
    description: "A longer, heavier one-handed blade with greater reach",
    defaults: GAME_CONFIG.items.equipment.weapons.swords.longsword,
    sprite,
    overrides,
  });
}

export default createLongsword;
