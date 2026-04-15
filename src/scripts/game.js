import createPlayer from "./player";
import createRoom from "./room";
import { SPRITE_DIMS, WIDTH, HEIGHT } from "./utils/global_vars";

function createGame(gameState) {
  const { ctx, playerSprite } = gameState.gameOptions;
  const startingPos = [48 * 7, 48 * 7];

  const game = {
    fpsInterval: 1000 / 60,
    toPlayer: 100,
    ctx,
    player: createPlayer(startingPos, ...SPRITE_DIMS, playerSprite, gameState),
  };

  gameState.session.player = game.player;
  gameState.session.rooms = {};
  gameState.session.game = game;
  gameState.session.stop = false;
  gameState.session.coinCount = 0;

  game.startingRoom = createRoom(null, gameState);
  game.room = game.startingRoom;
  game.player.draw(ctx);

  game.gameOver = () => game.win() || game.lose();
  game.win = () => gameState.session.coinCount > 9;
  game.lose = () => game.player.hp <= 0;

  game.stop = () => {
    if (game.gameOver()) {
      game.requestStop = true;
    }
  };

  game.gameStep = () => {
    game.requestId = requestAnimationFrame(game.gameStep);
    let now = Date.now();
    let elapsed = now - game.then;

    if (elapsed > game.fpsInterval) {
      game.then = now - (elapsed % game.fpsInterval);
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      game.player.move(game.room.walls);
      Object.values(game.room.enemies).forEach(enemy => enemy.move(game.room.walls));
      game.room.animate();
      game.room.draw(ctx);
      game.player.draw(ctx);
      game.stop();
      if (game.requestStop) {
        cancelAnimationFrame(game.requestId);
        const fontFamily = "Courier New";
        if (game.win()) {
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(0, 0, 720, 720);
          ctx.fillStyle = "#fffaf4";
          ctx.font = `48px ${fontFamily}`;
          ctx.fillText("Congratulations!", 48 * 3, 48 * 4);
          ctx.font = `24px ${fontFamily}`;
          ctx.fillText("You leave with your life,", 48 * 4, 48 * 5);
          ctx.fillText("and your pockets full!", 48 * 4.5, 48 * 5.5);
          ctx.fillText("Click 'Restart' up top if", 48 * 4, 48 * 7);
          ctx.fillText("you'd like to play again", 48 * 4.2, 48 * 7.5);
        }
        if (game.lose()) {
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(0, 0, 720, 720);
          ctx.fillStyle = "#fffaf4";
          ctx.font = `48px ${fontFamily}`;
          ctx.fillText("GAME OVER", 48 * 4.75, 48 * 4);
          ctx.font = `36px ${fontFamily}`;
          ctx.fillText("you lose!", 48 * 5.65, 48 * 5);
          ctx.font = `96px ${fontFamily}`;
          ctx.fillText("💀", 48 * 6.25, 48 * 7);
          ctx.font = `24px ${fontFamily}`;
          ctx.fillText("Click 'Restart' up top if", 48 * 4, 48 * 9);
          ctx.fillText("you'd like to play again", 48 * 4.2, 48 * 9.5);
        }
        return;
      }
    }
  };

  game.play = () => {
    game.then = Date.now();
    game.gameStep();
  };

  game.play();

  return game;
}

export default createGame;
