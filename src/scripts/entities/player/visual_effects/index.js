import { drawBiteEffects, setupBiteEffect, updateBiteEffects } from "./bite";
import { drawBlobHitEffects, setupBlobHitEffect, updateBlobHitEffects } from "./blob_hit";

const setupPlayerVisualEffects = (player) => {
  setupBiteEffect(player);
  setupBlobHitEffect(player);

  return {
    update: () => {
      updateBiteEffects(player);
      updateBlobHitEffects(player);
    },

    draw: (ctx) => {
      drawBlobHitEffects(ctx, player);
      drawBiteEffects(ctx, player);
    },
  };
};

export default setupPlayerVisualEffects;
