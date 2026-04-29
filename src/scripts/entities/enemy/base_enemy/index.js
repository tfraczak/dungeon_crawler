import createEntity from "@entities/entity";
import * as GAME_CONFIG from "@core/game_config";
import DEV_FLAGS from "@core/dev_flags";
import { rollHp } from "./hp";
import { anchorMainColBox, setupHeadColBox } from "./collision_boxes";
import { setupAnimation } from "./animation";
import { setupCombat } from "./combat";
import { setupDrops } from "./drops";
import { setupMovement } from "./movement";
import { setupDevOverlays } from "./overlays";

const { baseSpeed: BASE_SPEED } = GAME_CONFIG.world;

function createBaseEnemy({
  pos,
  width,
  height,
  spritePalette,
  type,
  spriteGridPos,
  detectDist,
  gameState,
  options = {},
}) {
  const enemy = createEntity(pos, width, height, spritePalette, options.colBox);
  const cfg = GAME_CONFIG.entities.enemy;

  anchorMainColBox(enemy, options.colBoxAnchor);

  enemy.gameState = gameState;
  enemy.hp = DEV_FLAGS.enemyHp ?? rollHp(cfg, type);
  enemy.maxHp = enemy.hp;
  enemy.strength = cfg.strength;
  enemy.speed = BASE_SPEED * cfg.speedMultiplier;
  enemy.speedModifier = cfg.idleSpeedModifier;
  enemy.pace = 24 / enemy.speed;
  enemy.chasingPlayer = false;
  enemy.detectDist = detectDist;
  enemy.idleCount = 0;
  enemy.idleMax = cfg.idleMaxFrames;
  enemy.idlePaused = false;
  enemy.idlePauseTimer = 0;
  enemy.type = type;
  enemy.flying = options.flying ?? false;
  enemy.adjustMovement = options.adjustMovement ?? ((nx, ny) => [nx, ny]);
  enemy.forceMovement = options.forceMovement ?? (() => false);
  enemy.resolveSpriteDir = options.resolveSpriteDir ?? null;
  enemy.resolveSpeedModifier = options.resolveSpeedModifier ?? null;
  enemy.beforeWallCheck = options.beforeWallCheck ?? (() => false);
  enemy.afterMove = options.afterMove ?? (() => {});
  enemy.animationPace = options.animationPace ?? ((e) => {
    const speed = Math.max(0.0001, e.speed * e.speedModifier);
    return 24 / speed;
  });
  enemy.spriteDir = options.defaultSpriteDir ?? null;
  enemy.movement = { up: false, down: false, left: false, right: false };
  enemy.knockbackVx = 0;
  enemy.knockbackVy = 0;

  setupHeadColBox(enemy, options);
  setupAnimation(enemy, spriteGridPos);
  setupDrops(enemy, cfg, gameState);
  setupCombat(enemy, cfg);
  setupMovement(enemy, cfg);
  setupDevOverlays(enemy);

  return enemy;
}

export default createBaseEnemy;
