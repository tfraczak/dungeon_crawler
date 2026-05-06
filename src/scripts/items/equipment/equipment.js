import createItem from "@items/item";

function createEquipment({
  id,
  name,
  description,
  slot,
  equipmentKind = "equipment",
  compatibleSlots = slot ? [slot] : [],
  icon = null,
}) {
  const equipment = createItem({ name, description });
  equipment.id = id;
  equipment.slot = slot;
  equipment.equipmentKind = equipmentKind;
  equipment.compatibleSlots = compatibleSlots;
  equipment.icon = icon;
  return equipment;
}

export default createEquipment;
