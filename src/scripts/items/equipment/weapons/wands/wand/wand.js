import * as GAME_CONFIG from "@core/game_config";
import createBaseWand from "@items/equipment/weapons/wands/base_wand/base_wand";

function createWand({ sprite, ...overrides } = {}) {
  return createBaseWand({
    id: "wands.wand",
    type: "wand",
    name: "Wand",
    description: "A short carved focus — a sharp poke in the hands of non-magic users",
    defaults: GAME_CONFIG.items.equipment.weapons.wands.wand,
    sprite,
    overrides,
  });
}

export default createWand;
