// Hand slots follow a main-hand / off-hand convention rather than physical
// left/right anatomy:
//   - mainHand: weapons (1H or 2H).
//   - offHand:  shields only.
// 2H weapons live ONLY in mainHand. The off-hand reservation that prevents
// a shield being equipped alongside is enforced inside `equipItem` rather
// than by storing the same item in both slots — the UI shows the off-hand
// ghost-copy of the 2H weapon by checking `equipment.mainHand` directly.
//
// Other paired slots (rings, ears) keep right/left labels because they have
// no functional asymmetry — the player wears one of each, no preference.
export const EQUIPMENT_SLOTS = Object.freeze({
  mainHand: "mainHand",
  offHand: "offHand",
  head: "head",
  body: "body",
  gloves: "gloves",
  legs: "legs",
  feet: "feet",
  rightRing: "rightRing",
  leftRing: "leftRing",
  wrist: "wrist",
  rightEar: "rightEar",
  leftEar: "leftEar",
  neck: "neck",
});

export const HAND_SLOTS = Object.freeze([
  EQUIPMENT_SLOTS.mainHand,
  EQUIPMENT_SLOTS.offHand,
]);

export const SLOT_LABELS = Object.freeze({
  [EQUIPMENT_SLOTS.mainHand]: "Main hand",
  [EQUIPMENT_SLOTS.offHand]: "Off hand",
  [EQUIPMENT_SLOTS.head]: "Head",
  [EQUIPMENT_SLOTS.body]: "Body",
  [EQUIPMENT_SLOTS.gloves]: "Gloves",
  [EQUIPMENT_SLOTS.legs]: "Legs",
  [EQUIPMENT_SLOTS.feet]: "Feet",
  [EQUIPMENT_SLOTS.rightRing]: "Right ring",
  [EQUIPMENT_SLOTS.leftRing]: "Left ring",
  [EQUIPMENT_SLOTS.wrist]: "Wrist",
  [EQUIPMENT_SLOTS.rightEar]: "Right ear",
  [EQUIPMENT_SLOTS.leftEar]: "Left ear",
  [EQUIPMENT_SLOTS.neck]: "Neck",
});

export const createEmptyEquipmentSlots = () => Object.fromEntries(
  Object.values(EQUIPMENT_SLOTS).map(slot => [slot, null]),
);

export const itemFitsSlot = (item, slot) => (
  Boolean(item?.compatibleSlots?.includes(slot))
);

// Items live in exactly one slot now (even 2H weapons), so this is just a
// "drop nulls" pass — but it stays a named helper because consumers don't
// need to know that detail.
export const uniqueEquippedItems = (equipment) => (
  Object.values(equipment).filter(Boolean)
);
