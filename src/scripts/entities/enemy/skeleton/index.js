import createBaseEnemy from "../base_enemy/index";
import { createSkeletonBehavior } from "./behavior";
import SKELETON_CONFIG from "./config";
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
    gameState,
    detectDist: detectDist * SKELETON_CONFIG.detectDistanceMultiplier,
    options: {
      ...behavior,
      hp: SKELETON_CONFIG.hp,
      drops: SKELETON_CONFIG.drops,
    },
  });
  setupSkeletonMagicCombat(skeleton);
  return skeleton;
}

export default createSkeletonEnemy;
