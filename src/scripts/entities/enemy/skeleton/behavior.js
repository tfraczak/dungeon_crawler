import * as GAME_CONFIG from "@core/game_config";

const directionToward = (from, to) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  if (Math.abs(dy) > Math.abs(dx)) return dy < 0 ? "up" : "down";
  return dx < 0 ? "left" : "right";
};
const playerBodyTarget = player => player.colBox.center ?? player.center;

export const createSkeletonBehavior = () => {
  const magicCfg = GAME_CONFIG.entities.enemy.skeletonMagic;

  const adjustMovement = (nx, ny, _speed, enemy) => {
    if (!enemy.chasingPlayer) return [nx, ny];
    if (enemy.distToPlayer() <= magicCfg.castDistance) return [0, 0];
    return [nx, ny];
  };

  const resolveSpriteDir = (nx, ny, enemy) => {
    if (enemy.chasingPlayer) {
      const player = enemy.gameState.session.player;
      return directionToward(enemy.center, playerBodyTarget(player));
    }

    if (Math.abs(ny) > Math.abs(nx)) return ny < 0 ? "up" : "down";
    if (Math.abs(nx) > 0) return nx < 0 ? "left" : "right";
    return enemy.spriteDir;
  };

  return {
    adjustMovement,
    resolveSpriteDir,
  };
};
