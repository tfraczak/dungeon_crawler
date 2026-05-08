const SCHEMA_VERSION = 1;

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const isPlainObject = (value) => (
  value != null
  && typeof value === "object"
  && !Array.isArray(value)
);

const stripFence = (raw) => {
  const trimmed = String(raw ?? "").trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
};

const readString = (payload, key, required = true) => {
  const value = payload[key];
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  if (!required) return "";
  throw new Error(`Missing ${key}.`);
};

export const parseSoundDefinition = (raw) => {
  const body = stripFence(raw);
  if (!body) throw new Error("Paste a sound definition first.");

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    throw new Error("Paste valid JSON.");
  }

  if (!isPlainObject(payload)) throw new Error("Definition must be a JSON object.");
  if (payload.schemaVersion !== SCHEMA_VERSION) {
    throw new Error(`Unsupported schema version: ${payload.schemaVersion ?? "missing"}.`);
  }

  const kind = readString(payload, "kind");
  if (kind !== "tunable_recipe" && kind !== "profile_synth") {
    throw new Error(`Unsupported sound kind: ${kind}.`);
  }

  const normalized = {
    kind,
    sound: readString(payload, "sound"),
    name: readString(payload, "name"),
    description: readString(payload, "description", false),
  };

  if (kind === "tunable_recipe") {
    if (!isPlainObject(payload.params)) throw new Error("Tunable recipes require params.");
    normalized.params = deepClone(payload.params);
    normalized.profiles = Array.isArray(payload.profiles) ? deepClone(payload.profiles) : [];
  } else {
    if (!Array.isArray(payload.profiles)) throw new Error("Profile synth sounds require profiles.");
    normalized.profiles = deepClone(payload.profiles);
  }

  return normalized;
};
