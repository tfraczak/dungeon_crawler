import { newGame } from "@core/lifecycle";
import { playClick } from "./sound";
import installDevOptionsDrawer from "./dev_options_drawer";
import installSoundSandbox from "./sound_sandbox/install";

export default (gameState) => {
  // Both dev drawers gate themselves internally via NODE_ENV. The header
  // trigger icons and drawer markup carry `.dev-only`, hidden by CSS in
  // production via `body:not(.dev-mode) .dev-only`.
  installDevOptionsDrawer(gameState);
  installSoundSandbox(gameState);

  const keys = gameState.keys;

  // Map a raw KeyboardEvent.key to the canonical slot the rest of the game
  // reads. Movement is aliased so WASD and the arrow keys both flip the same
  // w/a/s/d slots in `keys`, which is what player.move() consults.
  const slotFor = (rawKey) => {
    if (rawKey === "Shift" || rawKey === "Enter" || rawKey === " ") return rawKey;
    const k = rawKey.toLowerCase();
    switch (k) {
      case "w": case "arrowup":    return "w";
      case "a": case "arrowleft":  return "a";
      case "s": case "arrowdown":  return "s";
      case "d": case "arrowright": return "d";
      default: return null;
    }
  };

  document.addEventListener("keydown", e => {
    const slot = slotFor(e.key);
    if (slot === null || keys[slot]) return;
    keys[slot] = true;
    // Space scrolls the page and arrow keys scroll/move focus by default.
    if (slot === " " || e.key.startsWith("Arrow")) e.preventDefault();
  });

  document.addEventListener("keyup", e => {
    const slot = slotFor(e.key);
    if (slot === null || !keys[slot]) return;
    keys[slot] = false;
  });

  // "How to play?" is a hash-route link (#how-to-play) that opens a slide-in
  // drawer from the right. The game keeps running behind it — keyboard
  // controls still route to the game loop — so players can reference the
  // guide mid-run. Esc dismisses the drawer for a quick keyboard-only exit.
  const howTo = document.getElementById("how-to");
  const howToPointer = document.getElementById("how-to-pointer");
  const howToPage = document.getElementById("how-to-page");
  const howToBack = document.getElementById("how-to-back");

  const closeHowTo = () => {
    if (window.location.hash !== "#how-to-play") return;
    if (window.history.length > 1 && document.referrer) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      syncHowToPage();
    }
  };

  howTo.addEventListener("mouseenter", () => {
    howToPointer.classList.add("active");
    howTo.classList.add("active");
    playClick();
  });
  howTo.addEventListener("mouseleave", () => {
    howToPointer.classList.remove("active");
    howTo.classList.remove("active");
  });

  const syncHowToPage = () => {
    const open = window.location.hash === "#how-to-play";
    howToPage.classList.toggle("active", open);
    howToPage.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) {
      howToPage.scrollTop = 0;
      document.body.classList.add("how-to-open");
    } else {
      document.body.classList.remove("how-to-open");
    }
  };

  howToBack.addEventListener("click", (e) => {
    e.preventDefault();
    closeHowTo();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeHowTo();
  });

  window.addEventListener("hashchange", syncHowToPage);
  syncHowToPage();

  const restart = document.getElementById("restart");
  restart.addEventListener("mouseenter", () => {
    playClick();
    document.getElementById("restart").classList.add("active");
    document.getElementById("restart-pointer").classList.add("active");
  });
  restart.addEventListener("mouseleave", () => {
    document.getElementById("restart").classList.remove("active");
    document.getElementById("restart-pointer").classList.remove("active");
  });
  restart.addEventListener("click", e => {
    e.preventDefault();
    newGame(gameState);
  });

  if (gameState.isMobile) {
    const joystick = document.getElementById("joystick");
    const knob = document.getElementById("joystick-knob");
    const JOYSTICK_RADIUS = 50;
    const DEAD_ZONE = 12;
    let joystickTouchId = null;
    let joystickCenter = null;

    const clearDirections = () => {
      keys["w"] = false;
      keys["a"] = false;
      keys["s"] = false;
      keys["d"] = false;
    };

    const updateJoystick = (touch) => {
      const dx = touch.clientX - joystickCenter.x;
      const dy = touch.clientY - joystickCenter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const clampedDist = Math.min(dist, JOYSTICK_RADIUS);
      const angle = Math.atan2(dy, dx);
      const knobX = Math.cos(angle) * clampedDist;
      const knobY = Math.sin(angle) * clampedDist;
      knob.style.transform = `translate(${knobX}px, ${knobY}px)`;

      clearDirections();

      if (dist > DEAD_ZONE) {
        // 8 zones of 45 degrees each. atan2 returns degrees: 0=right, 90=down, -90=up, +-180=left
        const deg = angle * (180 / Math.PI);
        if (deg >= -22.5  && deg < 22.5)   { keys["d"] = true; }                      // right
        if (deg >= 22.5   && deg < 67.5)   { keys["s"] = true; keys["d"] = true; }    // down-right
        if (deg >= 67.5   && deg < 112.5)  { keys["s"] = true; }                      // down
        if (deg >= 112.5  && deg < 157.5)  { keys["s"] = true; keys["a"] = true; }    // down-left
        if (deg >= 157.5  || deg < -157.5) { keys["a"] = true; }                      // left
        if (deg >= -157.5 && deg < -112.5) { keys["w"] = true; keys["a"] = true; }    // up-left
        if (deg >= -112.5 && deg < -67.5)  { keys["w"] = true; }                      // up
        if (deg >= -67.5  && deg < -22.5)  { keys["w"] = true; keys["d"] = true; }    // up-right
      }
    };

    // `passive: false` on every touchstart/touchmove handler that calls
    // preventDefault(): modern mobile browsers default these to passive,
    // which silently drops preventDefault() and emits a noisy
    // `[Intervention] Ignored attempt to cancel a touchstart event with
    // cancelable=false` console warning. Marking them non-passive restores
    // the cancellation we actually want (no scroll, no text-select, no
    // synthetic click-after-300ms) and quiets the warnings.
    joystick.addEventListener("touchstart", e => {
      e.preventDefault();
      if (joystickTouchId !== null) return;
      const touch = e.changedTouches[0];
      joystickTouchId = touch.identifier;
      const rect = joystick.getBoundingClientRect();
      joystickCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      updateJoystick(touch);
    }, { passive: false });

    joystick.addEventListener("touchmove", e => {
      e.preventDefault();
      for (const touch of e.changedTouches) {
        if (touch.identifier === joystickTouchId) {
          updateJoystick(touch);
          break;
        }
      }
    }, { passive: false });

    const releaseJoystick = (e) => {
      e.preventDefault();
      for (const touch of e.changedTouches) {
        if (touch.identifier === joystickTouchId) {
          joystickTouchId = null;
          joystickCenter = null;
          clearDirections();
          knob.style.transform = "translate(0px, 0px)";
          break;
        }
      }
    };

    joystick.addEventListener("touchend", releaseJoystick);
    joystick.addEventListener("touchcancel", releaseJoystick);

    const sprintBtn = document.getElementById("sprint-btn");
    sprintBtn.addEventListener("touchstart", e => {
      e.preventDefault();
      keys["Shift"] = true;
    }, { passive: false });
    sprintBtn.addEventListener("touchend", e => {
      e.preventDefault();
      keys["Shift"] = false;
    });
    sprintBtn.addEventListener("touchcancel", e => {
      e.preventDefault();
      keys["Shift"] = false;
    });

    const attackBtn = document.getElementById("attack-btn");
    attackBtn.addEventListener("touchstart", e => {
      e.preventDefault();
      keys[" "] = true;
    }, { passive: false });
    attackBtn.addEventListener("touchend", e => {
      e.preventDefault();
      keys[" "] = false;
    });
    attackBtn.addEventListener("touchcancel", e => {
      e.preventDefault();
      keys[" "] = false;
    });

    // Canvas tap: swallow the gesture (no scroll, no text-select, no
    // synthetic click) AND, when the game is already in its post-stop
    // state, treat the tap as "restart". The win/lose screens both render
    // a "Tap to restart" prompt, so this listener is what makes that
    // prompt actually do anything. We delegate via the live game handle on
    // gameState.session so we don't need to import the game module here
    // (which would create a cycle game.js <-> game_lifecycle.js).
    const canvas = document.getElementById("display");
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      const liveGame = gameState.session && gameState.session.game;
      if (liveGame && liveGame.requestStop) {
        newGame(gameState);
      }
    }, { passive: false });

    restart.addEventListener("touchend", e => {
      e.preventDefault();
      newGame(gameState);
    });
  }
}
