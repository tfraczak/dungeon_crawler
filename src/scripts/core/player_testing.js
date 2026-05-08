export const TEST_IDS = Object.freeze({
  a: "c0",
  b: "c1",
  c: "c2",
  d: "c3",
  e: "c4",
});

export const TEST_KEYS = Object.freeze(Object.values(TEST_IDS));

const BOOLEAN_KEYS = Object.freeze([
  TEST_IDS.a,
  TEST_IDS.b,
  TEST_IDS.c,
]);

const STRING_KEYS = Object.freeze([
  TEST_IDS.d,
  TEST_IDS.e,
]);

const STORAGE_KEY = "runPrefs";
const isProd = process.env.NODE_ENV === "production";
const STATE = {};
for (const key of BOOLEAN_KEYS) STATE[key] = false;
for (const key of STRING_KEYS) STATE[key] = "";

if (!isProd && typeof window !== "undefined") {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      for (const key of BOOLEAN_KEYS) {
        if (typeof saved[key] === "boolean") STATE[key] = saved[key];
      }
      for (const key of STRING_KEYS) {
        if (typeof saved[key] === "string") STATE[key] = saved[key];
      }
    }
  } catch { /* corrupted or unavailable -- fall back to defaults */ }
}

const persist = () => {
  if (isProd || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
  } catch { /* storage may be unavailable; values still work for this session */ }
};

export const isTestKey = key => TEST_KEYS.includes(key);
export const isTestBooleanKey = key => BOOLEAN_KEYS.includes(key);
export const isTestStringKey = key => STRING_KEYS.includes(key);
export const getTestValue = key => STATE[key];

export const setTestValue = (key, value) => {
  if (!isTestKey(key)) return;
  if (isTestBooleanKey(key)) {
    STATE[key] = Boolean(value);
    persist();
    return;
  }
  if (isTestStringKey(key)) {
    STATE[key] = typeof value === "string" ? value : "";
    persist();
  }
};

export const resetTestValues = () => {
  for (const key of BOOLEAN_KEYS) STATE[key] = false;
  for (const key of STRING_KEYS) STATE[key] = "";
  persist();
};

export default STATE;
