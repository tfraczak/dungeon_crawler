import * as GAME_CONFIG from "@core/game_config";
import createBaseGreatsword from "@items/equipment/weapons/greatswords/base_greatsword/base_greatsword";

function createClaymore({ sprite, ...overrides } = {}) {
  return createBaseGreatsword({
    id: "greatswords.claymore",
    type: "claymore",
    name: "Claymore",
    description: "A massive Highland blade — slow but devastating",
    defaults: GAME_CONFIG.items.equipment.weapons.greatswords.claymore,
    sprite,
    overrides,
  });
}

export default createClaymore;
