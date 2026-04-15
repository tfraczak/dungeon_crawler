import { newGame } from "./func_utils";

export default (gameState) => {
  const keys = gameState.keys;

  document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "w" && !keys["w"]) keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "a" && !keys["a"]) keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "s" && !keys["s"]) keys[e.key.toLowerCase()] = true;
    if (e.key.toLowerCase() === "d" && !keys["d"]) keys[e.key.toLowerCase()] = true;
    if (e.key === "Shift" && !keys["Shift"]) keys[e.key] = true;
    if (e.key === "Enter" && !keys["Enter"]) keys[e.key] = true;
  });

  document.addEventListener("keyup", e => {
    if (e.key.toLowerCase() === "w" && keys["w"]) keys[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "a" && keys["a"]) keys[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "s" && keys["s"]) keys[e.key.toLowerCase()] = false;
    if (e.key.toLowerCase() === "d" && keys["d"]) keys[e.key.toLowerCase()] = false;
    if (e.key === "Shift" && keys["Shift"]) keys[e.key] = false;
    if (e.key === "Enter" && keys["Enter"]) keys[e.key] = false;
  });

  const howTo = document.getElementById("how-to");
  
  howTo.addEventListener("mouseenter", () => {
    document.getElementById("how-to-pointer").classList.add("active");
    document.getElementById("how-to-sound").play();
    document.getElementById("how-to").classList.add("active");
    document.querySelector("#how-to > ul").classList.add("active");
  });
  howTo.addEventListener("mouseleave", () => {
    document.getElementById("how-to").classList.remove("active");
    document.getElementById("how-to-pointer").classList.remove("active");
    document.querySelector("#how-to > ul").classList.remove("active");
  });

  const restart = document.getElementById("restart");
  restart.addEventListener("mouseenter", () => {
    document.getElementById("restart-sound").play();
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

    joystick.addEventListener("touchstart", e => {
      e.preventDefault();
      if (joystickTouchId !== null) return;
      const touch = e.changedTouches[0];
      joystickTouchId = touch.identifier;
      const rect = joystick.getBoundingClientRect();
      joystickCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      updateJoystick(touch);
    });

    joystick.addEventListener("touchmove", e => {
      e.preventDefault();
      for (const touch of e.changedTouches) {
        if (touch.identifier === joystickTouchId) {
          updateJoystick(touch);
          break;
        }
      }
    });

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
    });
    sprintBtn.addEventListener("touchend", e => {
      e.preventDefault();
      keys["Shift"] = false;
    });
    sprintBtn.addEventListener("touchcancel", e => {
      e.preventDefault();
      keys["Shift"] = false;
    });

    const canvas = document.getElementById("display");
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
    });

    restart.addEventListener("touchend", e => {
      e.preventDefault();
      newGame(gameState);
    });
  }
}
