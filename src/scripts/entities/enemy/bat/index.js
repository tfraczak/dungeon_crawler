import createBaseEnemy from "../base_enemy/index";
import createErraticFlight from "./movement";
import * as GAME_CONFIG from "@core/game_config";

const BAT_SPEED_MODIFIER = 1.12;

const BAT_ANIMATION_PACE = Object.freeze({
  idle: 7,
  chase: 5,
  dead: 10,
});

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
      colBox: { width: 26, height: 20 },
      colBoxAnchor: "center",
      flying: true,
      adjustMovement: createErraticFlight(),
      defaultSpriteDir: "down",
      animationPace: (enemy) => {
        if (!enemy.alive()) return BAT_ANIMATION_PACE.dead;
        return enemy.chasingPlayer ? BAT_ANIMATION_PACE.chase : BAT_ANIMATION_PACE.idle;
      },
    },
  });
  bat.speed = GAME_CONFIG.world.baseSpeed * GAME_CONFIG.entities.enemy.speedMultiplier * BAT_SPEED_MODIFIER;
  return bat;
}

export default createBatEnemy;
