import createPlayer from "./player";
import createRoom from "./room";
import createCamera from "./camera";
import { SPRITE_DIMS } from "./utils/global_vars";
import GAME_CONFIG from "./game_config";

function createGame(gameState) {
  const { ctx, playerSprite } = gameState.gameOptions;
  const tile = GAME_CONFIG.world.tileSize;
  const startingPos = [tile * 7, tile * 7];

  const game = {
    fpsInterval: 1000 / GAME_CONFIG.game.fps,
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
  game.camera = gameState.isMobile ? createCamera() : null;
  game.player.draw(ctx);

  game.gameOver = () => game.win() || game.lose();
  game.win = () => gameState.session.coinCount >= GAME_CONFIG.game.winCoinCount;
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
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      game.player.move(game.room.walls);
      Object.values(game.room.enemies).forEach(enemy => enemy.move(game.room.walls));
      game.room.resolveEnemyCollisions();
      game.room.resolvePlayerEnemyCollisions(game.player);
      game.room.resolvePlayerAttack(game.player);
      game.player.wallCheck(game.room.walls);
      game.player.updateSides();
      game.room.animate();

      if (game.camera) {
        game.camera.update(game.player);
        ctx.save();
        ctx.translate(-game.camera.x, -game.camera.y);
      }

      game.room.draw(ctx, game.camera);

      const entities = game.room.allEntities(game.player);
      entities.sort((a, b) => {
        const ay = a.pos[1] + a.height;
        const by = b.pos[1] + b.height;
        if (ay !== by) return ay - by;
        return (a.pos[0] + a.width) - (b.pos[0] + b.width);
      });
      entities.forEach(entity => entity.draw(ctx));

      if (game.player.isAttacking()) {
        game.player.weapon.drawSlash(ctx, game.player.center, game.player.facing, game.player.attackTimer);
      }

      game.room.poofs.forEach(p => p.draw(ctx));

      if (game.camera) {
        ctx.restore();
      }

      game.stop();
      if (game.requestStop) {
        cancelAnimationFrame(game.requestId);
        const fontFamily = "Courier New";
        const cw = ctx.canvas.width;
        const ch = ctx.canvas.height;
        const restartMsg = gameState.isMobile ? "Tap to restart" : "Click 'Restart' up top if";
        const restartMsg2 = gameState.isMobile ? "" : "you'd like to play again";
        if (game.win()) {
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(0, 0, cw, ch);
          ctx.fillStyle = "#fffaf4";
          ctx.font = `48px ${fontFamily}`;
          ctx.fillText("Congratulations!", cw * 0.15, ch * 0.35);
          ctx.font = `24px ${fontFamily}`;
          ctx.fillText("You leave with your life,", cw * 0.22, ch * 0.45);
          ctx.fillText("and your pockets full!", cw * 0.26, ch * 0.52);
          ctx.fillText(restartMsg, cw * 0.22, ch * 0.7);
          if (restartMsg2) ctx.fillText(restartMsg2, cw * 0.24, ch * 0.76);
        }
        if (game.lose()) {
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(0, 0, cw, ch);
          ctx.fillStyle = "#fffaf4";
          ctx.font = `48px ${fontFamily}`;
          ctx.fillText("GAME OVER", cw * 0.28, ch * 0.35);
          ctx.font = `36px ${fontFamily}`;
          ctx.fillText("you lose!", cw * 0.35, ch * 0.45);
          ctx.font = `96px ${fontFamily}`;
          ctx.fillText("💀", cw * 0.44, ch * 0.65);
          ctx.font = `24px ${fontFamily}`;
          ctx.fillText(restartMsg, cw * 0.22, ch * 0.82);
          if (restartMsg2) ctx.fillText(restartMsg2, cw * 0.24, ch * 0.88);
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
