import * as GAME_CONFIG from "@core/game_config";

const WALL_THICKNESS = GAME_CONFIG.world.tileSize;
const ROOM_SIZE = WALL_THICKNESS * 15;

const overlapsRange = ([aMin, aMax], [bMin, bMax]) => aMax > bMin && aMin < bMax;

const wallSideFor = (blocker) => {
  if (blocker.pos[1] === 0 && blocker.height === WALL_THICKNESS) return "U";
  if (blocker.pos[1] + blocker.height === ROOM_SIZE && blocker.height === WALL_THICKNESS) return "D";
  if (blocker.pos[0] === 0 && blocker.width === WALL_THICKNESS) return "L";
  if (blocker.pos[0] + blocker.width === ROOM_SIZE && blocker.width === WALL_THICKNESS) return "R";
  return null;
};

const impactForSide = (projectile, blocker, side) => {
  const box = projectile.colBox;
  const boxX = [box.pos[0], box.pos[0] + box.width];
  const boxY = [box.pos[1], box.pos[1] + box.height];
  const blockerX = [blocker.pos[0], blocker.pos[0] + blocker.width];
  const blockerY = [blocker.pos[1], blocker.pos[1] + blocker.height];

  switch (side) {
    case "U": {
      const boundaryY = blocker.pos[1] + blocker.height;
      if (box.pos[1] + box.height > boundaryY || !overlapsRange(boxX, blockerX)) return null;
      return { point: [box.center[0], boundaryY], side };
    }
    case "D": {
      const boundaryY = blocker.pos[1];
      if (box.pos[1] + box.height < boundaryY || !overlapsRange(boxX, blockerX)) return null;
      return { point: [box.center[0], boundaryY], side };
    }
    case "L": {
      const boundaryX = blocker.pos[0] + blocker.width;
      if (box.center[0] > boundaryX || !overlapsRange(boxY, blockerY)) return null;
      return { point: [boundaryX, box.center[1]], side };
    }
    case "R": {
      const boundaryX = blocker.pos[0];
      if (box.center[0] < boundaryX || !overlapsRange(boxY, blockerY)) return null;
      return { point: [boundaryX, box.center[1]], side };
    }
    default:
      return null;
  }
};

export const projectileBlockerImpact = (projectile, room) => {
  const blockers = room.map?.projectile?.blockers ?? room.map?.projectileBlockers ?? [];
  for (const blocker of blockers) {
    const side = wallSideFor(blocker);
    const impact = impactForSide(projectile, blocker, side);
    if (impact) return { ...impact, blocker };
  }
  return null;
};

export const hitsProjectileBlocker = (projectile, room) => projectileBlockerImpact(projectile, room) !== null;
