// Dev Options drawer — wires the right-side slide-in panel that lets a
// developer toggle feature flags (cheats, visualizations, numeric overrides)
// and commit them to localStorage via an explicit "Apply" button.
//
// The whole module is a no-op in production: the NODE_ENV check below bails
// out before touching the DOM, and webpack's tree-shaker drops the rest.

import DEV_FLAGS, {
  DEV_FLAG_KEYS,
  CONFIG_DEFAULTS,
  isNumericFlag,
  isStringFlag,
  setDevFlag,
  resetDevFlags,
} from "@core/dev_flags";
import { cycleRoomBackground, getVariantCount, normalizeForcedConfig } from "@world/room/map_variants";

export default function installDevOptionsDrawer(gameState) {
  if (process.env.NODE_ENV === "production") return;

  const drawer = document.getElementById("dev-options-page");
  const openBtn = document.getElementById("dev-options-link");
  const closeBtn = document.getElementById("dev-options-close");
  const applyBtn = document.getElementById("dev-options-apply");
  const resetBtn = document.getElementById("dev-options-reset");
  const form = drawer?.querySelector(".dev-options-form");

  if (!drawer || !openBtn || !form) return;

  const mapInfo = document.getElementById("dev-current-map-info");
  const mapPrevBtn = document.getElementById("dev-map-prev");
  const mapNextBtn = document.getElementById("dev-map-next");

  // Placeholders mirror the canonical game_config defaults. Leaving a field
  // blank = "use the config default," which the call sites read via `?? cfg.x`.
  for (const [key, value] of Object.entries(CONFIG_DEFAULTS)) {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.placeholder = String(value);
  }

  // The currently active room (if a game is in progress). Returns null
  // pre-game / between sessions so callers can disable the cycle controls.
  const currentRoom = () => gameState?.session?.game?.room ?? null;

  const refreshMapInfo = () => {
    if (!mapInfo) return;
    const room = currentRoom();
    if (!room || !room.bgConfig) {
      mapInfo.textContent = "No active room.";
      if (mapPrevBtn) mapPrevBtn.disabled = true;
      if (mapNextBtn) mapNextBtn.disabled = true;
      return;
    }
    const { numPaths, paths, variantIdx } = room.bgConfig;
    const count = getVariantCount(numPaths, paths);
    mapInfo.textContent = `Config ${numPaths}${paths} — variant ${variantIdx + 1} of ${count} (map${variantIdx}.png)`;
    const cycleable = count > 1;
    if (mapPrevBtn) mapPrevBtn.disabled = !cycleable;
    if (mapNextBtn) mapNextBtn.disabled = !cycleable;
  };

  const populate = () => {
    for (const key of DEV_FLAG_KEYS) {
      const input = form.querySelector(`[name="${key}"]`);
      if (!input) continue;
      if (input.type === "checkbox") {
        input.checked = Boolean(DEV_FLAGS[key]);
      } else {
        // Both <input type="number"> and <select> use .value; for selects an
        // empty value matches the "default / random" <option> we render with
        // value="" in markup.
        const v = DEV_FLAGS[key];
        input.value = v === undefined || v === null ? "" : String(v);
      }
    }
    refreshMapInfo();
  };

  const open = () => {
    populate();
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    drawer.scrollTop = 0;
  };

  const close = () => {
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
  };

  const apply = () => {
    for (const key of DEV_FLAG_KEYS) {
      const input = form.querySelector(`[name="${key}"]`);
      if (!input) continue;
      if (input.type === "checkbox") {
        setDevFlag(key, input.checked);
      } else if (isNumericFlag(key)) {
        const raw = input.value.trim();
        if (raw === "") {
          setDevFlag(key, undefined);
        } else {
          const n = Number(raw);
          setDevFlag(key, Number.isFinite(n) ? n : undefined);
        }
      } else if (isStringFlag(key)) {
        // forceNextMapConfig gets normalized into the canonical sorted/deduped
        // uppercase form (e.g. "dul" -> "DLU"); empty / no-valid-letters
        // collapses to "" which the room generator treats as "no force."
        // Other string flags are stored as-is.
        if (key === "forceNextMapConfig") {
          setDevFlag(key, normalizeForcedConfig(input.value) ?? "");
        } else {
          setDevFlag(key, input.value);
        }
      }
    }
    // Refresh from the store so any rejected / coerced inputs reflect truth.
    populate();
    flashApplied();
  };

  const flashApplied = () => {
    applyBtn.classList.add("applied");
    setTimeout(() => applyBtn.classList.remove("applied"), 600);
  };

  // Cycle buttons mutate `room.background` directly — they don't go through
  // the apply/persist pipeline because they're one-shot actions on live game
  // state, not settings. The next animation frame picks up the new image.
  const cycle = (delta) => {
    const room = currentRoom();
    if (!room) return;
    cycleRoomBackground(room, gameState.bgImgs, delta);
    refreshMapInfo();
  };

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });
  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });
  applyBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    apply();
  });
  resetBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    resetDevFlags();
    populate();
  });

  mapPrevBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    cycle(-1);
  });
  mapNextBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    cycle(1);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("active")) close();
  });
}
