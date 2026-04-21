// Centralized formatter for the "Copy values" payload. Two shapes:
//
//   tunable_recipe — existing bespoke game sounds whose tunability surface
//                    is a flat <NAME>_PARAMS object. Carries `params`, plus
//                    an optional `profiles` array (extra Sound Profiles
//                    layered on top of the bespoke synthesis). When extras
//                    are present we also emit `extraProfilesConstName`
//                    (e.g. `COIN_PICKUP_EXTRA_PROFILES`) so I know what
//                    sibling const to add and to tail-call from inside the
//                    existing play function via `playProfileSynth(...)`.
//   profile_synth  — click + presets + user customs. Carries `profiles`.
//
// Both shapes always include `schemaVersion`, `sound` (stable id), `kind`,
// the user-edited `name` + `description`, and the derived `filename` /
// `functionName` (so when I receive a payload I can route it to the right
// file or create a new one without guessing). Built-in entries also carry
// `sourceFile` + `constName` so I know the existing module + frozen
// defaults const to update in place; user customs omit those fields,
// signaling "create a new module."
//
// Centralizing the shape here means a future schema bump only touches this
// file (and storage.js).

import { toSnakeCase, toLowerCamelCase } from "./naming";

const SCHEMA_VERSION = 1;

// Build the payload object for either kind. `entry` is the registry entry,
// `current` is the live merged values currently in the UI (defaults +
// overrides), and `meta` is `{ name, description }` (the user-edited
// header block values).
//
// Returned object is the raw JS structure; the renderer wraps it in a
// fenced ```json block before writing to the clipboard so it pastes
// cleanly.
export const formatPayload = (entry, current, meta) => {
  const name = (meta?.name ?? entry.defaultName ?? "").trim();
  const description = (meta?.description ?? entry.defaultDescription ?? "").trim();
  const filename = toSnakeCase(name);
  const functionName = toLowerCamelCase(name);

  const base = {
    schemaVersion: SCHEMA_VERSION,
    sound: entry.id,
    kind: entry.kind,
    name,
    description,
    filename,
    functionName,
  };

  if (entry.sourceFile) base.sourceFile = entry.sourceFile;
  if (entry.constName) base.constName = entry.constName;

  if (entry.kind === "tunable_recipe") {
    // `current` may be either a bare params object (legacy) or
    // `{ params, profiles }` (post-layered-profiles). Accept both.
    const params = current && typeof current === "object" && "params" in current
      ? current.params
      : current;
    base.params = { ...(params ?? {}) };

    const extras = current && typeof current === "object" && Array.isArray(current.profiles)
      ? current.profiles
      : [];
    if (extras.length > 0) {
      base.profiles = JSON.parse(JSON.stringify(extras));
      // Prefer an explicit `extraProfilesConstName` from the registry
      // entry. Required for sounds whose `constName` is a dotted path
      // (e.g. FOOTSTEP_PARAMS.sprinting -- naive suffixing would yield
      // `FOOTSTEP_PARAMS.sprinting_EXTRA_PROFILES`, not a valid JS
      // identifier). Otherwise derive from constName by replacing the
      // `_PARAMS` suffix.
      if (entry.extraProfilesConstName) {
        base.extraProfilesConstName = entry.extraProfilesConstName;
      } else if (entry.constName) {
        base.extraProfilesConstName = entry.constName.endsWith("_PARAMS")
          ? entry.constName.replace(/_PARAMS$/, "_EXTRA_PROFILES")
          : `${entry.constName}_EXTRA_PROFILES`;
      }
    }
  } else if (entry.kind === "profile_synth") {
    // Deep-clone the profiles so downstream callers can't mutate the live
    // state by accident.
    base.profiles = JSON.parse(JSON.stringify(current?.profiles ?? current ?? []));
  }

  return base;
};

// Same payload object, pre-stringified and wrapped in a fenced ```json block
// for the clipboard.
export const formatPayloadString = (entry, current, meta) => {
  const payload = formatPayload(entry, current, meta);
  return "```json\n" + JSON.stringify(payload, null, 2) + "\n```";
};
