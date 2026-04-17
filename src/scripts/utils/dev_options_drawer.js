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
  setDevFlag,
  resetDevFlags,
} from "../core/dev_flags";

export default function installDevOptionsDrawer() {
  if (process.env.NODE_ENV === "production") return;

  const drawer = document.getElementById("dev-options-page");
  const openBtn = document.getElementById("dev-options-link");
  const closeBtn = document.getElementById("dev-options-close");
  const applyBtn = document.getElementById("dev-options-apply");
  const resetBtn = document.getElementById("dev-options-reset");
  const form = drawer?.querySelector(".dev-options-form");

  if (!drawer || !openBtn || !form) return;

  // Placeholders mirror the canonical game_config defaults. Leaving a field
  // blank = "use the config default," which the call sites read via `?? cfg.x`.
  for (const [key, value] of Object.entries(CONFIG_DEFAULTS)) {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.placeholder = String(value);
  }

  const populate = () => {
    for (const key of DEV_FLAG_KEYS) {
      const input = form.querySelector(`[name="${key}"]`);
      if (!input) continue;
      if (input.type === "checkbox") {
        input.checked = Boolean(DEV_FLAGS[key]);
      } else {
        const v = DEV_FLAGS[key];
        input.value = v === undefined || v === null ? "" : String(v);
      }
    }
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("active")) close();
  });
}
