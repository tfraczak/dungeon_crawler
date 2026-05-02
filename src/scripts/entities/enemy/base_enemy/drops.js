import createCoin from "@entities/coin/coin";
import createHpPotion from "@entities/hp_potion/hp_potion";
import Random from "@utils/random";
import DEV_FLAGS, { configValue } from "@core/dev_flags";

const createDroppedCoin = (enemy, gameState) => {
  const coin = createCoin(
    [enemy.center[0] - 8, enemy.center[1] - 8],
    16, 16, gameState.sprites.coin, gameState,
  );
  coin.startDrop(enemy.center[0], enemy.center[1]);
  return coin;
};

export const setupDrops = (enemy, cfg, gameState) => {
  // Roll each drop table entry. Dev flags can replace chance rolls or force counts.
  enemy.drop = () => {
    const items = { coins: [], hpPotions: [] };
    const forced = DEV_FLAGS.enemyForcedDropCount;
    const useForced = typeof forced === "number" && Number.isFinite(forced);
    let baseCount = 0;
    let bonusChance = 0;
    if (useForced) {
      const f = Math.max(0, forced);
      baseCount = Math.floor(f);
      bonusChance = f - baseCount;
    }

    for (const drop of cfg.drops) {
      let count;
      if (useForced) {
        count = baseCount + (Random.chance(bonusChance) ? 1 : 0);
      } else {
        const dropChance = configValue({ value: drop.chance, override: DEV_FLAGS.enemyItemDropRate });
        count = Random.chance(dropChance) ? 1 : 0;
      }

      for (let r = 0; r < count; r++) {
        if (drop.type === "coin") {
          items.coins.push(createDroppedCoin(enemy, gameState));
        } else if (drop.type === "hp_potion") {
          const potion = createHpPotion(
            [enemy.center[0] - 16, enemy.center[1] - 16],
            32, 32, gameState.sprites.hpPotion, gameState,
          );
          potion.startDrop(enemy.center[0], enemy.center[1]);
          items.hpPotions.push(potion);
        }
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
