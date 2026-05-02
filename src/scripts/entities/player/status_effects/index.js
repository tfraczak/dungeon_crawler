import {
  applyColdSpeedModifier,
  drawColdStatus,
  setupColdStatus,
  updateColdStatus,
} from "./cold";
import {
  applyPoisonMovementDrift,
  applyPoisonSpeedModifier,
  drawPoisonStatus,
  poisonStaminaDrainMultiplier,
  setupPoisonStatus,
  updatePoisonStatus,
} from "./poison";
import makeMask from "./mask";

const setupPlayerStatusEffects = (player) => {
  const cold = makeMask(player);
  const poison = makeMask(player);

  setupColdStatus(player);
  setupPoisonStatus(player);

  return {
    update: () => {
      updateColdStatus(player);
      updatePoisonStatus(player);
    },

    applySpeedModifiers: () => {
      applyColdSpeedModifier(player);
      applyPoisonSpeedModifier(player);
    },

    staminaDrainMultiplier: () => poisonStaminaDrainMultiplier(player),

    applyMovementDrift: (up, down, left, right) => applyPoisonMovementDrift(player, up, down, left, right),

    draw: (ctx) => {
      drawColdStatus(ctx, player, cold);
      drawPoisonStatus(ctx, player, poison);
    },
  };
};

export default setupPlayerStatusEffects;
