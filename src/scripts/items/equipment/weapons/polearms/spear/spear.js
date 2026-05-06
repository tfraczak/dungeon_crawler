import * as GAME_CONFIG from "@core/game_config";
import createBasePolearm from "@items/equipment/weapons/polearms/base_polearm/base_polearm";

function createSpear({ sprite, ...overrides } = {}) {
  return createBasePolearm({
    id: "polearms.spear",
    type: "spear",
    name: "Spear",
    description: "A long-hafted leaf-bladed point — outranges every other physical weapon",
    defaults: GAME_CONFIG.items.equipment.weapons.polearms.spear,
    sprite,
    overrides,
  });
}

export default createSpear;
