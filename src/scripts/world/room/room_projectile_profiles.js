import * as GAME_CONFIG from "@core/game_config";

const TILE_SIZE = GAME_CONFIG.world.tileSize;
const ROOM_SIZE = TILE_SIZE * 15;
export const DOORWAY_START = TILE_SIZE * 6;
export const DOORWAY_END = TILE_SIZE * 9;

const FULL_SIDE_SPAN = Object.freeze([Object.freeze([0, ROOM_SIZE])]);
const TOP_LEFT_SPAN = Object.freeze([Object.freeze([0, DOORWAY_START])]);
const TOP_RIGHT_SPAN = Object.freeze([Object.freeze([DOORWAY_END, ROOM_SIZE])]);
const BOTTOM_LEFT_SPAN = Object.freeze([Object.freeze([0, DOORWAY_START])]);
const BOTTOM_RIGHT_SPAN = Object.freeze([Object.freeze([DOORWAY_END, ROOM_SIZE])]);
const LEFT_TOP_SPAN = Object.freeze([Object.freeze([0, DOORWAY_START])]);
const LEFT_BOTTOM_SPAN = Object.freeze([Object.freeze([DOORWAY_END, ROOM_SIZE])]);
const RIGHT_TOP_SPAN = Object.freeze([Object.freeze([0, DOORWAY_START])]);
const RIGHT_BOTTOM_SPAN = Object.freeze([Object.freeze([DOORWAY_END, ROOM_SIZE])]);
const RIGHT_TOP_AND_BOTTOM_SPANS = Object.freeze([
  ...RIGHT_TOP_SPAN,
  ...RIGHT_BOTTOM_SPAN,
]);

export const PROJECTILE_PASSABILITY_PROFILES = Object.freeze({
  "1D0": Object.freeze({ mode: "perimeter" }),
  "1D1": Object.freeze({ mode: "none" }),
  "1D2": Object.freeze({ mode: "perimeter" }),
  "1L0": Object.freeze({ mode: "perimeter" }),
  "1L1": Object.freeze({ mode: "none" }),
  "1L2": Object.freeze({ mode: "perimeter" }),
  "1R0": Object.freeze({ mode: "none" }),
  "1R1": Object.freeze({ mode: "none" }),
  "1R2": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U"]) }),
  "1U0": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U"]) }),
  "1U1": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U"]) }),
  "1U2": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U"]) }),
  "2DL0": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      D: BOTTOM_LEFT_SPAN,
      L: LEFT_BOTTOM_SPAN,
    }),
  }),
  "2DL1": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: FULL_SIDE_SPAN,
      D: FULL_SIDE_SPAN,
      L: LEFT_BOTTOM_SPAN,
    }),
  }),
  "2DL2": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: FULL_SIDE_SPAN,
      L: LEFT_TOP_SPAN,
    }),
  }),
  "2DR0": Object.freeze({ mode: "perimeter" }),
  "2DR1": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: FULL_SIDE_SPAN,
      L: FULL_SIDE_SPAN,
      R: RIGHT_TOP_SPAN,
      D: BOTTOM_LEFT_SPAN,
    }),
  }),
  "2DR2": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      L: FULL_SIDE_SPAN,
      D: BOTTOM_LEFT_SPAN,
    }),
  }),
  "2DU0": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U"]) }),
  "2DU1": Object.freeze({ mode: "perimeter" }),
  "2DU2": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U"]) }),
  "2LR0": Object.freeze({ mode: "perimeter" }),
  "2LR1": Object.freeze({ mode: "perimeter" }),
  "2LR2": Object.freeze({ mode: "none" }),
  "2LU0": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: TOP_LEFT_SPAN,
      L: LEFT_TOP_SPAN,
    }),
  }),
  "2LU1": Object.freeze({ mode: "perimeter" }),
  "2LU2": Object.freeze({ mode: "none" }),
  "2RU0": Object.freeze({ mode: "perimeter" }),
  "2RU1": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: FULL_SIDE_SPAN,
      R: RIGHT_TOP_SPAN,
    }),
  }),
  "2RU2": Object.freeze({ mode: "perimeter" }),
  "3DLR0": Object.freeze({ mode: "sides", hardSides: Object.freeze(["D"]) }),
  "3DLR1": Object.freeze({ mode: "perimeter" }),
  "3DLR2": Object.freeze({ mode: "perimeter" }),
  "3DLU0": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U", "L"]) }),
  "3DLU1": Object.freeze({ mode: "perimeter" }),
  "3DLU2": Object.freeze({ mode: "perimeter" }),
  "3DRU0": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: TOP_RIGHT_SPAN,
      R: RIGHT_TOP_AND_BOTTOM_SPANS,
      D: BOTTOM_RIGHT_SPAN,
    }),
  }),
  "3DRU1": Object.freeze({ mode: "perimeter" }),
  "3DRU2": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: TOP_RIGHT_SPAN,
      R: RIGHT_TOP_AND_BOTTOM_SPANS,
      D: BOTTOM_RIGHT_SPAN,
    }),
  }),
  "3LRU0": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: FULL_SIDE_SPAN,
      L: LEFT_TOP_SPAN,
    }),
  }),
  "3LRU1": Object.freeze({ mode: "perimeter" }),
  "3LRU2": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: FULL_SIDE_SPAN,
      L: LEFT_TOP_SPAN,
      R: RIGHT_TOP_SPAN,
    }),
  }),
  "4DLRU0": Object.freeze({
    mode: "sideSpans",
    hardSideSpans: Object.freeze({
      U: FULL_SIDE_SPAN,
      L: LEFT_TOP_SPAN,
      R: RIGHT_TOP_SPAN,
    }),
  }),
  "4DLRU1": Object.freeze({ mode: "sides", hardSides: Object.freeze(["U"]) }),
  "4DLRU2": Object.freeze({ mode: "perimeter" }),
});
