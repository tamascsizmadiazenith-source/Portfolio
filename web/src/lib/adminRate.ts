type Entry = { count: number; firstAt: number; blockedUntil?: number };

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

const globalForRateLimit = globalThis as unknown as { __serverAdminRate?: Map<string, Entry> };
if (!globalForRateLimit.__serverAdminRate) {
  globalForRateLimit.__serverAdminRate = new Map<string, Entry>();
}

const store: Map<string, Entry> = globalForRateLimit.__serverAdminRate;

export function recordFailed(ip: string) {
  const now = Date.now();
  const e = store.get(ip) ?? { count: 0, firstAt: now };
  if (now - e.firstAt > RATE_LIMIT_WINDOW) {
    e.count = 0;
    e.firstAt = now;
    e.blockedUntil = undefined;
  }
  e.count += 1;
  if (e.count >= RATE_LIMIT_MAX) {
    e.blockedUntil = now + 5 * 60 * 1000; // 5 minutes
    e.count = 0;
    e.firstAt = now;
    try {
      // send alert asynchronously, don't block
      import("@/lib/adminNotify").then((m) => m.sendBlockAlert(ip)).catch(() => {});
    } catch (err) {
      // ignore
    }
  }
  store.set(ip, e);
}

export function clearEntry(ip: string) {
  store.delete(ip);
}

export function listBlocked() {
  const now = Date.now();
  const items: { ip: string; blockedUntil: number }[] = [];
  for (const [ip, e] of store.entries()) {
    if (e.blockedUntil && e.blockedUntil > now) items.push({ ip, blockedUntil: e.blockedUntil });
  }
  items.sort((a, b) => a.blockedUntil - b.blockedUntil);
  return items;
}
