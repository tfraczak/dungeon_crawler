const DEFAULT_SHIFT = 7;
const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);
const LOWER_A = "a".charCodeAt(0);
const LOWER_Z = "z".charCodeAt(0);

const unshiftCode = (code, base) => (
  ((code - base - DEFAULT_SHIFT + 26) % 26) + base
);

export const getText = text => Array.from(text).map((char) => {
  const code = char.charCodeAt(0);
  if (code >= A && code <= Z) return String.fromCharCode(unshiftCode(code, A));
  if (code >= LOWER_A && code <= LOWER_Z) return String.fromCharCode(unshiftCode(code, LOWER_A));
  return char;
}).join("");
