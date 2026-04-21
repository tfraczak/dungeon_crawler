import createPlayer from "@entities/player/player";
import createRoom from "@world/room/room";
import createCamera from "@core/camera";
import Random from "@utils/random";
import * as GAME_CONFIG from "@core/game_config";
import DEV_FLAGS from "@core/dev_flags";

const SPRITE_DIMS = GAME_CONFIG.entities.player.spriteDims;

// Picks the win-screen scene id for this run. The DEV_FLAGS dropdown can
// pin a specific scene for testing; otherwise we draw uniformly at random
// from `GAME_CONFIG.endScenes`. An override that doesn't match a known id
// (stale localStorage from an earlier build, etc.) silently falls back to
// random so the cinematic always has a valid scene to load.
function pickWinSceneId() {
  const scenes = GAME_CONFIG.endScenes;
  const override = DEV_FLAGS.winScene;
  if (override && scenes.includes(override)) return override;
  return Random.pick(scenes);
}

// Cover-fits `img` into the destination rect (dx, dy, dw, dh). Picks the
// largest crop of the source that matches the destination's aspect ratio
// and centers it, so the canvas is always fully painted (no letterboxing)
// at the cost of cropping the longer source axis.
function drawCover(ctx, img, dx, dy, dw, dh) {
  const sw0 = img.naturalWidth;
  const sh0 = img.naturalHeight;
  if (!sw0 || !sh0) return;
  const dr = dw / dh;
  const sr = sw0 / sh0;
  let sx, sy, sw, sh;
  if (sr > dr) {
    // Source is wider than destination — crop sides.
    sh = sh0;
    sw = sh * dr;
    sx = (sw0 - sw) / 2;
    sy = 0;
  } else {
    // Source is taller than destination — crop top/bottom.
    sw = sw0;
    sh = sw / dr;
    sx = 0;
    sy = (sh0 - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

// Renders one frame of the win screen. The same helper drives both the
// animated reveal (with sub-1.0 alphas during the fade-ins) and the static
// post-stop render (with sceneAlpha = textAlpha = 1), so the two are
// guaranteed to match pixel-for-pixel at the handoff.
function renderWinFrame(ctx, sceneImg, sceneAlpha, textAlpha, copy) {
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;

  // 1) Solid white backdrop. The climb's fade-to-white ends on this color,
  // so we keep painting it underneath the scene reveal to ensure no stale
  // gameplay frame ever leaks through if a draw is partially transparent.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, cw, ch);

  // 2) Scene image, cover-fit to the canvas, alpha-blended on top of white.
  if (sceneImg && sceneAlpha > 0) {
    ctx.save();
    ctx.globalAlpha = sceneAlpha;
    drawCover(ctx, sceneImg, 0, 0, cw, ch);
    ctx.restore();
  }

  // 3) Win copy + restart prompt over a translucent dark panel. The panel
  // gives the text consistent contrast across all four scenes (some are
  // bright skies, some are dim caves). Panel and text share `textAlpha`
  // so they fade in together.
  if (textAlpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = textAlpha;
  const fontFamily = "Courier New";
  const panelW = Math.min(cw * 0.78, 620);
  const panelH = Math.min(ch * 0.42, 320);
  const panelX = (cw - panelW) / 2;
  const panelY = (ch - panelH) / 2;
  ctx.fillStyle = "rgba(10, 10, 14, 0.62)";
  ctx.fillRect(panelX, panelY, panelW, panelH);
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(panelX, panelY, panelW, 2);
  ctx.fillRect(panelX, panelY + panelH - 2, panelW, 2);

  ctx.textAlign = "center";
  ctx.fillStyle = "#fffaf4";
  const cxText = cw / 2;
  const titleSize = Math.max(28, Math.min(48, panelW * 0.08));
  const bodySize = Math.max(16, Math.min(24, panelW * 0.038));
  ctx.font = `${titleSize}px ${fontFamily}`;
  ctx.fillText("Congratulations!", cxText, panelY + panelH * 0.24);
  ctx.font = `${bodySize}px ${fontFamily}`;
  ctx.fillText("You climbed out of the cave,", cxText, panelY + panelH * 0.45);
  ctx.fillText("pockets jingling with gold!", cxText, panelY + panelH * 0.58);
  ctx.fillStyle = "#ffd86b";
  ctx.fillText(copy.restartMsg, cxText, panelY + panelH * 0.82);
  if (copy.restartMsg2) {
    ctx.fillText(copy.restartMsg2, cxText, panelY + panelH * 0.92);
  }
  ctx.restore();
  // Reset textAlign so subsequent ad-hoc text draws (debug, etc.) aren't
  // surprised by our state mutation.
  ctx.textAlign = "start";
}

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

  // Win-condition climb cinematic state. The lifecycle is:
  //   1. Player walks onto a spawned ladder -> room.collect() calls
  //      session.startClimb(ladder), which freezes the world, snaps the
  //      player's sprite onto the ladder, and picks the win-screen scene.
  //   2. session.climbing tick lerps the player up the ladder over
  //      GAME_CONFIG.entities.ladder.climbDuration, then alpha-fades the canvas
  //      to white over GAME_CONFIG.entities.ladder.fadeDuration.
  //   3. session.winRevealing tick holds the white-out briefly, fades the
  //      chosen scene image in, then fades the win text panel in.
  //   4. When the reveal completes, `climbed` flips true. game.win() reads
  //      that flag (NOT the coin count alone) so the win screen can render.
  gameState.session.climbing = false;
  gameState.session.climbed = false;
  gameState.session.climbStart = 0;
  gameState.session.climbAnchor = null;
  gameState.session.winRevealing = false;
  gameState.session.winRevealStart = 0;
  // Picked at climb-start so a single run shows a single scene even if the
  // dev override changes mid-cinematic; an empty/invalid override falls back
  // to a uniform random pick from GAME_CONFIG.endScenes.
  gameState.session.winSceneId = null;
  gameState.session.startClimb = (ladder) => {
    const session = gameState.session;
    if (session.climbing || session.climbed) return;
    session.climbing = true;
    session.climbStart = Date.now();
    session.climbAnchor = ladder;
    session.winSceneId = pickWinSceneId();
    // Snap the player onto the ladder so the climb reads cleanly: horizontal
    // center matches the ladder (both 48 wide), feet positioned a rung
    // inside the bottom of the ladder, facing up. Cancel any in-flight
    // knockback / attack so the player can't be yanked off mid-climb.
    const player = session.player;
    player.pos[0] = ladder.pos[0];
    player.pos[1] = ladder.pos[1] + 16;
    player.knockbackVx = 0;
    player.knockbackVy = 0;
    player.attackTimer = 0;
    player.attackCooldownTimer = 0;
    player.invulnerable = 0;
    player.facing = "up";
    player.drawOptions.palY = player.stride.up.palY;
    player.drawOptions.x = player.pos[0];
    player.drawOptions.y = player.pos[1];
    player.updateSides();
  };

  game.startingRoom = createRoom(null, gameState);
  game.room = game.startingRoom;
  // Keep the contract consistent: every room gets exactly one ladder roll on
  // entry. The starting room is a guaranteed no-op (coinCount = 0 < the
  // win threshold), but routing it through the same call site as roomChange
  // means future tweaks to the spawn rules apply uniformly.
  game.startingRoom.tryRollLadder(gameState.session.coinCount);
  game.camera = gameState.isMobile ? createCamera() : null;
  game.player.draw(ctx);

  game.gameOver = () => game.win() || game.lose();
  game.win = () => gameState.session.climbed;
  game.lose = () =>
    game.player.hp <= 0
    && !gameState.session.climbing
    && !gameState.session.winRevealing
    && !gameState.session.climbed;

  game.stop = () => {
    if (game.gameOver()) {
      game.requestStop = true;
    }
  };

  game.gameStep = () => {
    game.requestId = requestAnimationFrame(game.gameStep);

    // Pause while the device is in portrait — the rotate prompt owns the
    // screen and enemies shouldn't keep pummeling the (unable-to-respond)
    // player. Reset `then` so the loop doesn't try to catch up on missed
    // frames the instant we rotate back to landscape.
    if (document.body.classList.contains("portrait")) {
      game.then = Date.now();
      return;
    }

    let now = Date.now();
    let elapsed = now - game.then;

    if (elapsed > game.fpsInterval) {
      game.then = now - (elapsed % game.fpsInterval);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const session = gameState.session;
      if (session.climbing) {
        // Climb cinematic: world is frozen. Lerp the player up the ladder,
        // cycle the up-walk animation so the legs/arms move, then alpha-fade
        // the canvas to white. When both stages complete we mark `climbed`
        // and fall through to game.stop() which renders the win screen.
        const ladder = session.climbAnchor;
        const climbDur = GAME_CONFIG.entities.ladder.climbDuration;
        const fadeDur = GAME_CONFIG.entities.ladder.fadeDuration;
        const totalDur = climbDur + fadeDur;
        const elapsedClimb = now - session.climbStart;

        const startY = ladder.pos[1] + 16;
        // Keep the player rising for the ENTIRE cinematic (climb + fade) so
        // the motion feels continuous: by the time the fade is fully white,
        // the sprite has cleared the top of the canvas. endY = -player.height
        // (-48) puts the bottom of the sprite exactly on row 0, so we go a
        // bit further so the player visibly walks "off-screen" before the
        // white-out completes.
        const endY = -game.player.height - 32;
        const climbT = Math.min(1, elapsedClimb / totalDur);
        game.player.pos[1] = startY + (endY - startY) * climbT;

        const stride = game.player.stride.up;
        const phase = Math.floor(elapsedClimb / 140) % 4;
        const palX = phase === 1 ? 48 * 0 : phase === 3 ? 48 * 2 : 48 * 1;
        game.player.drawOptions.palY = stride.palY;
        game.player.drawOptions.palX = palX;
        game.player.drawOptions.x = game.player.pos[0];
        game.player.drawOptions.y = game.player.pos[1];
        game.player.updateSides();

        if (game.camera) {
          game.camera.update(game.player);
          ctx.save();
          ctx.translate(-game.camera.x, -game.camera.y);
        }

        game.room.draw(ctx);
        // During the climb the player must always render ON TOP of the
        // ladder so the sprite reads as climbing the rungs (the y-sort would
        // otherwise put the player behind the ladder once they've risen
        // above its bottom edge). Enemies, coins, and potions still draw so
        // the world doesn't blink out of existence behind the cinematic.
        Object.values(game.room.enemies).forEach(e => e.draw(ctx));
        Object.values(game.room.coins).forEach(c => c.draw(ctx));
        Object.values(game.room.hpPotions).forEach(p => p.draw(ctx));
        if (game.room.ladder) game.room.ladder.draw(ctx);
        game.player.draw(ctx);

        if (game.camera) ctx.restore();

        // White fade is drawn in SCREEN space (after restoring the camera
        // transform) so it always covers the full visible canvas, regardless
        // of where the mobile camera is currently anchored.
        const fadeAlpha = elapsedClimb > climbDur
          ? Math.min(1, (elapsedClimb - climbDur) / fadeDur)
          : 0;
        if (fadeAlpha > 0) {
          ctx.fillStyle = `rgba(255,255,255,${fadeAlpha})`;
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        if (elapsedClimb >= climbDur + fadeDur) {
          // Hand off from "climbing + white-out" to "scene reveal". We hold
          // off on flipping `climbed` until the reveal stages also finish,
          // so game.win() (and therefore game.stop()) doesn't fire and end
          // the loop while we're still animating the post-climb fades.
          session.climbing = false;
          session.winRevealing = true;
          session.winRevealStart = now;
        }

        game.stop();
      } else if (session.winRevealing) {
        // Post-climb reveal: the canvas starts fully white (left there by
        // the climb's fade-out). We hold the white briefly, then alpha-blend
        // the chosen scene image in over the white, then alpha-blend the
        // win text panel in over both. Once the text is fully in, flip
        // `climbed` so game.stop() takes over and the static post-stop
        // render holds the final frame.
        const holdDur = GAME_CONFIG.entities.ladder.sceneHoldDuration;
        const sceneDur = GAME_CONFIG.entities.ladder.sceneFadeDuration;
        const textDur = GAME_CONFIG.entities.ladder.textFadeDuration;
        const elapsedReveal = now - session.winRevealStart;

        const sceneAlpha = Math.max(0, Math.min(1,
          (elapsedReveal - holdDur) / Math.max(1, sceneDur),
        ));
        const textAlpha = Math.max(0, Math.min(1,
          (elapsedReveal - holdDur - sceneDur) / Math.max(1, textDur),
        ));

        const sceneId = session.winSceneId;
        const orientation = gameState.isMobile ? "mobile" : "desktop";
        const sceneImg = sceneId
          && gameState.sprites.endOfGame
          && gameState.sprites.endOfGame[sceneId]
          && gameState.sprites.endOfGame[sceneId][orientation];
        const restartMsg = gameState.isMobile ? "Tap to restart" : "Click 'Restart' up top if";
        const restartMsg2 = gameState.isMobile ? "" : "you'd like to play again";

        renderWinFrame(ctx, sceneImg, sceneAlpha, textAlpha, { restartMsg, restartMsg2 });

        if (elapsedReveal >= holdDur + sceneDur + textDur) {
          session.winRevealing = false;
          session.climbed = true;
        }

        game.stop();
      } else {
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

        game.room.draw(ctx);

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

        game.room.drawHUD(ctx);

        game.stop();
      }
      if (game.requestStop) {
        cancelAnimationFrame(game.requestId);
        const fontFamily = "Courier New";
        const cw = ctx.canvas.width;
        const ch = ctx.canvas.height;
        const restartMsg = gameState.isMobile ? "Tap to restart" : "Click 'Restart' up top if";
        const restartMsg2 = gameState.isMobile ? "" : "you'd like to play again";
        if (game.win()) {
          // Re-render the same frame the reveal animation ended on (scene at
          // alpha 1, text panel at alpha 1) using the shared helper, so the
          // handoff from animated -> static is pixel-identical.
          const sceneId = gameState.session.winSceneId;
          const orientation = gameState.isMobile ? "mobile" : "desktop";
          const sceneImg = sceneId
            && gameState.sprites.endOfGame
            && gameState.sprites.endOfGame[sceneId]
            && gameState.sprites.endOfGame[sceneId][orientation];
          renderWinFrame(ctx, sceneImg, 1, 1, { restartMsg, restartMsg2 });
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
