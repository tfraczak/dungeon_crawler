import createEntity from "@entities/entity";
import playHpPotionSound, { playHpPotionDrop } from "@entities/hp_potion/sound";
import applyDropBehavior from "@effects/drop";

let equipmentPickupIdCounter = 0;

function createEquipmentPickup(pos, item, gameState) {
  const pickup = createEntity(pos, 32, 32, item.icon, { width: 26, height: 26 });
  pickup.id = `equipment_${equipmentPickupIdCounter++}`;
  pickup.item = item;
  pickup.gameState = gameState;
  pickup.colBoxHook = () => [
    pickup.pos[0] + ((pickup.width - pickup.colBox.width) / 2),
    pickup.pos[1] + ((pickup.height - pickup.colBox.height) / 2),
  ];

  applyDropBehavior(pickup, playHpPotionDrop);

  pickup.draw = (ctx) => {
    const dz = pickup.dropping ? pickup.dropZ : 0;
    if (pickup.item.icon?.complete) {
      ctx.drawImage(pickup.item.icon, pickup.pos[0] - 8, pickup.pos[1] - 8 - dz, 48, 48);
    } else {
      ctx.fillStyle = "#cfd7e6";
      ctx.fillRect(pickup.pos[0] + 6, pickup.pos[1] + 6 - dz, 20, 20);
    }
    pickup.colBox.centerOnEntity();
    pickup.colBox.draw(ctx);
  };

  pickup.collect = () => {
    if (pickup.dropping) return false;
    const player = pickup.gameState.session.player;
    if (
      pickup.collidedOnSide("top", player) ||
      pickup.collidedOnSide("bottom", player) ||
      pickup.collidedOnSide("left", player) ||
      pickup.collidedOnSide("right", player)
    ) {
      player.addInventoryItem(pickup.item);
      playHpPotionSound({ root: 420 });
      return true;
    }
    return false;
  };

  pickup.animate = (room) => {
    if (pickup.dropping) pickup.updateDrop(room);
  };

  return pickup;
}

export default createEquipmentPickup;
