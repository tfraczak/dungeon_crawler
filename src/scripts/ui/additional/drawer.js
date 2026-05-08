import TEST_STATE, {
  TEST_IDS,
  TEST_KEYS,
  isTestBooleanKey,
  isTestStringKey,
  resetTestValues,
  setTestValue,
} from "@core/player_testing";
import playCoinSound from "@entities/coin/sound";
import { createWeaponById, DEFAULT_WEAPON_ID, WEAPON_GROUPS } from "@items/equipment/weapons/registry";
import { getText } from "./text";
import { runtimeId } from "../runtime_id";

const TICK_INTERVAL_MS = 100;
const COPY = Object.freeze({
  a: getText("Hwwsf"),
  b: getText("Jsvzl"),
  c: getText("Npcl jvpuz"),
  d: getText("Klmhbsa (Zovyazdvyk)"),
  e: getText("Vul-zova rpssz"),
  f: getText("Wshfly Jolhaz"),
  g: getText("Dlhwvu"),
  h: getText("Ylzla"),
  i: getText("Tpzjoplm"),
  j: getText("Nvk tvkl"),
  k: getText("Pumpupal zahtpuh"),
});

const check = (name, label) => `
  <label class="additional-check"><input type="checkbox" name="${name}" /> <span>${label}</span></label>
`;

const populateOptionList = (select) => {
  if (!select || select.options.length > 0) return;
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = COPY.d;
  select.appendChild(defaultOption);

  for (const group of WEAPON_GROUPS) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group.label;
    for (const option of group.options) {
      const el = document.createElement("option");
      el.value = option.id;
      el.textContent = option.label;
      optgroup.appendChild(el);
    }
    select.appendChild(optgroup);
  }
};

export default function installAdditionalDrawer(gameState) {
  let built = null;
  let pending = 0;
  let timer = null;

  const currentPlayer = () => gameState?.session?.player ?? null;

  const applyEquip = () => {
    const player = currentPlayer();
    if (!player) return;
    player.weapon = createWeaponById(TEST_STATE[TEST_IDS.d] || DEFAULT_WEAPON_ID, gameState);
    player.attackTimer = 0;
    player.attackCooldownTimer = 0;
    player.attackHitIds.clear();
  };

  const build = () => {
    if (built) return built;
    const navList = document.querySelector("#links-nav ul");
    if (!navList) return null;

    const drawerId = runtimeId("additional-page");
    const triggerLi = document.createElement("li");
    const openBtn = document.createElement("a");
    openBtn.href = "#";
    openBtn.title = COPY.i;
    openBtn.setAttribute("aria-label", COPY.f);
    openBtn.setAttribute("aria-controls", drawerId);
    openBtn.className = "additional-link sparkly";
    openBtn.innerHTML = '<i class="fa-regular fa-face-grin-tongue-wink additional-link-icon" aria-hidden="true"></i>';
    triggerLi.appendChild(openBtn);
    navList.insertBefore(triggerLi, navList.firstElementChild);

    const drawer = document.createElement("aside");
    drawer.id = drawerId;
    drawer.className = "additional-page";
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML = `
      <div class="additional-panel">
        <header class="additional-header">
          <h1>${COPY.f}</h1>
          <button type="button" class="additional-button additional-back" aria-label="${COPY.b}" data-additional-ref="close">&larr; ${COPY.b}</button>
        </header>
        <form class="additional-form" onsubmit="return false;">
          <div class="additional-body">
            <section class="additional-section">
              <h2>${COPY.i}</h2>
              ${check(TEST_IDS.a, COPY.j)}
              ${check(TEST_IDS.b, COPY.k)}
              ${check(TEST_IDS.c, COPY.e)}
              <label class="additional-field">
                <span>${COPY.g}</span>
                <select name="${TEST_IDS.d}"></select>
              </label>
              <label class="additional-field">
                <span>${COPY.c}</span>
                <input type="number" name="amount" step="1" min="1" inputmode="numeric" placeholder="40" />
              </label>
              <div class="additional-row">
                <button type="button" class="additional-button additional-secondary" data-additional-ref="dispense">${COPY.c}</button>
              </div>
            </section>
          </div>
          <div class="additional-actions">
            <button type="button" class="additional-button additional-secondary" data-additional-ref="reset">${COPY.h}</button>
            <button type="submit" class="additional-button additional-primary" data-additional-ref="apply">${COPY.a}</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(drawer);

    const ref = name => drawer.querySelector(`[data-additional-ref="${name}"]`);
    built = {
      drawer,
      openBtn,
      closeBtn: ref("close"),
      applyBtn: ref("apply"),
      resetBtn: ref("reset"),
      dispenseBtn: ref("dispense"),
      form: drawer.querySelector(".additional-form"),
      equipSelect: drawer.querySelector(`[name="${TEST_IDS.d}"]`),
      amountInput: drawer.querySelector('[name="amount"]'),
    };
    populateOptionList(built.equipSelect);
    return built;
  };

  const populate = () => {
    const ui = build();
    if (!ui) return;
    for (const key of TEST_KEYS) {
      const input = ui.form.querySelector(`[name="${key}"]`);
      if (!input) continue;
      if (input.type === "checkbox") input.checked = Boolean(TEST_STATE[key]);
      else input.value = TEST_STATE[key] ?? "";
    }
  };

  const apply = () => {
    const ui = build();
    if (!ui) return;
    for (const key of TEST_KEYS) {
      const input = ui.form.querySelector(`[name="${key}"]`);
      if (!input) continue;
      if (isTestBooleanKey(key)) setTestValue(key, Boolean(input.checked));
      else if (isTestStringKey(key)) setTestValue(key, input.value);
    }
    applyEquip();
    populate();
  };

  const open = () => {
    const ui = build();
    if (!ui) return;
    populate();
    ui.openBtn.classList.remove("sparkly");
    ui.drawer.classList.add("active");
    ui.drawer.setAttribute("aria-hidden", "false");
    ui.drawer.scrollTop = 0;
  };

  const close = () => {
    const ui = build();
    if (!ui) return;
    ui.drawer.classList.remove("active");
    ui.drawer.setAttribute("aria-hidden", "true");
  };

  const tick = () => {
    const session = gameState?.session;
    if (!session || pending <= 0) {
      window.clearInterval(timer);
      timer = null;
      pending = 0;
      return;
    }
    session.coinCount = (session.coinCount ?? 0) + 1;
    playCoinSound();
    pending--;
  };

  const dispense = () => {
    const ui = build();
    if (!ui) return;
    const amount = Math.floor(Number(ui.amountInput.value || ui.amountInput.placeholder));
    if (!Number.isFinite(amount) || amount <= 0) return;
    pending += amount;
    if (!timer) {
      tick();
      timer = window.setInterval(tick, TICK_INTERVAL_MS);
    }
  };

  const activate = () => {
    document.body.classList.add("additional-active");
    const ui = build();
    if (!ui) return;
    ui.openBtn.addEventListener("click", (event) => {
      event.preventDefault();
      open();
    });
    ui.closeBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      close();
    });
    ui.applyBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      apply();
    });
    ui.resetBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      resetTestValues();
      applyEquip();
      populate();
    });
    ui.dispenseBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      dispense();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && ui.drawer.classList.contains("active")) close();
    });
  };

  return { activate };
}
