// Player can hold a small fixed number of keys at once. The cap is the
// hard limit enforced both at pickup (`key.collect`) and at the dev-only
// "+1 key" grant. Dropped keys that the player can't pick up just stay in
// the room until they spend one.
//
// Per-enemy drop chances live on each enemy type's config alongside its
// other drops (see `src/scripts/entities/enemy/<type>/config.js`).
export default Object.freeze({
  maxKeys: 3,
});
