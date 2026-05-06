import * as GAME_CONFIG from "@core/game_config";
import createBaseGreataxe from "@items/equipment/weapons/greataxes/base_greataxe/base_greataxe";

function createBattleaxe({ sprite, ...overrides } = {}) {
  return createBaseGreataxe({
    id: "greataxes.battleaxe",
    type: "battleaxe",
    name: "Battleaxe",
    description: "A brutal two-handed axe with a wide-bladed head",
    defaults: GAME_CONFIG.items.equipment.weapons.greataxes.battleaxe,
    sprite,
    overrides,
  });
}

export default createBattleaxe;
