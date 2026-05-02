import * as GAME_CONFIG from "@core/game_config";
import createBaseEnemy from "../base_enemy/index";
import { createGoblinBehavior } from "./behavior";
import GOBLIN_CONFIG from "./config";
import { setupGoblinDaggerCombat } from "./combat";
import { setupGoblinStealVisuals } from "./steal_visuals";
import { setupGoblinSweat } from "./sweat";

function createGoblinEnemy({ pos, width, height, spritePalette, detectDist, gameState }) {
  const behavior = createGoblinBehavior();

  const goblin = createBaseEnemy({
    pos,
    width,
    height,
    spritePalette,
    type: "goblin",
    spriteGridPos: { row: 0, column: 2 },
    detectDist,
    gameState,
    options: {
      ...behavior,
      hp: GOBLIN_CONFIG.hp,
    },
  });
  goblin.speed = GAME_CONFIG.world.baseSpeed * GAME_CONFIG.entities.player.speedMultiplier * GOBLIN_CONFIG.baseSpeedModifier;
  setupGoblinDaggerCombat(goblin, gameState);
  setupGoblinSweat(goblin);
  setupGoblinStealVisuals(goblin);
  return goblin;
}

export default createGoblinEnemy;
