import * as GAME_CONFIG from "@core/game_config";
import createBaseMace from "@items/equipment/weapons/maces/base_mace/base_mace";

function createMorningstar({ sprite, ...overrides } = {}) {
  return createBaseMace({
    id: "maces.morningstar",
    type: "morningstar",
    name: "Morningstar",
    description: "A spiked iron ball on a haft — crushing with piercing bite",
    defaults: GAME_CONFIG.items.equipment.weapons.maces.morningstar,
    sprite,
    overrides,
  });
}

export default createMorningstar;
