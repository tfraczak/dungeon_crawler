// Procedural bubbles inside the liquid. Each picks a random column and rises
// from yBottom to yTop over a randomized lifetime, then respawns. Coordinates
// are in source-pixel space within the 32x32 sprite.
//
// Procedural red heal crosses drifting up either side. Each spawn picks a
// random side, slight column jitter, and an independent lifetime so the two
// never sync up. Column/row ranges are tuned to hug the widest-body edges of
// the bottle (x=8..23 at y=16..24) -- the plus shape is +/-1 px around the
// center, so these values leave just a 1-2 px gap from the glass outline for
// the bulk of the rise.
export default Object.freeze({
  bubble: {
    colMin: 10,
    colRange: 12,
    count: 2,
    delayRand: 30,
    lifeMin: 30,
    lifeRand: 30,
    yBottom: 26,
    yTop: 17,
  },
  cross: {
    count: 2,
    delayRand: 40,
    leftXMin: 5,
    lifeMin: 36,
    lifeRand: 30,
    rightXMin: 25,
    xJitter: 2,
    yBottom: 25,
    yTop: 8,
  },
  healAmount: 5,
});
