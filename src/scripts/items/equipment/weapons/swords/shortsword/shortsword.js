import * as GAME_CONFIG from "@core/game_config";
import createSlashingWeapon from "@items/equipment/weapons/swords/slashing_weapon";

function createShortsword(overrides = {}) {
  return createSlashingWeapon({
    defaults: GAME_CONFIG.items.equipment.weapons.swords.shortsword,
    overrides,
    type: "shortsword",
    name: "Shortsword",
    description: "A balanced short blade",
  });
}

export default createShortsword;
