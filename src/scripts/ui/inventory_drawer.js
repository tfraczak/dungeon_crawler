import { SLOT_LABELS } from "@items/equipment/slots";

// Slots grouped into three vertical lists: hands on the left (main = weapon,
// off = shield), armor in the middle (head-to-toe protective gear), and
// accessories on the right (rings, ear pieces, wrist, neckwear).
//
// Neck lives under accessories because amulets/necklaces are the dominant
// neck item in fantasy RPGs — gorgets exist but are the rarer case.
const SLOT_GROUPS = Object.freeze([
  Object.freeze({
    id: "hands",
    label: "Hands",
    slots: Object.freeze(["mainHand", "offHand"]),
  }),
  Object.freeze({
    id: "armor",
    label: "Armor",
    slots: Object.freeze(["head", "body", "gloves", "legs", "feet"]),
  }),
  Object.freeze({
    id: "accessories",
    label: "Accessories",
    slots: Object.freeze(["neck", "rightEar", "leftEar", "rightRing", "leftRing", "wrist"]),
  }),
]);

const clearKeys = (keys) => {
  Object.keys(keys).forEach(key => { keys[key] = false; });
};

export default function installInventoryDrawer(gameState) {
  // Fullscreen dimmer that fades in alongside the drawer. Doubles as a
  // visual cue that the rest of the game is paused (the game loop bails
  // early while body.inventory-open is set) and as an off-panel "close"
  // affordance — clicking outside the drawer dismisses the inventory.
  const backdrop = document.createElement("div");
  backdrop.className = "inventory-backdrop";
  backdrop.setAttribute("aria-hidden", "true");
  document.body.appendChild(backdrop);

  const drawer = document.createElement("aside");
  drawer.className = "inventory-page";
  drawer.setAttribute("aria-hidden", "true");
  drawer.innerHTML = `
    <div class="inventory-panel">
      <header class="inventory-header">
        <h1>Equipment</h1>
        <button type="button" class="inventory-back" data-ref="close">&larr; Back to game</button>
      </header>
      <div class="inventory-body">
        <div class="equipment-columns" data-ref="columns" role="listbox" aria-label="Equipment slots"></div>
        <section class="inventory-list-panel">
          <h2 data-ref="selected-title">Choose a slot</h2>
          <p class="inventory-hint" data-ref="hint">Select an equipment slot, then choose a compatible item.</p>
          <div class="inventory-items" data-ref="items"></div>
        </section>
      </div>
    </div>
  `;
  document.body.appendChild(drawer);

  const closeBtn = drawer.querySelector('[data-ref="close"]');
  const columnsEl = drawer.querySelector('[data-ref="columns"]');
  const title = drawer.querySelector('[data-ref="selected-title"]');
  const hint = drawer.querySelector('[data-ref="hint"]');
  const itemsEl = drawer.querySelector('[data-ref="items"]');
  let selectedSlot = "mainHand";

  const player = () => gameState.session.player;
  const slotItem = slot => player()?.equipment?.[slot] ?? null;

  const setIconBackground = (el, item) => {
    if (!el) return;
    if (item?.icon?.complete) {
      el.style.backgroundImage = `url(${item.icon.src})`;
      el.classList.add("has-icon");
    } else {
      el.style.backgroundImage = "";
      el.classList.remove("has-icon");
    }
  };

  const groupedCompatibleItems = (items) => {
    const groups = new Map();
    for (const item of items) {
      const key = item.id ?? item.name;
      const group = groups.get(key) ?? { item, instances: [] };
      group.instances.push(item);
      groups.set(key, group);
    }
    return [...groups.values()];
  };

  const renderSlots = () => {
    columnsEl.innerHTML = "";
    for (const group of SLOT_GROUPS) {
      const column = document.createElement("section");
      column.className = "equipment-column";
      column.dataset.column = group.id;
      const heading = document.createElement("h2");
      heading.className = "equipment-column-title";
      heading.textContent = group.label;
      column.appendChild(heading);

      const list = document.createElement("ul");
      list.className = "equipment-list";
      list.setAttribute("aria-label", `${group.label} slots`);

      for (const slot of group.slots) {
        const directItem = slotItem(slot);
        // The off-hand is "reserved" whenever main holds a 2H weapon — a
        // shield can't fit there, but we still render the 2H weapon's icon
        // ghosted so the constraint is visible. The check is a direct
        // "is the main-hand item two-handed?" rather than a derived flag.
        const reservedBy2H = slot === "offHand" && slotItem("mainHand")?.handedness === "twoHanded";
        const displayItem = reservedBy2H ? slotItem("mainHand") : directItem;
        const itemLabel = displayItem
          ? (reservedBy2H ? `${displayItem.name} (2H)` : displayItem.name)
          : "—";
        const li = document.createElement("li");
        li.className = "equipment-row";
        li.classList.toggle("selected", slot === selectedSlot);
        li.classList.toggle("indirect", reservedBy2H);
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", slot === selectedSlot ? "true" : "false");
        li.dataset.slot = slot;
        li.tabIndex = 0;
        li.innerHTML = `
          <span class="equipment-row-icon" aria-hidden="true"></span>
          <span class="equipment-row-text">
            <span class="equipment-row-label">${SLOT_LABELS[slot]}</span>
            <span class="equipment-row-item">${itemLabel}</span>
          </span>
        `;
        setIconBackground(li.querySelector(".equipment-row-icon"), displayItem);

        const select = () => {
          selectedSlot = slot;
          render();
          li.focus();
        };
        li.addEventListener("click", select);
        li.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            select();
          }
        });

        list.appendChild(li);
      }

      column.appendChild(list);
      columnsEl.appendChild(column);
    }
  };

  // Short, kind-aware stat line for the item card. Damage type / profile and
  // exact min/max ranges live on the item itself for tooltips later — keep
  // the card itself focused on "1H or 2H" and the rounded average attack.
  const itemStats = item => {
    if (item.equipmentKind === "weapon") {
      const handed = item.handedness === "twoHanded" ? "2H" : "1H";
      const avg = Math.round(((item.damageMin ?? 0) + (item.damageMax ?? 0)) / 2);
      return `${handed} · ${avg} dmg`;
    }
    if (item.equipmentKind === "shield") {
      const size = item.size ? `${item.size.charAt(0).toUpperCase()}${item.size.slice(1)}` : "";
      return size ? `${size} shield` : "Shield";
    }
    return "";
  };

  const renderItems = () => {
    const p = player();
    itemsEl.innerHTML = "";
    title.textContent = SLOT_LABELS[selectedSlot] ?? "Equipment";
    if (!p) {
      hint.textContent = "Start a run to manage equipment.";
      return;
    }

    const equipped = slotItem(selectedSlot);
    if (equipped) {
      const unequip = document.createElement("button");
      unequip.type = "button";
      unequip.className = "inventory-item inventory-unequip";
      unequip.textContent = `Unequip ${equipped.name}`;
      unequip.addEventListener("click", () => {
        p.unequipSlot(selectedSlot);
        render();
      });
      itemsEl.appendChild(unequip);
    }

    const compatible = p.compatibleInventoryItems(selectedSlot);
    const grouped = groupedCompatibleItems(compatible);
    const mainHand = slotItem("mainHand");
    const offHandReservedBy2H = selectedSlot === "offHand" && mainHand?.handedness === "twoHanded";
    if (offHandReservedBy2H) {
      hint.textContent = `Off hand is reserved by ${mainHand.name} (two-handed). Equipping a shield will unequip it.`;
    } else {
      hint.textContent = compatible.length > 0
        ? `${compatible.length} compatible item${compatible.length === 1 ? "" : "s"} across ${grouped.length} type${grouped.length === 1 ? "" : "s"}.`
        : "No compatible items in your inventory yet.";
    }

    for (const group of grouped) {
      const { item, instances } = group;
      const instanceToEquip = instances.find(candidate => candidate.instanceId !== equipped?.instanceId) ?? instances[0];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "inventory-item";
      if (instances.some(candidate => equipped?.instanceId === candidate.instanceId)) button.classList.add("equipped");
      const description = item.description ?? "";
      const stats = itemStats(item);
      button.innerHTML = `
        <span class="inventory-icon"></span>
        <span class="inventory-copy">
          <strong>${item.name} <span class="inventory-quantity">x${instances.length}</span></strong>
          ${description ? `<small class="inventory-description">${description}</small>` : ""}
          ${stats ? `<small class="inventory-stats">${stats}</small>` : ""}
        </span>
      `;
      setIconBackground(button.querySelector(".inventory-icon"), item);
      button.addEventListener("click", () => {
        const result = p.equipInventoryItem(instanceToEquip.instanceId, selectedSlot);
        hint.textContent = result.ok ? `${item.name} equipped.` : result.reason;
        renderSlots();
        renderItems();
      });
      itemsEl.appendChild(button);
    }
  };

  const render = () => {
    renderSlots();
    renderItems();
  };

  const open = () => {
    // Refuse to open the inventory before a run is in progress. Without a
    // live `session.player`, equip/unequip and the compatible-items list
    // would have nothing to talk about, and on desktop the inventory's
    // pause-while-open behavior would freeze the start screen.
    if (!gameState.session.player) return;
    clearKeys(gameState.keys);
    render();
    drawer.classList.add("active");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("inventory-open");
  };

  const close = () => {
    clearKeys(gameState.keys);
    drawer.classList.remove("active");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("inventory-open");
  };

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("active")) close();
    if (event.key.toLowerCase() === "i" && !event.repeat) {
      event.preventDefault();
      if (drawer.classList.contains("active")) close();
      else open();
    }
  });

  return { open, close, render };
}
