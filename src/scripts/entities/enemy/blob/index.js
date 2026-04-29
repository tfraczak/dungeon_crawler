import createBaseEnemy from "../base_enemy/index";

function createBlobEnemy({ pos, width, height, spritePalette, detectDist, gameState }) {
  return createBaseEnemy({
    pos,
    width,
    height,
    spritePalette,
    type: "blob",
    spriteGridPos: { row: 0, column: 1 },
    detectDist,
    gameState,
  });
}

export default createBlobEnemy;
