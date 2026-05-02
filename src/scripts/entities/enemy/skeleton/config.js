export default Object.freeze({
  hp: 40,
  staff: Object.freeze({
    length: 28,
    angleOffset: Math.PI / 4,
    slashAngle: -Math.PI / 4,
    backslashAngle: -3 * Math.PI / 4,
  }),
  magic: Object.freeze({
    castCooldownFrames: 72,
    castDistance: 140,
    castDissipateFrames: 18,
    castInterruptedDelayFrames: 12,
    castWindupFrames: 30,
  }),
  lineOfSight: Object.freeze({
    strafeWeight: 0.35,
    towardWeight: 0.85,
    strafeFrames: 90,
    castPositionSampleDistances: Object.freeze([16, 32, 48, 64, 80]),
    blockedCastCenterRadius: 24,
    castPositionDirections: Object.freeze([
      Object.freeze([1, 0]),
      Object.freeze([-1, 0]),
      Object.freeze([0, 1]),
      Object.freeze([0, -1]),
      Object.freeze([0.707, 0.707]),
      Object.freeze([0.707, -0.707]),
      Object.freeze([-0.707, 0.707]),
      Object.freeze([-0.707, -0.707]),
    ]),
  }),
});
