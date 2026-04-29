import * as GAME_CONFIG from "@core/game_config";
import createBaseEnemy from "../base_enemy/index";
import { createGoblinBehavior } from "./behavior";
import { setupGoblinDaggerCombat } from "./combat";
import { setupGoblinSweat } from "./sweat";

const BASE_SPEED_MODIFIER = 0.95;

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
    options: behavior,
  });
  goblin.speed = GAME_CONFIG.world.baseSpeed * GAME_CONFIG.entities.player.speedMultiplier * BASE_SPEED_MODIFIER;
  setupGoblinDaggerCombat(goblin, gameState);
  setupGoblinSweat(goblin);
  return goblin;
}

export default createGoblinEnemy;
