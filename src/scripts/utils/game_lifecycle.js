import createGame from "../game";

export const newGame = (gameState) => {
  gameState.reset();
  createGame(gameState);
};
