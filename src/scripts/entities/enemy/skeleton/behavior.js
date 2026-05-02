import { boxesOverlap } from "@entities/enemy/base_enemy/collision_boxes";
import DEV_FLAGS, { configValue } from "@core/dev_flags";
import SKELETON_CONFIG from "./config";

const directionToward = (from, to) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  if (Math.abs(dy) > Math.abs(dx)) return dy < 0 ? "up" : "down";
  return dx < 0 ? "left" : "right";
};
const playerBodyTarget = player => player.colBox.center ?? player.center;
const { lineOfSight: LINE_OF_SIGHT_CONFIG } = SKELETON_CONFIG;

const colBoxAtCenter = (enemy, center) => ({
  pos: [
    center[0] - (enemy.colBox.width / 2),
    center[1] - (enemy.colBox.height / 2),
  ],
  width: enemy.colBox.width,
  height: enemy.colBox.height,
});

const distanceBetween = (from, to) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  return Math.sqrt((dx * dx) + (dy * dy));
};

export const createSkeletonBehavior = () => {
  const magicCfg = SKELETON_CONFIG.magic;
  const castDistance = () => configValue({
    value: magicCfg.castDistance,
    override: DEV_FLAGS.skeletonCastDistance,
  });
  let strafeDir = 1;
  let strafeTimer = 0;

  const lineOfSightStrafe = (enemy, player, speed) => {
    strafeTimer--;
    if (strafeTimer <= 0) {
      strafeDir *= -1;
      strafeTimer = LINE_OF_SIGHT_CONFIG.strafeFrames;
    }

    const target = playerBodyTarget(player);
    const dx = target[0] - enemy.center[0];
    const dy = target[1] - enemy.center[1];
    const dist = Math.sqrt((dx * dx) + (dy * dy)) || 1;
    const towardX = dx / dist;
    const towardY = dy / dist;
    const moveX = (
      (-towardY * strafeDir * LINE_OF_SIGHT_CONFIG.strafeWeight)
      + (towardX * LINE_OF_SIGHT_CONFIG.towardWeight)
    );
    const moveY = (
      (towardX * strafeDir * LINE_OF_SIGHT_CONFIG.strafeWeight)
      + (towardY * LINE_OF_SIGHT_CONFIG.towardWeight)
    );
    const moveDist = Math.sqrt((moveX * moveX) + (moveY * moveY)) || 1;

    return [
      (moveX / moveDist) * speed,
      (moveY / moveDist) * speed,
    ];
  };

  const candidateIsWalkable = (enemy, center) => {
    const colBox = colBoxAtCenter(enemy, center);
    return !enemy.room?.walls?.some(wall => boxesOverlap(colBox, wall));
  };

  const findCastPosition = (enemy, player) => {
    const blockedCenter = enemy.blockedCastCenter;
    const currentCenterIsBlocked = (
      blockedCenter
      && distanceBetween(enemy.center, blockedCenter) < LINE_OF_SIGHT_CONFIG.blockedCastCenterRadius
    );
    if (!currentCenterIsBlocked && enemy.canCastFromCenter?.(enemy.center, player)) return enemy.center;
    let best = null;

    LINE_OF_SIGHT_CONFIG.castPositionSampleDistances.forEach((sampleDistance) => {
      LINE_OF_SIGHT_CONFIG.castPositionDirections.forEach(([dirX, dirY]) => {
        const candidate = [
          enemy.center[0] + (dirX * sampleDistance),
          enemy.center[1] + (dirY * sampleDistance),
        ];
        if (blockedCenter && distanceBetween(candidate, blockedCenter) < LINE_OF_SIGHT_CONFIG.blockedCastCenterRadius) return;
        if (!candidateIsWalkable(enemy, candidate)) return;
        if (!enemy.canCastFromCenter?.(candidate, player)) return;

        const target = playerBodyTarget(player);
        const castDistanceDelta = Math.abs(distanceBetween(candidate, target) - castDistance());
        const score = sampleDistance + (castDistanceDelta * 0.2);
        if (!best || score < best.score) best = { center: candidate, score };
      });
    });

    return best?.center ?? null;
  };

  const moveTowardPosition = (enemy, target, speed) => {
    const dx = target[0] - enemy.center[0];
    const dy = target[1] - enemy.center[1];
    const moveDist = Math.sqrt((dx * dx) + (dy * dy)) || 1;

    return [
      (dx / moveDist) * speed,
      (dy / moveDist) * speed,
    ];
  };

  const adjustMovement = (nx, ny, _speed, enemy) => {
    if (enemy.isCasting?.()) return [0, 0];
    if (!enemy.chasingPlayer) return [nx, ny];
    if (enemy.distToPlayer() <= castDistance()) {
      const player = enemy.gameState.session.player;
      enemy.repositioningForLineOfSight = true;
      const castPosition = findCastPosition(enemy, player);
      if (!castPosition) return lineOfSightStrafe(enemy, player, _speed);
      if (castPosition === enemy.center) return [0, 0];
      if (
        enemy.blockedCastCenter
        && distanceBetween(enemy.center, enemy.blockedCastCenter) >= LINE_OF_SIGHT_CONFIG.blockedCastCenterRadius
      ) {
        enemy.blockedCastCenter = null;
      }
      return moveTowardPosition(enemy, castPosition, _speed);
    }
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
