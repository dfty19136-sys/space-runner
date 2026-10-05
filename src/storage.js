const KEY = 'sr_best';
export function getBest() {
  try { return +localStorage.getItem(KEY) || 0; } catch { return 0; }
}
export function setBest(v) {
  try { localStorage.setItem(KEY, v); } catch {}
}