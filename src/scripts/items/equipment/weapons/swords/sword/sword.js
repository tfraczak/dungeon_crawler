import * as GAME_CONFIG from "@core/game_config";
import createSlashingWeapon from "@items/equipment/weapons/swords/slashing_weapon";

function createSword(overrides = {}) {
  return createSlashingWeapon({
    defaults: GAME_CONFIG.items.equipment.weapons.swords.sword,
    overrides,
    type: "sword",
    name: "Sword",
    description: "A trusty blade",
  });
}

export default createSword;
