import * as GAME_CONFIG from "@core/game_config";

const playerSprintSpeed = GAME_CONFIG.entities.player.sprintMultiplier;

export default Object.freeze({
  hp: 70,
  // Goblins are the late-game heavyweights — they drop the most coins
  // and have a slight bump on the rare key roll. The stolen-coin
  // mechanic still adds an extra coin on death whenever the goblin
  // pickpocketed the player; that's handled separately in setupDrops.
  drops: Object.freeze([
    Object.freeze({ type: "coin", chance: 0.20 }),
    Object.freeze({ type: "hp_potion", chance: 0.08 }),
    Object.freeze({ type: "key", chance: 0.12 }),
  ]),
  baseSpeedModifier: 0.95,
  lowHpThreshold: 10,
  sprintDelayMs: 300,
  chaseSprintSpeedModifier: playerSprintSpeed * 0.93,
  fleeSprintSpeedModifier: playerSprintSpeed * 0.75,
  dagger: Object.freeze({
    range: 12,
    cooldown: 90,
    duration: 8,
  }),
  steal: Object.freeze({
    actionLockoutFrames: 14,
    attacksBetweenAttempts: 2,
    chance: 0.25,
    animationDuration: 10,
    range: 40,
  }),
  alert: Object.freeze({
    fadeFrames: 12,
  }),
  glint: Object.freeze({
    periodMs: 360,
  }),
  sweat: Object.freeze({
    periodMs: 420,
  }),
  exitBlockDistance: 96,
  playerStandoffDistance: 8,
  roomMin: 0,
  roomMax: 720,
  exitMin: 288,
  exitMax: 432,
  exits: Object.freeze({
    U: Object.freeze({ dir: "up", x: 360, y: 0, dx: 0, dy: -1 }),
    D: Object.freeze({ dir: "down", x: 360, y: 720, dx: 0, dy: 1 }),
    L: Object.freeze({ dir: "left", x: 0, y: 360, dx: -1, dy: 0 }),
    R: Object.freeze({ dir: "right", x: 720, y: 360, dx: 1, dy: 0 }),
  }),
});
