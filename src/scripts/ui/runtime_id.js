const randomPart = () => Math.random().toString(36).slice(2, 10);

export const runtimeId = (prefix) => `${prefix}-${Date.now().toString(36)}-${randomPart()}`;
