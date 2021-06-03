export const WIDTH = 720;
export const HEIGHT = 720;
export const SPRITE_DIMS = [48,48];
export const FPS = 1000/60;
export const KEYS = {
  87: false, // W
  65: false, // A
  83: false, // S
  68: false, // D
  16: false, // L-Shift
};
export const ROOMS = {};

export const SESSION = {};

export const POSSIBLE_PATHS = {
  "up":{
    "1": "U",
    "2": [
      "UL",
      "UD",
      "UR",
    ],
    "3": [
      "ULD",
      "ULR",
      "UDR",
    ],
    "4": "ULDR",
  },
  "down": {
    "1": "D",
    "2": [
      "LD",
      "UD",
      "DR",
    ],
    "3": [
      "ULD",
      "LDR",
      "UDR",
    ],
    "4": "ULDR",
  },
  "left": {
    "1": "L",
    "2": [
      "UL",
      "LD",
      "LR",
    ],
    "3": [
      "ULD",
      "ULR",
      "LDR",
    ],
    "4": "ULDR",
  },
  "right": {
    "1": "R",
    "2": [
      "LR",
      "DR",
      "UR",
    ],
    "3": [
      "LDR",
      "ULR",
      "UDR",
    ],
    "4": "ULDR",
  },
};
