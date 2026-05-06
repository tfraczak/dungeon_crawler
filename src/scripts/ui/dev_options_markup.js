import { runtimeId } from "./runtime_id";
import { TEST_IDS } from "@core/player_testing";
import { getText } from "./additional/text";

const WIN_SCENES = Object.freeze([
  ["aurora_cliff", "Aurora cliff"],
  ["autumn_forest", "Autumn forest"],
  ["jungle_waterfall", "Jungle waterfall"],
  ["lakeside_dawn", "Lakeside dawn"],
]);
const PLAYER_SECTION_COPY = Object.freeze({
  a: getText("Wshfly Jolhaz"),
  b: getText("Nvk tvkl"),
  c: getText("Pumpupal zahtpuh"),
  d: getText("Vul-zova rpssz"),
  e: getText("Dlhwvu"),
  f: getText("Zoplsk"),
});

const field = ({ label, name, step = "1", min = null, max = null, inputmode = "numeric" }) => `
  <label class="dev-field">
    <span>${label}</span>
    <input
      type="number"
      name="${name}"
      step="${step}"
      ${min === null ? "" : `min="${min}"`}
      ${max === null ? "" : `max="${max}"`}
      inputmode="${inputmode}"
    />
  </label>
`;

const check = (name, label) => `
  <label class="dev-check"><input type="checkbox" name="${name}" /> <span>${label}</span></label>
`;

