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
import TEST_STATE, {
  TEST_IDS,
  TEST_KEYS,
  isTestBooleanKey,
  isTestStringKey,
  setTestValue,
  resetTestValues,
} from "@core/player_testing";
import BAT_CONFIG from "@entities/enemy/bat/config";
import { playBatBite } from "@entities/enemy/bat/sound";
import BLOB_CONFIG from "@entities/enemy/blob/config";
import { playBlobAttackHit } from "@entities/enemy/blob/sound";
import { createWeaponById, DEFAULT_WEAPON_ID, WEAPON_GROUPS } from "@items/equipment/weapons/registry";
import { cycleRoomBackground, getVariantCount, normalizeForcedConfig } from "@world/room/map_variants";
import {
  enemyCountPoints,
  enemyDifficultyPoints,
  enemyTypeWeights,
  targetEnemyCount,
} from "@world/room/difficulty";
import buildDevOptionsMarkup from "./dev_options_markup";

export default function installDevOptionsDrawer(gameState) {
  if (process.env.NODE_ENV === "production") return;

  const ui = buildDevOptionsMarkup();
  if (!ui) return;
  const {
    drawer,
    openBtn,
    closeBtn,
    applyBtn,
    resetBtn,
    form,
    body,
    headerTitle,
    mapInfo,
    mapPrevBtn,
    mapNextBtn,
    difficultyInfo,
    previewBatBiteBtn,
    previewBlobHitBtn,
  } = ui;

  if (!drawer || !openBtn || !form || !body) return;

  const weaponSelect = form.querySelector(`[name="${TEST_IDS.d}"]`);
  const sections = Array.from(body.querySelectorAll(".dev-options-section"));

  const showMenu = () => {
    body.classList.remove("subdrawer-active");
    sections.forEach(section => section.classList.remove("active"));
    if (headerTitle) headerTitle.textContent = "Dev Options";
    if (closeBtn) {
      closeBtn.textContent = "\u2190 Close";
      closeBtn.setAttribute("aria-label", "Close");
    }
    body.scrollTop = 0;
  };

  const showSection = (section) => {
    body.classList.add("subdrawer-active");
    sections.forEach(optionSection => optionSection.classList.toggle("active", optionSection === section));
    if (headerTitle) headerTitle.textContent = section.querySelector("h2")?.textContent ?? "Dev Options";
    if (closeBtn) {
      closeBtn.textContent = "\u2190 Back";
      closeBtn.setAttribute("aria-label", "Back to Dev Options");
    }
    body.scrollTop = 0;
    refreshReadouts();
  };

  const buildSubdrawerMenu = () => {
    const menu = document.createElement("nav");
    menu.className = "dev-options-menu";
    menu.setAttribute("aria-label", "Dev option categories");

    for (const section of sections) {
      const heading = section.querySelector("h2")?.textContent ?? "Options";
      const menuButton = document.createElement("button");
      menuButton.type = "button";
      menuButton.className = "dev-options-menu-button";
      menuButton.textContent = `${heading} >`;
      menuButton.addEventListener("click", () => showSection(section));
      menu.appendChild(menuButton);
    }

    body.insertBefore(menu, body.firstElementChild);
  };

  buildSubdrawerMenu();

  if (weaponSelect) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Default (Shortsword)";
    weaponSelect.appendChild(defaultOption);

    for (const group of WEAPON_GROUPS) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = group.label;
      for (const option of group.options) {
        const el = document.createElement("option");
        el.value = option.id;
        el.textContent = option.label;
        optgroup.appendChild(el);
      }
      weaponSelect.appendChild(optgroup);
    }
  }

  // Placeholders mirror the canonical game_config defaults. Leaving a field
  // blank = "use the config default," which the call sites read via `?? cfg.x`.
  for (const [key, value] of Object.entries(CONFIG_DEFAULTS)) {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.placeholder = String(value);
  }

  // The currently active room (if a game is in progress). Returns null
  // pre-game / between sessions so callers can disable the cycle controls.
  const currentRoom = () => gameState?.session?.game?.room ?? null;
  const currentPlayer = () => gameState?.session?.player ?? null;

  const applyPlayerWeapon = () => {
    const player = currentPlayer();
    if (!player) return;
    player.weapon = createWeaponById(TEST_STATE[TEST_IDS.d] || DEFAULT_WEAPON_ID, gameState);
    player.attackTimer = 0;
    player.attackCooldownTimer = 0;
    player.attackHitIds.clear();
  };

  const previewBatBite = () => {
    const player = currentPlayer();
    if (!player) return;
    playBatBite();
    player.showBiteMark?.(player.flyingHitBox?.center ?? player.center, BAT_CONFIG.bite);
  };

  const previewBlobHit = () => {
    const player = currentPlayer();
    if (!player) return;
    playBlobAttackHit();
    player.showBlobHit?.(player.flyingHitBox?.center ?? player.center, BLOB_CONFIG.hitEffect);
  };

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

  const refreshDifficultyInfo = () => {
    if (!difficultyInfo) return;
    const room = currentRoom();
    const session = gameState?.session;
    if (!room || !session) {
      difficultyInfo.textContent = "No active room.";
      return;
    }
    const countPoints = enemyCountPoints(session);
    const difficultyPoints = enemyDifficultyPoints(session);
    const weights = enemyTypeWeights(difficultyPoints);
    const liveEnemies = Object.keys(room.enemies ?? {}).length;
    difficultyInfo.textContent = [
      `Room [${room.nodePos}]`,
      `coins ${session.coinCount ?? 0}`,
      `kills ${session.enemiesKilled ?? 0}`,
      `live enemies ${liveEnemies}`,
      `count points ${countPoints}`,
      `difficulty points ${difficultyPoints}`,
      `target ${targetEnemyCount(session, room)}`,
      `weights BLOB:${weights.blob} BAT:${weights.bat} SKEL:${weights.skeleton} GOB:${weights.goblin}`,
    ].join(" | ");
  };

  const refreshReadouts = () => {
    refreshMapInfo();
    refreshDifficultyInfo();
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
    for (const key of TEST_KEYS) {
      const input = form.querySelector(`[name="${key}"]`);
      if (!input) continue;
      if (input.type === "checkbox") {
        input.checked = Boolean(TEST_STATE[key]);
      } else {
        const v = TEST_STATE[key];
        input.value = v === undefined || v === null ? "" : String(v);
      }
    }
    refreshReadouts();
  };

  const open = () => {
    populate();
    showMenu();
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    drawer.scrollTop = 0;
  };

  const close = () => {
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    showMenu();
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
    for (const key of TEST_KEYS) {
      const input = form.querySelector(`[name="${key}"]`);
      if (!input) continue;
      if (isTestBooleanKey(key)) {
        setTestValue(key, Boolean(input.checked));
      } else if (isTestStringKey(key)) {
        setTestValue(key, input.value);
      }
    }
    applyPlayerWeapon();
    currentRoom()?.spawnDevEnemies?.();
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
    refreshReadouts();
  };

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });
  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (body.classList.contains("subdrawer-active")) showMenu();
    else close();
  });
  applyBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    apply();
  });
  resetBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    resetDevFlags();
    resetTestValues();
    applyPlayerWeapon();
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
  previewBatBiteBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    previewBatBite();
  });
  previewBlobHitBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    previewBlobHit();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !drawer.classList.contains("active")) return;
    if (body.classList.contains("subdrawer-active")) showMenu();
    else close();
  });
}
