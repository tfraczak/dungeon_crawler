import createWall from "@world/wall";
import * as GAME_CONFIG from "@core/game_config";
import {
  DOORWAY_END,
  DOORWAY_START,
  PROJECTILE_PASSABILITY_PROFILES,
} from "./room_projectile_profiles";

const SIDES = Object.freeze(["U", "D", "L", "R"]);
const SCHEMA_VERSION = 1;

const profileKey = bgConfig => `${bgConfig.numPaths}${bgConfig.paths}${bgConfig.variantIdx}`;

const exitConfigurationFor = (paths, bgConfig) => ({
  key: profileKey(bgConfig),
  numPaths: bgConfig.numPaths,
  paths,
  variantIdx: bgConfig.variantIdx,
  exits: Object.fromEntries(SIDES.map(side => [side, paths.includes(side)])),
});

const hardWallsFor = profile => ({
  mode: profile.mode,
  sides: profile.hardSides ?? [],
  sideSpans: profile.hardSideSpans ?? {},
  customRects: profile.rects ?? [],
});

const doorwaySpanFor = (side, paths) => {
  if (!paths.includes(side)) return null;
  return [DOORWAY_START, DOORWAY_END];
};

const clipSpans = (spans, doorwaySpan) => {
  if (!doorwaySpan) return spans;
  const [doorMin, doorMax] = doorwaySpan;
  const clipped = [];

  for (const [start, end] of spans) {
    if (end <= doorMin || start >= doorMax) {
      clipped.push([start, end]);
      continue;
    }
    if (start < doorMin) clipped.push([start, doorMin]);
    if (end > doorMax) clipped.push([doorMax, end]);
  }

  return clipped.filter(([start, end]) => end > start);
};

const sideSpanToWall = (side, span, tileSize, size) => {
  const [start, end] = span;
  switch (side) {
    case "U": return createWall([start, 0], end - start, tileSize);
    case "D": return createWall([start, size - tileSize], end - start, tileSize);
    case "L": return createWall([0, start], tileSize, end - start);
    case "R": return createWall([size - tileSize, start], tileSize, end - start);
    default: return null;
  }
};

const sideSpansToWalls = (sideSpans, paths, tileSize, size) => {
  const walls = [];
  for (const [side, spans] of Object.entries(sideSpans)) {
    const doorwaySpan = doorwaySpanFor(side, paths);
    for (const span of clipSpans(spans, doorwaySpan)) {
      const wall = sideSpanToWall(side, span, tileSize, size);
      if (wall) walls.push(wall);
    }
  }
  return walls;
};

const fullSideSpans = (sides, size) => Object.fromEntries(
  sides.map(side => [side, [[0, size]]]),
);

export const buildMovementWalls = (paths) => {
  const T = GAME_CONFIG.world.tileSize;
  const S = T * 15;
  const walls = [];

  if (paths.includes("U")) {
    walls.push(createWall([0, 0], T * 6, T));
    walls.push(createWall([T * 9, 0], T * 6, T));
  } else {
    walls.push(createWall([0, 0], S, T));
  }

  if (paths.includes("D")) {
    walls.push(createWall([0, S - T], T * 6, T));
    walls.push(createWall([T * 9, S - T], T * 6, T));
  } else {
    walls.push(createWall([0, S - T], S, T));
  }

  if (paths.includes("L")) {
    walls.push(createWall([0, 0], T, T * 6));
    walls.push(createWall([0, T * 9], T, T * 6));
  } else {
    walls.push(createWall([0, 0], T, S));
  }

  if (paths.includes("R")) {
    walls.push(createWall([S - T, 0], T, T * 6));
    walls.push(createWall([S - T, T * 9], T, T * 6));
  } else {
    walls.push(createWall([S - T, 0], T, S));
  }

  return walls;
};

const projectileBlockersFor = (paths, profile) => {
  const T = GAME_CONFIG.world.tileSize;
  const S = T * 15;

  switch (profile.mode) {
    case "perimeter":
      return sideSpansToWalls(fullSideSpans(SIDES, S), paths, T, S);
    case "sides":
      return sideSpansToWalls(fullSideSpans(profile.hardSides ?? [], S), paths, T, S);
    case "sideSpans":
      return sideSpansToWalls(profile.hardSideSpans ?? {}, paths, T, S);
    case "customRects":
      return (profile.rects ?? []).map(({ x, y, width, height }) => createWall([x, y], width, height));
    case "none":
    default:
      return [];
  }
};

const createRoomMap = (paths, bgConfig) => {
  const projectileProfile = PROJECTILE_PASSABILITY_PROFILES[profileKey(bgConfig)] ?? Object.freeze({ mode: "none" });
  const projectileBlockers = projectileBlockersFor(paths, projectileProfile);

  return {
    schemaVersion: SCHEMA_VERSION,
    exitConfiguration: exitConfigurationFor(paths, bgConfig),
    hardWalls: hardWallsFor(projectileProfile),
    movementWalls: buildMovementWalls(paths),
    projectile: {
      blockers: projectileBlockers,
      profile: projectileProfile,
    },
    projectileBlockers,
    projectileProfile,
  };
};

export default createRoomMap;
