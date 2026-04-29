import createBatEnemy from "./bat/index";
import createBlobEnemy from "./blob/index";
import createGoblinEnemy from "./goblin/index";
import createSkeletonEnemy from "./skeleton/index";

const ENEMY_FACTORIES = Object.freeze({
  bat: createBatEnemy,
  blob: createBlobEnemy,
  goblin: createGoblinEnemy,
  skeleton: createSkeletonEnemy,
});

function createEnemy({ pos, width, height, spritePalette, type, detectDist, gameState }) {
  const createTypedEnemy = ENEMY_FACTORIES[type];
  if (!createTypedEnemy) {
    console.error(`Unknown enemy type: ${type}`);
    return null;
  }

  return createTypedEnemy({ pos, width, height, spritePalette, detectDist, gameState });
}

export default createEnemy;
