import createItem from "@items/item";

function createEquipment({ name, description, slot }) {
  const equipment = createItem({ name, description });
  equipment.slot = slot;
  return equipment;
}

export default createEquipment;
