import createBaseEnemy from "../base_enemy/index";
import BLOB_CONFIG from "./config";
import { playBlobAttackHit } from "./sound";

function createBlobEnemy({ pos, width, height, spritePalette, detectDist, gameState }) {
  const blob = createBaseEnemy({
    pos,
    width,
    height,
    spritePalette,
    type: "blob",
    spriteGridPos: { row: 0, column: 1 },
    detectDist,
    gameState,
    options: {
      hp: BLOB_CONFIG.hp,
    },
  });
  blob.onPlayerHit = (player, { hitCenter }) => {
    playBlobAttackHit();
    player.showBlobHit?.(hitCenter, BLOB_CONFIG.hitEffect);
  };
  return blob;
}

export default createBlobEnemy;
