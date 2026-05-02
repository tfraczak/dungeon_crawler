const TOKEN_BY_KEY = Object.freeze({
  ArrowUp: "A",
  ArrowDown: "B",
  ArrowLeft: "C",
  ArrowRight: "D",
  b: "E",
  a: "F",
});
const TOKEN_BY_CODE = Object.freeze({
  ArrowUp: "A",
  ArrowDown: "B",
  ArrowLeft: "C",
  ArrowRight: "D",
  KeyB: "E",
  KeyA: "F",
});

const BASE_SHIFT = 7;
const BASE_TARGET = "HHIIJKJKLM";
const TIMEOUT_MS = 2000;

const randomShift = () => 1 + Math.floor(Math.random() * 20);
const shiftToken = (token, shift) => String.fromCharCode(token.charCodeAt(0) + shift);
const reencodeTarget = (target, fromShift, toShift) => (
  Array.from(target)
    .map(char => String.fromCharCode(char.charCodeAt(0) - fromShift + toShift))
    .join("")
);

const tokenFor = (event) => (
  TOKEN_BY_KEY[event.key]
  ?? TOKEN_BY_KEY[String(event.key).toLowerCase()]
  ?? TOKEN_BY_CODE[event.code]
  ?? null
);

export default function installAdditionalAccess({ onUnlock }) {
  const sessionShift = randomShift();
  const target = reencodeTarget(BASE_TARGET, BASE_SHIFT, sessionShift);
  let buffer = "";
  let lastAcceptedAt = 0;
  let unlocked = false;

  document.addEventListener("keydown", (event) => {
    if (unlocked) return;
    if (event.repeat) return;
    const token = tokenFor(event);
    if (!token) return;

    const now = Date.now();
    if (lastAcceptedAt && now - lastAcceptedAt > TIMEOUT_MS) buffer = "";
    lastAcceptedAt = now;

    const encoded = shiftToken(token, sessionShift);
    const candidate = buffer + encoded;
    if (target.startsWith(candidate)) {
      buffer = candidate;
    } else {
      buffer = target.startsWith(encoded) ? encoded : "";
    }

    if (buffer === target) {
      unlocked = true;
      buffer = "";
      onUnlock?.();
    }
  });
}
