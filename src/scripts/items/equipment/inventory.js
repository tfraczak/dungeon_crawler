import {
  EQUIPMENT_SLOTS,
  createEmptyEquipmentSlots,
  itemFitsSlot,
} from "./slots";

let itemInstanceCounter = 0;

export const assignInventoryInstance = (item) => {
  item.instanceId ??= `${item.id || "item"}_${itemInstanceCounter++}`;
  return item;
};

export const createInventory = () => ({
  items: [],
  add(item) {
    const owned = assignInventoryInstance(item);
    this.items.push(owned);
    return owned;
  },
  remove(instanceId) {
    const idx = this.items.findIndex(item => item.instanceId === instanceId);
    if (idx < 0) return null;
    return this.items.splice(idx, 1)[0];
  },
  find(instanceId) {
    return this.items.find(item => item.instanceId === instanceId) ?? null;
  },
});

export const createEquipmentState = () => createEmptyEquipmentSlots();

export const unequipItem = (equipment, item) => {
  if (!item) return;
  for (const [slot, equipped] of Object.entries(equipment)) {
    if (equipped?.instanceId === item.instanceId) equipment[slot] = null;
  }
};

// A 2H weapon in main-hand and any off-hand item are mutually exclusive —
// equipping either side clears the other. Compatibility (weapons only fit
// main-hand, shields only fit off-hand) is handled by `itemFitsSlot`, so
// there's nothing else to do beyond that one rule.
export const equipItem = (equipment, item, slot) => {
  if (!itemFitsSlot(item, slot)) {
    return { ok: false, reason: "That item cannot be equipped there." };
  }
  unequipItem(equipment, item);

  if (item.handedness === "twoHanded") {
    equipment[EQUIPMENT_SLOTS.offHand] = null;
  } else if (
    slot === EQUIPMENT_SLOTS.offHand
    && equipment[EQUIPMENT_SLOTS.mainHand]?.handedness === "twoHanded"
  ) {
    equipment[EQUIPMENT_SLOTS.mainHand] = null;
  }

  equipment[slot] = item;
  return { ok: true };
};
