import createDagger from "@items/equipment/weapons/daggers/dagger/dagger";
import createShortsword from "@items/equipment/weapons/swords/shortsword/shortsword";
import createFalchion from "@items/equipment/weapons/swords/falchion/falchion";
import createLongsword from "@items/equipment/weapons/swords/longsword/longsword";
import createClaymore from "@items/equipment/weapons/greatswords/claymore/claymore";
import createHatchet from "@items/equipment/weapons/axes/hatchet/hatchet";
import createBattleaxe from "@items/equipment/weapons/greataxes/battleaxe/battleaxe";
import createMorningstar from "@items/equipment/weapons/maces/morningstar/morningstar";
import createHammer from "@items/equipment/weapons/hammers/hammer/hammer";
import createWarhammer from "@items/equipment/weapons/greathammers/warhammer/warhammer";
import createSpear from "@items/equipment/weapons/polearms/spear/spear";
import createStaff from "@items/equipment/weapons/staves/staff/staff";
import createWand from "@items/equipment/weapons/wands/wand/wand";

export const DEFAULT_WEAPON_ID = "swords.shortsword";

export const WEAPON_ITEMS = Object.freeze([
  Object.freeze({ id: "daggers.dagger", label: "Dagger" }),
  Object.freeze({ id: DEFAULT_WEAPON_ID, label: "Shortsword" }),
  Object.freeze({ id: "swords.falchion", label: "Falchion" }),
  Object.freeze({ id: "swords.longsword", label: "Longsword" }),
  Object.freeze({ id: "greatswords.claymore", label: "Claymore" }),
  Object.freeze({ id: "axes.hatchet", label: "Hatchet" }),
  Object.freeze({ id: "greataxes.battleaxe", label: "Battleaxe" }),
  Object.freeze({ id: "polearms.spear", label: "Spear" }),
  Object.freeze({ id: "staves.staff", label: "Staff" }),
  Object.freeze({ id: "wands.wand", label: "Wand" }),
  Object.freeze({ id: "maces.morningstar", label: "Morningstar" }),
  Object.freeze({ id: "hammers.hammer", label: "Hammer" }),
  Object.freeze({ id: "greathammers.warhammer", label: "Warhammer" }),
]);

// Used by the dev-options weapon picker to render labelled <optgroup>s.
export const WEAPON_GROUPS = Object.freeze([
  Object.freeze({
    label: "Daggers",
    options: Object.freeze([
      Object.freeze({ id: "daggers.dagger", label: "Dagger" }),
    ]),
  }),
  Object.freeze({
    label: "Swords",
    options: Object.freeze([
      Object.freeze({ id: DEFAULT_WEAPON_ID, label: "Shortsword" }),
      Object.freeze({ id: "swords.falchion", label: "Falchion" }),
      Object.freeze({ id: "swords.longsword", label: "Longsword" }),
    ]),
  }),
  Object.freeze({
    label: "Greatswords",
    options: Object.freeze([
      Object.freeze({ id: "greatswords.claymore", label: "Claymore" }),
    ]),
  }),
  Object.freeze({
    label: "Axes",
    options: Object.freeze([
      Object.freeze({ id: "axes.hatchet", label: "Hatchet" }),
    ]),
  }),
  Object.freeze({
    label: "Greataxes",
    options: Object.freeze([
      Object.freeze({ id: "greataxes.battleaxe", label: "Battleaxe" }),
    ]),
  }),
  Object.freeze({
    label: "Maces",
    options: Object.freeze([
      Object.freeze({ id: "maces.morningstar", label: "Morningstar" }),
    ]),
  }),
  Object.freeze({
    label: "Hammers",
    options: Object.freeze([
      Object.freeze({ id: "hammers.hammer", label: "Hammer" }),
    ]),
  }),
  Object.freeze({
    label: "Greathammers",
    options: Object.freeze([
      Object.freeze({ id: "greathammers.warhammer", label: "Warhammer" }),
    ]),
  }),
  Object.freeze({
    label: "Spears",
    options: Object.freeze([
      Object.freeze({ id: "polearms.spear", label: "Spear" }),
    ]),
  }),
  Object.freeze({
    label: "Magic Foci (physical)",
    options: Object.freeze([
      Object.freeze({ id: "staves.staff", label: "Staff" }),
      Object.freeze({ id: "wands.wand", label: "Wand" }),
    ]),
  }),
]);

export const createWeaponById = (id, gameState) => {
  const sprites = gameState.sprites;
  switch (id || DEFAULT_WEAPON_ID) {
    case "daggers.dagger":          return createDagger({ sprite: sprites.dagger });
    case "swords.falchion":         return createFalchion({ sprite: sprites.falchion });
    case "swords.longsword":        return createLongsword({ sprite: sprites.longsword });
    case "greatswords.claymore":    return createClaymore({ sprite: sprites.claymore });
    case "axes.hatchet":            return createHatchet({ sprite: sprites.hatchet });
    case "greataxes.battleaxe":     return createBattleaxe({ sprite: sprites.battleaxe });
    case "maces.morningstar":       return createMorningstar({ sprite: sprites.morningstar });
    case "hammers.hammer":          return createHammer({ sprite: sprites.hammer });
    case "greathammers.warhammer":  return createWarhammer({ sprite: sprites.warhammer });
    case "polearms.spear":          return createSpear({ sprite: sprites.spear });
    case "staves.staff":            return createStaff({ sprite: sprites.staff });
    case "wands.wand":              return createWand({ sprite: sprites.wand });
    case DEFAULT_WEAPON_ID:
    default:                        return createShortsword({ sprite: sprites.shortsword });
  }
};
