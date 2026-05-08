export const INDEXED_BASES = Object.freeze(["ZRP", "NOP", "QRS", "TSU", "QVR", "XWY", "ZMQ"]);

const LABELS = process.env.NODE_ENV !== "production"
  ? Object.freeze({ sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 })
  : null;

export const resolveBase = (label) => {
  const idx = (LABELS && label && LABELS[label] != null) ? LABELS[label] : new Date().getDay();
  return INDEXED_BASES[idx];
};
