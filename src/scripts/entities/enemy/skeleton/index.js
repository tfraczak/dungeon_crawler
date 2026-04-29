import createBaseEnemy from "../base_enemy/index";
import { createSkeletonBehavior } from "./behavior";
import { setupSkeletonMagicCombat } from "./combat";

function createSkeletonEnemy({ pos, width, height, spritePalette, detectDist, gameState }) {
  const behavior = createSkeletonBehavior();
  const skeleton = createBaseEnemy({
    pos,
    width,
    height,
    spritePalette,
    type: "skeleton",
    spriteGridPos: { row: 1, column: 1 },
    detectDist,
    gameState,
    options: behavior,
  });
  setupSkeletonMagicCombat(skeleton);
  return skeleton;
}

export default createSkeletonEnemy;
