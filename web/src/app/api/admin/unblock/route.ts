import { NextResponse } from "next/server";
import { clearEntry } from "@/lib/adminRate";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const fileDir = path.join(process.cwd(), "src", "config", "backups");

function parseSessionUser(cookieHeader?: string) {
  try {
    if (!cookieHeader) return null;
    const m = cookieHeader.split(";").map((c) => c.trim());
    const sess = m.find((c) => c.startsWith("admin_session="));
    if (!sess) return null;
    const val = decodeURIComponent(sess.split("=")[1]);
    const parts = val.split(".");
    if (parts.length !== 3) return null;
    const [payloadB64, expiresB64, sig] = parts;
    const payload = Buffer.from(payloadB64, "base64").toString("utf8");
    const expires = Buffer.from(expiresB64, "base64").toString("utf8");
    const AUTH_SECRET = process.env.AUTH_SECRET || "";
    const h = crypto.createHmac("sha256", AUTH_SECRET).update(payloadB64 + "." + expiresB64).digest("hex");
    if (h !== sig) return null;
    const data = JSON.parse(payload);
    return data.user || null;
  } catch (err) {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ip = body.ip;
    if (!ip) return NextResponse.json({ error: "missing ip" }, { status: 400 });
    clearEntry(ip);
    // append audit trail
    try {
      await fs.mkdir(fileDir, { recursive: true });
      const auditPath = path.join(fileDir, "audit.log");
      const user = parseSessionUser(req.headers.get("cookie") || undefined) || "unknown";
      const line = `${new Date().toISOString()}\tUNBLOCK\t${ip}\tby:${user}\n`;
      await fs.appendFile(auditPath, line, "utf8");
    } catch (err) {
      // ignore logging failures
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
