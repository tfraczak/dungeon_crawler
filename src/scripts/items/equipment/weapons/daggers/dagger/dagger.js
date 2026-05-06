import * as GAME_CONFIG from "@core/game_config";
import createBaseDagger from "@items/equipment/weapons/daggers/base_dagger/base_dagger";

function createDagger({ sprite, ...overrides } = {}) {
  return createBaseDagger({
    id: "daggers.dagger",
    type: "dagger",
    name: "Dagger",
    description: "A quick thrusting blade",
    defaults: GAME_CONFIG.items.equipment.weapons.daggers.dagger,
    sprite,
    overrides,
  });
}

export default createDagger;
