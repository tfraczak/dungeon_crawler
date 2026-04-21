// Versioned localStorage shim for the Dev Sound Sandbox. Two key shapes:
//
//   dungeon-sandbox:v1:sound:<id>      JSON: { name?, description?, params? | profiles? }
//                                       Per-built-in-sound override blob. Empty / missing
//                                       keys mean "use the registry default".
//
//   dungeon-sandbox:v1:custom-sounds   JSON: Array<{ id, name, description, profiles }>
//                                       User-created experimental sounds. These always
//                                       store the full profile set rather than deltas
//                                       since there is no "default" to fall back to.
//
// The schema-version prefix (`v1`) lets future migrations bump to v2 without
// stomping on existing entries. Until then, every read is best-effort: any
// JSON parse failure or invalid shape returns the safe fallback (null /
// empty array) and silently rebuilds clean state. This drawer is dev-only,
// so we explicitly do NOT try to recover partial state — getting back to
// "as if you'd never set it" is the safest thing we can do for the user.
//
// All writes are debounced from the renderer side (~150 ms) so rapid slider
// dragging doesn't hammer localStorage. This module itself is fire-and-forget
// per call.

const SCHEMA_VERSION = 1;
const PREFIX = `dungeon-sandbox:v${SCHEMA_VERSION}`;
const CUSTOM_SOUNDS_KEY = `${PREFIX}:custom-sounds`;
const soundKey = (id) => `${PREFIX}:sound:${id}`;

const safeParse = (raw, fallback) => {
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const lsGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const lsSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Quota exceeded or storage disabled. Nothing useful we can do here in
    // a dev-only drawer beyond eat the error and let the user keep editing
    // in-memory until they reload.
  }
};

const lsRemove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignored
  }
};

// ---------------------------------------------------------------------------
// Per-sound overrides (built-in entries: existing game sounds + click + presets).
// ---------------------------------------------------------------------------

// Returns `{ name?, description?, params? | profiles? }` for a built-in
// sound, or null if the user has never edited it. Caller merges what's
// present onto the registry defaults.
export const readOverrides = (soundId) => safeParse(lsGet(soundKey(soundId)), null);

export const writeOverrides = (soundId, overrides) => {
  if (!overrides || Object.keys(overrides).length === 0) {
    clearOverrides(soundId);
    return;
  }
  lsSet(soundKey(soundId), JSON.stringify(overrides));
};

export const clearOverrides = (soundId) => lsRemove(soundKey(soundId));

// ---------------------------------------------------------------------------
// Custom sounds (user-spawned experiments). These are the only sound
// definitions that live ENTIRELY in localStorage; they have no source-code
// counterpart until the user copies the payload and asks me to promote one.
// ---------------------------------------------------------------------------

export const listCustomSounds = () => {
  const arr = safeParse(lsGet(CUSTOM_SOUNDS_KEY), []);
  return Array.isArray(arr) ? arr : [];
};

const writeCustomSounds = (arr) => {
  lsSet(CUSTOM_SOUNDS_KEY, JSON.stringify(arr));
};

// Insert or update a custom sound. `id` is the stable slug; the rest is the
// editable shape (name, description, profiles array). Replaces any existing
// entry with the same id, or appends if new.
export const saveCustomSound = (sound) => {
  if (!sound || !sound.id) return;
  const arr = listCustomSounds();
  const i = arr.findIndex((entry) => entry.id === sound.id);
  if (i >= 0) {
    arr[i] = { ...arr[i], ...sound };
  } else {
    arr.push(sound);
  }
  writeCustomSounds(arr);
};

export const deleteCustomSound = (id) => {
  const arr = listCustomSounds();
  const next = arr.filter((entry) => entry.id !== id);
  if (next.length !== arr.length) writeCustomSounds(next);
};

export const isCustomSoundIdTaken = (id) => listCustomSounds().some((entry) => entry.id === id);
