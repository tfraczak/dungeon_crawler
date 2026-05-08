const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);
const LOWER_A = "a".charCodeAt(0);
const LOWER_Z = "z".charCodeAt(0);

const cycle = (code, base, n) => (((code - base + n) % 26 + 26) % 26) + base;

export const rotate = (text, n) => Array.from(text).map((char) => {
  const code = char.charCodeAt(0);
  if (code >= A && code <= Z) return String.fromCharCode(cycle(code, A, n));
  if (code >= LOWER_A && code <= LOWER_Z) return String.fromCharCode(cycle(code, LOWER_A, n));
  return char;
}).join("");

export const nudge = (text, n) => Array.from(text)
  .map((char) => String.fromCharCode(char.charCodeAt(0) + n))
  .join("");
