import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";
const AUTH_SECRET = process.env.AUTH_SECRET || "";

// rate limiting in-memory store (ip -> { count, firstAt })
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
type RateEntry = { count: number; firstAt: number; blockedUntil?: number };
const globalForRateLimit = globalThis as unknown as { __adminRateLimit?: Map<string, RateEntry> };
if (!globalForRateLimit.__adminRateLimit) {
  globalForRateLimit.__adminRateLimit = new Map<string, RateEntry>();
}
const rateMap: Map<string, RateEntry> = globalForRateLimit.__adminRateLimit;

function isProtected(path: string) {
  return path.startsWith("/admin") || path.startsWith("/api/admin");
}

async function verifySessionCookie(cookie?: string) {
  if (!cookie || !AUTH_SECRET) return false;
  const parts = cookie.split(".");
  if (parts.length !== 3) return false;
  const [payloadB64, expiresB64, sig] = parts;
  try {
    const payload = atob(payloadB64);
    const expires = parseInt(atob(expiresB64), 10);
    if (Date.now() > expires) return false;
    const msg = payloadB64 + "." + expiresB64;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(AUTH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
    const sigHex = Array.from(new Uint8Array(signature)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return sigHex === sig;
  } catch (err) {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!isProtected(pathname)) return NextResponse.next();

  // Allow valid session cookie first
  const cookie = req.cookies.get("admin_session")?.value;
  if (cookie && (await verifySessionCookie(cookie))) return NextResponse.next();

  // Rate-limiting by IP for Basic auth
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "local";
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, firstAt: now };
  if (entry.blockedUntil && now < entry.blockedUntil) {
    const retryAfterSec = Math.ceil((entry.blockedUntil - now) / 1000);
    return new NextResponse("Too many attempts - try again later", {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    });
  }

  if (now - entry.firstAt > RATE_LIMIT_WINDOW) {
    entry.count = 0;
    entry.firstAt = now;
    entry.blockedUntil = undefined;
  }

  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  try {
    const base64 = auth.split(" ")[1];
    const decoded = atob(base64);
    const [user, pass] = decoded.split(":");
    if (user === ADMIN_USER && ADMIN_PASS && pass === ADMIN_PASS) {
      // successful auth -> reset rate limit
      rateMap.delete(ip);
      return NextResponse.next();
    }
  } catch (err) {
    // fall through to 401
  }

  // failed attempt
  entry.count += 1;
  // when reaching limit, block for 5 minutes
  if (entry.count >= RATE_LIMIT_MAX) {
    entry.blockedUntil = now + 5 * 60 * 1000; // 5 minutes
    entry.count = 0;
    entry.firstAt = now;
    rateMap.set(ip, entry);
    return new NextResponse("Too many attempts - temporarily blocked", {
      status: 429,
      headers: { "Retry-After": String(5 * 60) },
    });
  }

  rateMap.set(ip, entry);

  return new NextResponse("Forbidden", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