export default function buildDevOptionsMarkup() {
  const navList = document.querySelector("#links-nav ul");
  if (!navList) return null;

  const drawerId = runtimeId("dev-options-page");
  const triggerLi = document.createElement("li");
  triggerLi.className = "dev-only";
  const openBtn = document.createElement("a");
  openBtn.href = "#";
  openBtn.title = "Dev Options";
  openBtn.setAttribute("aria-label", "Dev Options");
  openBtn.setAttribute("aria-controls", drawerId);
  openBtn.className = "dev-options-link";
  openBtn.innerHTML = '<i class="fas fa-wrench"></i>';
  triggerLi.appendChild(openBtn);
  navList.insertBefore(triggerLi, navList.firstElementChild);

  const drawer = document.createElement("aside");
  drawer.id = drawerId;
  drawer.className = "dev-options-page dev-only";
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML = `
    <div class="dev-options-panel">
      <header class="dev-options-header">
        <h1>Dev Options</h1>
        <button type="button" class="button back-button" aria-label="Close" data-dev-ref="close">&larr; Close</button>
      </header>

      <form class="dev-options-form" onsubmit="return false;">
        <div class="dev-options-body">
          <section class="dev-options-section">
            <h2>${PLAYER_SECTION_COPY.a}</h2>
            ${check(TEST_IDS.a, PLAYER_SECTION_COPY.b)}
            ${check(TEST_IDS.b, PLAYER_SECTION_COPY.c)}
            ${check(TEST_IDS.c, PLAYER_SECTION_COPY.d)}
            <label class="dev-field">
              <span>${PLAYER_SECTION_COPY.e}</span>
              <select name="${TEST_IDS.d}"></select>
            </label>
            <label class="dev-field">
              <span>${PLAYER_SECTION_COPY.f}</span>
              <select name="${TEST_IDS.e}"></select>
            </label>
          </section>

          <section class="dev-options-section">
            <h2>Player Tuning</h2>
            <p class="dev-options-hint">Live movement and stamina tuning. Leave blank to use config defaults.</p>
            ${field({ label: "Speed multiplier", name: "playerSpeedMultiplier", step: "0.05", min: "0", inputmode: "decimal" })}
            ${field({ label: "Sprint multiplier", name: "playerSprintMultiplier", step: "0.05", min: "0", inputmode: "decimal" })}
            ${field({ label: "Stamina drain", name: "playerStaminaDrain", step: "0.25", min: "0", inputmode: "decimal" })}
            ${field({ label: "Idle regen", name: "playerStaminaRegenIdle", step: "0.25", min: "0", inputmode: "decimal" })}
            ${field({ label: "Moving regen", name: "playerStaminaRegenMoving", step: "0.25", min: "0", inputmode: "decimal" })}
          </section>

          <section class="dev-options-section">
            <h2>Enemy Overrides</h2>
            <p class="dev-options-hint">Leave blank to use the game default shown in each field. Enemy HP only affects newly-spawned enemies. Monster spawn counts add that many monsters to the current room when applied, and override procedural spawns in newly-generated rooms while any count is set. Drop rate REPLACES each item's configured chance with the same value (only used when forced drops is blank). Forced drops BYPASSES the chance roll entirely and spawns exactly that many copies of every drop entry per kill.</p>
            ${field({ label: "Enemy HP", name: "enemyHp", min: "1" })}
            ${field({ label: "Spawn bats", name: "enemyBatSpawnCount", min: "0" })}
            ${field({ label: "Spawn blobs", name: "enemyBlobSpawnCount", min: "0" })}
            ${field({ label: "Spawn goblins", name: "enemyGoblinSpawnCount", min: "0" })}
            ${field({ label: "Spawn skeletons", name: "enemySkeletonSpawnCount", min: "0" })}
            ${field({ label: "Enemy drop rate", name: "enemyItemDropRate", step: "0.05", min: "0", max: "1", inputmode: "decimal" })}
            ${field({ label: "Goblin steal chance", name: "enemyGoblinStealChance", step: "0.05", min: "0", max: "1", inputmode: "decimal" })}
            ${field({ label: "Forced drops per kill", name: "enemyForcedDropCount", min: "0" })}
          </section>

          <section class="dev-options-section">
            <h2>Difficulty Scaling</h2>
            <p class="dev-options-hint">Tune procedural enemy pressure and inspect the current room's difficulty math.</p>
            <div class="dev-options-info" data-dev-ref="difficultyInfo">No active room.</div>
            ${field({ label: "Max enemies", name: "difficultyMaxEnemies", min: "0" })}
            ${field({ label: "Points per enemy", name: "difficultyPointsPerEnemy", min: "1" })}
            ${field({ label: "Room count points", name: "difficultyRoomCountPoints", step: "0.25", min: "0", inputmode: "decimal" })}
            ${field({ label: "Room difficulty points", name: "difficultyRoomDifficultyPoints", step: "0.25", min: "0", inputmode: "decimal" })}
          </section>

          <section class="dev-options-section">
            <h2>Skeleton Magic</h2>
            <p class="dev-options-hint">Cast timing, range, projectile, and cold-effect tuning for skeleton fights.</p>
            ${field({ label: "Cast cooldown frames", name: "skeletonCastCooldownFrames", min: "0" })}
            ${field({ label: "Cast windup frames", name: "skeletonCastWindupFrames", min: "1" })}
            ${field({ label: "Cast distance", name: "skeletonCastDistance", min: "0" })}
            ${field({ label: "Interrupted delay frames", name: "skeletonCastInterruptedDelayFrames", min: "0" })}
            ${field({ label: "Dissipate frames", name: "skeletonCastDissipateFrames", min: "0" })}
            ${field({ label: "Projectile speed", name: "iceCrystalSpeed", step: "0.25", min: "0", inputmode: "decimal" })}
            ${field({ label: "Projectile max distance", name: "iceCrystalMaxDistance", min: "0" })}
            ${field({ label: "Projectile damage min", name: "iceCrystalDamageMin", min: "0" })}
            ${field({ label: "Projectile damage max", name: "iceCrystalDamageMax", min: "0" })}
            ${field({ label: "Cold duration frames", name: "iceCrystalColdDurationFrames", min: "0" })}
            ${field({ label: "Cold speed multiplier", name: "iceCrystalColdSpeedMultiplier", step: "0.05", min: "0", inputmode: "decimal" })}
          </section>

          <section class="dev-options-section">
            <h2>Visualization</h2>
            ${check("showCollisionBoxes", "Collision boxes")}
            ${check("showEnemyDetectRadius", "Enemy detect radius")}
            ${check("showEnemyHp", "Enemy HP bars")}
            <div class="dev-options-button-row">
              <button type="button" class="button secondary" data-dev-ref="previewBatBite">Preview bat bite effect</button>
            </div>
            <div class="dev-options-button-row">
              <button type="button" class="button secondary" data-dev-ref="previewBlobHit">Preview blob ooze effect</button>
            </div>
          </section>

          <section class="dev-options-section">
            <h2>Map Variants</h2>
            <p class="dev-options-hint">Cycle the painted background of the room you're currently standing in. Force-next pins every newly-generated room to a specific exit configuration using any subset of <code>D L R U</code>.</p>
            <div class="dev-options-info" data-dev-ref="mapInfo">No active room.</div>
            <div class="dev-options-button-row">
              <button type="button" class="button secondary" data-dev-ref="mapPrev">&larr; Prev variant</button>
              <button type="button" class="button secondary" data-dev-ref="mapNext">Next variant &rarr;</button>
            </div>
            <label class="dev-field">
              <span>Force next map config</span>
              <input type="text" name="forceNextMapConfig" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="e.g. DLU" />
            </label>
          </section>

          <section class="dev-options-section">
            <h2>Loot Cheats</h2>
            <p class="dev-options-hint">One-shot actions on the live run. Coins / keys go straight into the player's pocket; "Force chest spawn" places an unopened chest in the current room and bypasses the difficulty gate, the per-room cooldown, and the one-at-a-time rule.</p>
            <div class="dev-options-button-row">
              <button type="button" class="button secondary" data-dev-ref="addCoins">+10 coins</button>
              <button type="button" class="button secondary" data-dev-ref="addKeys">+1 key</button>
            </div>
            <div class="dev-options-button-row">
              <button type="button" class="button secondary" data-dev-ref="spawnChest">Force chest spawn</button>
            </div>
          </section>

          <section class="dev-options-section">
            <h2>Win & Economy</h2>
            <p class="dev-options-hint">Force ladder skips both the coin threshold and per-room roll. Win scene pins the post-climb backdrop.</p>
            ${check("forceLadder", "Force ladder spawn")}
            ${field({ label: "Ladder chance", name: "ladderChance", step: "0.05", min: "0", max: "1", inputmode: "decimal" })}
            ${field({ label: "Win coin count", name: "winCoinCount", min: "0" })}
            ${field({ label: "Potion heal amount", name: "hpPotionHealAmount", min: "0" })}
            <label class="dev-field">
              <span>Win scene</span>
              <select name="winScene">
                <option value="">Random</option>
                ${WIN_SCENES.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
              </select>
            </label>
          </section>
        </div>

        <div class="dev-options-actions">
          <button type="button" class="button secondary" data-dev-ref="reset">Reset to defaults</button>
          <button type="submit" class="button apply" data-dev-ref="apply">Apply</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(drawer);

  const ref = name => drawer.querySelector(`[data-dev-ref="${name}"]`);
  return {
    drawer,
    openBtn,
    closeBtn: ref("close"),
    applyBtn: ref("apply"),
    resetBtn: ref("reset"),
    form: drawer.querySelector(".dev-options-form"),
    body: drawer.querySelector(".dev-options-body"),
    headerTitle: drawer.querySelector(".dev-options-header h1"),
    mapInfo: ref("mapInfo"),
    mapPrevBtn: ref("mapPrev"),
    mapNextBtn: ref("mapNext"),
    difficultyInfo: ref("difficultyInfo"),
    previewBatBiteBtn: ref("previewBatBite"),
    previewBlobHitBtn: ref("previewBlobHit"),
    addCoinsBtn: ref("addCoins"),
    addKeysBtn: ref("addKeys"),
    spawnChestBtn: ref("spawnChest"),
  };
}
