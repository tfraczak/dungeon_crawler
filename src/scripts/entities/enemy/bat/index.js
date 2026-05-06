import createBaseEnemy from "../base_enemy/index";
import createErraticFlight from "./movement";
import * as GAME_CONFIG from "@core/game_config";
import Random from "@utils/random";
import BAT_CONFIG from "./config";
import { playBatBite } from "./sound";

function createBatEnemy({ pos, width, height, spritePalette, detectDist, gameState }) {
  const bat = createBaseEnemy({
    pos,
    width,
    height,
    spritePalette,
    type: "bat",
    spriteGridPos: { row: 0, column: 0 },
    detectDist,
    gameState,
    options: {
      hp: BAT_CONFIG.hp,
      drops: BAT_CONFIG.drops,
      colBox: BAT_CONFIG.colBox,
      colBoxAnchor: "center",
      flying: true,
      adjustMovement: createErraticFlight(),
      defaultSpriteDir: "down",
      animationPace: (enemy) => {
        if (!enemy.alive()) return BAT_CONFIG.animationPace.dead;
        return enemy.chasingPlayer ? BAT_CONFIG.animationPace.chase : BAT_CONFIG.animationPace.idle;
      },
    },
  });
  bat.speed = GAME_CONFIG.world.baseSpeed * GAME_CONFIG.entities.enemy.speedMultiplier * BAT_CONFIG.speedModifier;
  bat.onPlayerHit = (player, { hitCenter }) => {
    playBatBite();
    player.showBiteMark?.(hitCenter, BAT_CONFIG.bite);
    if (Random.chance(BAT_CONFIG.poison.chance)) {
      player.applyPoison?.(BAT_CONFIG.poison);
    }
  };
  return bat;
}

export default createBatEnemy;
