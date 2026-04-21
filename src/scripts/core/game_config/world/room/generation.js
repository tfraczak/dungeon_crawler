// Weighted distributions used during room generation. `pathWeights[max][n]`
// is the relative weight of producing `n` exits when at most `max` are
// available. `coinCountWeights[n]` is the relative weight of spawning `n`
// coins in a freshly-generated room.
export default Object.freeze({
  coinCountWeights: {
    0: 50,
    1: 30,
    2: 8,
    3: 2,
  },
  pathWeights: {
    2: {
      1: 10,
      2: 90,
    },
    3: {
      1: 3,
      2: 20,
      3: 80,
    },
    4: {
      1: 1,
      2: 9,
      3: 45,
      4: 55,
    },
  },
});
