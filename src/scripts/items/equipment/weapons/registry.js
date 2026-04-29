import createDagger from "@items/equipment/weapons/daggers/dagger/dagger";
import createShortsword from "@items/equipment/weapons/swords/shortsword/shortsword";

export const DEFAULT_WEAPON_ID = "swords.shortsword";

export const WEAPON_GROUPS = Object.freeze([
  Object.freeze({
    label: "Swords",
    options: Object.freeze([
      Object.freeze({ id: DEFAULT_WEAPON_ID, label: "Shortsword" }),
    ]),
  }),
  Object.freeze({
    label: "Daggers",
    options: Object.freeze([
      Object.freeze({ id: "daggers.dagger", label: "Dagger" }),
    ]),
  }),
]);

export const createWeaponById = (id, gameState) => {
  switch (id || DEFAULT_WEAPON_ID) {
    case "daggers.dagger":
      return createDagger({ sprite: gameState.sprites.dagger });
    case DEFAULT_WEAPON_ID:
    default:
      return createShortsword({ sprite: gameState.sprites.shortsword });
  }
};
