import createGame from "@scripts/game";

export const newGame = (gameState) => {
  gameState.reset();
  createGame(gameState);
};
