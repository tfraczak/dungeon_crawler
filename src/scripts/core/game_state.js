// Mobile detection runs once at boot and is cached on `gameState.isMobile`.
// We layer signals from "most authoritative" to "best-effort" so the value
// behaves correctly on real devices AND can be forced for testing in
// Chrome's Responsive mode (which doesn't enable touch / mobile UA-CH on
// its own).
//
//   1. URL/localStorage override (?mobile=1 or ?mobile=0). The choice is
//      sticky in localStorage so a one-time tester URL persists across
//      reloads, mirroring how `?zoom=` works.
//   2. navigator.userAgentData.mobile — modern Client Hints API; the
//      designated successor to `navigator.userAgent` parsing. Returns a
//      structured boolean. Chromium-only (Chrome / Edge / Opera) and only
//      defined on secure contexts (HTTPS or localhost).
//   3. Feature detection (maxTouchPoints + `(hover: none)` media query).
//      Covers Safari + Firefox + the long tail. This is the only branch
//      that catches iPadOS Safari, which omits userAgentData AND spoofs a
//      desktop UA but still reports touchpoints.
//
// We deliberately do NOT fall back to a `userAgent` regex: the UA string is
// being progressively reduced and frozen by browsers (UA Reduction), which
// makes regex sniffing increasingly unreliable for new Android builds.
function detectMobile() {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("mobile");
    if (q === "1" || q === "true") {
      localStorage.setItem("forceMobile", "1");
      return true;
    }
    if (q === "0" || q === "false") {
      localStorage.setItem("forceMobile", "0");
      return false;
    }
    const stored = localStorage.getItem("forceMobile");
    if (stored === "1") return true;
    if (stored === "0") return false;
  } catch { /* localStorage unavailable — fall through to detection */ }

  if (navigator.userAgentData && typeof navigator.userAgentData.mobile === "boolean") {
    return navigator.userAgentData.mobile;
  }

  return navigator.maxTouchPoints > 0 && matchMedia("(hover: none)").matches;
}

function createGameState() {
  return {
    isMobile: detectMobile(),
    keys: {
      w: false,
      a: false,
      s: false,
      d: false,
      Shift: false,
      Enter: false,
      " ": false,
      e: false,
    },
    mobileZoom: 1,
    session: {},
    sprites: {},
    bgImgs: {},
    gameOptions: {},
    reset() {
      if (this.session.game) {
        this.session.game.requestStop = true;
      }
      this.session = {};
    },
  };
}

export default createGameState;
