import { runtimeId } from "../runtime_id";

export default function buildSoundSandboxMarkup() {
  const navList = document.querySelector("#links-nav ul");
  if (!navList) return null;

  const drawerId = runtimeId("dev-sound-sandbox-page");
  const triggerLi = document.createElement("li");
  triggerLi.className = "dev-only";
  const openBtn = document.createElement("a");
  openBtn.href = "#";
  openBtn.title = "Dev Sound Sandbox";
  openBtn.setAttribute("aria-label", "Dev Sound Sandbox");
  openBtn.setAttribute("aria-controls", drawerId);
  openBtn.className = "dev-sound-sandbox-link";
  openBtn.innerHTML = '<i class="fas fa-music"></i>';
  triggerLi.appendChild(openBtn);
  navList.insertBefore(triggerLi, navList.firstElementChild);

  const drawer = document.createElement("aside");
  drawer.id = drawerId;
  drawer.className = "dev-sound-sandbox-page dev-only";
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML = `
    <div class="dev-sound-sandbox-panel">
      <header class="dev-sound-sandbox-header">
        <h1>Dev Sound Sandbox</h1>
        <button type="button" class="button back-button" aria-label="Close" data-sound-ref="close">&larr; Close</button>
      </header>

      <div class="dev-sound-sandbox-body">
        <div class="dev-sound-sandbox-picker">
          <label>Sound</label>
          <select aria-label="Pick a sound to tune" data-sound-ref="select"></select>
          <div class="dev-sound-actions" data-sound-ref="topActions">
            <button type="button" class="button" data-sound-ref="addCustom">+ Add experimental sound</button>
            <button type="button" class="button" data-sound-ref="uploadDefinition">&uarr; Upload definition</button>
          </div>
          <div class="dev-sound-import-panel" data-sound-ref="importPanel" hidden>
            <label>
              <span>Sound schema JSON</span>
              <textarea
                rows="7"
                spellcheck="false"
                placeholder="Paste raw JSON or fenced JSON copied from Copy values"
                data-sound-ref="importTextarea"
              ></textarea>
            </label>
            <div class="dev-sound-actions">
              <button type="button" class="button" data-sound-ref="importDefinition">Import definition</button>
            </div>
          </div>
        </div>

        <div data-sound-ref="knobSlot"></div>
      </div>

      <div class="dev-sound-sandbox-actions" data-sound-ref="actionsSlot"></div>
    </div>
  `;
  document.body.appendChild(drawer);

  const ref = name => drawer.querySelector(`[data-sound-ref="${name}"]`);
  return {
    drawer,
    openBtn,
    closeBtn: ref("close"),
    select: ref("select"),
    knobSlot: ref("knobSlot"),
    addCustomBtn: ref("addCustom"),
    uploadDefinitionBtn: ref("uploadDefinition"),
    importPanel: ref("importPanel"),
    importTextarea: ref("importTextarea"),
    importDefinitionBtn: ref("importDefinition"),
    actionsSlot: ref("actionsSlot"),
  };
}
