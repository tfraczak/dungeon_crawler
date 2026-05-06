import createCoin from "@entities/coin/coin";
import createHpPotion from "@entities/hp_potion/hp_potion";
import createKey from "@entities/key/key";
import Random from "@utils/random";
import DEV_FLAGS, { configValue } from "@core/dev_flags";

// Drop tables now live on each enemy type's config (see
// `src/scripts/entities/enemy/<type>/config.js`). Each entry is
// `{ type: "coin" | "hp_potion" | "key", chance: <0..1> }` and rolls
// once per kill for 0 or 1 of that item. To make an enemy drop more than
// one of something, add multiple entries with the desired chance per roll
// — there's no count-range field on purpose, so the table reads as a flat
// list of independent rolls.
//
// `enemyForcedDropCount` (dev flag) bypasses chance entirely and drops
// `floor(N)` of EVERY entry plus a probabilistic top-up — handy for
// stress-testing pickup logic without re-rolling kills.
//
// The goblin "stolen coin" mechanic is handled separately at the bottom
// of `enemy.drop`: it's not a drop chance, it's a guaranteed return of
// whatever the goblin pickpocketed off the player.

const createDroppedCoin = (enemy, gameState) => {
  const coin = createCoin(
    [enemy.center[0] - 8, enemy.center[1] - 8],
    16, 16, gameState.sprites.coin, gameState,
  );
  coin.startDrop(enemy.center[0], enemy.center[1]);
  return coin;
};

const createDroppedHpPotion = (enemy, gameState) => {
  const potion = createHpPotion(
    [enemy.center[0] - 16, enemy.center[1] - 16],
    32, 32, gameState.sprites.hpPotion, gameState,
  );
  potion.startDrop(enemy.center[0], enemy.center[1]);
  return potion;
};

const createDroppedKey = (enemy, gameState) => {
  const key = createKey([enemy.center[0] - 12, enemy.center[1] - 12], gameState);
  key.startDrop(enemy.center[0], enemy.center[1]);
  return key;
};

// Map each drop entry's `type` to (a) the factory that builds the world
// entity and (b) the bucket on the returned items dict that the room
// pickup loop reads. Adding a new drop type is "create the factory + add
// an entry here + add the bucket to the items dict literal below."
const DROP_FACTORIES = Object.freeze({
  coin: Object.freeze({ factory: createDroppedCoin, bucket: "coins" }),
  hp_potion: Object.freeze({ factory: createDroppedHpPotion, bucket: "hpPotions" }),
  key: Object.freeze({ factory: createDroppedKey, bucket: "keys" }),
});

export const setupDrops = (enemy, drops, gameState) => {
  enemy.drop = () => {
    const items = { coins: [], hpPotions: [], keys: [] };
    const forced = DEV_FLAGS.enemyForcedDropCount;
    const useForced = typeof forced === "number" && Number.isFinite(forced);
    let baseCount = 0;
    let bonusChance = 0;
    if (useForced) {
      const f = Math.max(0, forced);
      baseCount = Math.floor(f);
      bonusChance = f - baseCount;
    }

    for (const drop of drops ?? []) {
      const factoryEntry = DROP_FACTORIES[drop.type];
      if (!factoryEntry) continue;

      let count;
      if (useForced) {
        count = baseCount + (Random.chance(bonusChance) ? 1 : 0);
      } else {
        const dropChance = configValue({ value: drop.chance, override: DEV_FLAGS.enemyItemDropRate });
        count = Random.chance(dropChance) ? 1 : 0;
      }

      for (let r = 0; r < count; r++) {
        items[factoryEntry.bucket].push(factoryEntry.factory(enemy, gameState));
      }
    }

    if (enemy.hasStolenCoin) {
      items.coins.push(createDroppedCoin(enemy, gameState));
      enemy.hasStolenCoin = false;
      enemy.stolenCoinTargetId = null;
      enemy.coinAlertActive = false;
    }
    return items;
  };
};
