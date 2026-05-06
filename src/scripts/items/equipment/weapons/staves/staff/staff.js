import * as GAME_CONFIG from "@core/game_config";
import createBaseStaff from "@items/equipment/weapons/staves/base_staff/base_staff";

function createStaff({ sprite, ...overrides } = {}) {
  return createBaseStaff({
    id: "staves.staff",
    type: "staff",
    name: "Staff",
    description: "A two-handed quarterstaff — physical strikes for non-magic users",
    defaults: GAME_CONFIG.items.equipment.weapons.staves.staff,
    sprite,
    overrides,
  });
}

export default createStaff;
