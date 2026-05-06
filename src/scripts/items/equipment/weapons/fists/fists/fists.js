import * as GAME_CONFIG from "@core/game_config";
import createBaseFists from "@items/equipment/weapons/fists/base_fists/base_fists";

function createFists(overrides = {}) {
  return createBaseFists({
    id: "fists.fists",
    type: "fists",
    name: "Fists",
    description: "Bare-knuckle punches — minor crushing damage, very short reach",
    defaults: GAME_CONFIG.items.equipment.weapons.fists.fists,
    overrides,
  });
}

export default createFists;
