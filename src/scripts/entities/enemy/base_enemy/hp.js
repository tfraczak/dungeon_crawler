import Random from "@utils/random";

export const rollHp = (cfg, type) => {
  const baseHp = cfg.typeHp?.[type] ?? cfg.hp;
  const variance = cfg.hpVariance ?? 0;
  return Math.max(1, Math.round(baseHp * Random.range(1 - variance, 1 + variance)));
};
