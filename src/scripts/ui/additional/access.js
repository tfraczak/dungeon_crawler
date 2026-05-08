import DEV_FLAGS from "@core/dev_flags";
import Random from "@utils/random";
import { nudge } from "@utils/letters";
import { resolveBase } from "./lookup";

const KEY_MAP = Object.freeze({
  ArrowUp: "A",
  ArrowDown: "B",
  ArrowLeft: "C",
  ArrowRight: "D",
  b: "E",
  a: "F",
  m: "G",
  o: "H",
  n: "I",
  t: "J",
  u: "K",
  e: "L",
  w: "M",
  d: "N",
  h: "O",
  r: "P",
  f: "Q",
  i: "R",
  s: "S",
});
const CODE_MAP = Object.freeze({
  ArrowUp: "A",
  ArrowDown: "B",
  ArrowLeft: "C",
  ArrowRight: "D",
  KeyB: "E",
  KeyA: "F",
  KeyM: "G",
  KeyO: "H",
  KeyN: "I",
  KeyT: "J",
  KeyU: "K",
  KeyE: "L",
  KeyW: "M",
  KeyD: "N",
  KeyH: "O",
  KeyR: "P",
  KeyF: "Q",
  KeyI: "R",
  KeyS: "S",
});

const OFFSET = 7;
const STEM = "HHIIJKJKLM";
const TIMEOUT_MS = 2000;

const read = (event) => (
  KEY_MAP[event.key]
  ?? KEY_MAP[String(event.key).toLowerCase()]
  ?? CODE_MAP[event.code]
  ?? null
);

export default function installAdditionalAccess({ onComplete }) {
  const sessionOffset = Random.int(1, 20);
  let buffer = "";
  let prev = null;
  let lastAcceptedAt = 0;
  let done = false;

  document.addEventListener("keydown", (event) => {
    if (done) return;
    if (event.repeat) return;
    const char = read(event);
    if (!char) return;

    const expected = nudge(STEM + resolveBase(DEV_FLAGS.additionalForcedLabel), sessionOffset - OFFSET);
    if (expected !== prev) {
      buffer = "";
      prev = expected;
    }

    const now = Date.now();
    if (lastAcceptedAt && now - lastAcceptedAt > TIMEOUT_MS) buffer = "";
    lastAcceptedAt = now;

    const encoded = nudge(char, sessionOffset);
    const candidate = buffer + encoded;
    if (expected.startsWith(candidate)) {
      buffer = candidate;
    } else {
      buffer = expected.startsWith(encoded) ? encoded : "";
    }

    if (buffer === expected) {
      done = true;
      buffer = "";
      onComplete?.();
    }
  });
}
