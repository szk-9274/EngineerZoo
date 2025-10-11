// app/lib/storage.ts
const KEY = "engineer-zoo/v1";

export function loadState<T>(fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveState<T>(state: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function resetState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
