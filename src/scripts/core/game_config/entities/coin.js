// Sprite frames are 16x16 on the sheet; rendered slightly larger so the
// coin reads better against floor tiles. Collision/drop physics still use
// the 16x16 entity size.
//
// Procedural sparkle pool per coin. Each sparkle picks a random angle
// around the coin and a random lifetime, then respawns on death so the
// twinkle positions never repeat. Radii are measured from the coin's
// logical center (frameSize/2) in source pixels; the rendered coin's
// visual edge sits around radius 9 (silhouette radius 7 * 1.25 render
// scale), so the radii here hug that edge with only a small outward halo.
export default Object.freeze({
  frameInterval: 12,
  renderSize: 20,
  sparkle: {
    count: 3,
    lifeMin: 24,
    lifeRand: 36,
    radiusMin: 7,
    radiusRand: 3,
  },
  spawn: {
    excludeMax: 384,
    excludeMin: 336,
    max: 656,
    min: 64,
  },
});
