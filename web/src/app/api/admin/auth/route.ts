import { NextResponse } from "next/server";
import crypto from "crypto";
import { recordFailed, clearEntry } from "@/lib/adminRate";

const AUTH_SECRET = process.env.AUTH_SECRET || "";

function makeSessionCookie(user: string) {
  const payload = JSON.stringify({ user });
  const expires = Date.now() + 1000 * 60 * 60 * 24; // 24h
  const payloadB64 = Buffer.from(payload).toString("base64");
  const expiresB64 = Buffer.from(String(expires)).toString("base64");
  const sig = crypto.createHmac("sha256", AUTH_SECRET).update(payloadB64 + "." + expiresB64).digest("hex");
  return `${payloadB64}.${expiresB64}.${sig}`;
}

export async function POST(req: Request) {
  try {
    if (!AUTH_SECRET) return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
    const body = await req.json();
    const { user, pass } = body;
    const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "local";
    if (user === ADMIN_USER && ADMIN_PASS && pass === ADMIN_PASS) {
      clearEntry(ip as string);
      const session = makeSessionCookie(user);
      const res = NextResponse.json({ ok: true });
      res.cookies.set("admin_session", session, { httpOnly: true, path: "/", secure: process.env.NODE_ENV === "production" });
      return res;
    }
    // record failed attempt for admin login form
    recordFailed(ip as string);
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
