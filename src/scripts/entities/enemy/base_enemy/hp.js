import Random from "@utils/random";

export const rollHp = ({ baseHp, variance = 0 }) => {
  return Math.max(1, Math.round(baseHp * Random.range(1 - variance, 1 + variance)));
};
