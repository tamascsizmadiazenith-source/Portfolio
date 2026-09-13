import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "src", "config", "shopify-variants.json");
const backupsDir = path.join(process.cwd(), "src", "config", "backups");

async function ensureBackupsDir() {
  await fs.mkdir(backupsDir, { recursive: true });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const backupName = url.searchParams.get("backup");
    if (backupName) {
      const bpath = path.join(backupsDir, backupName);
      const raw = await fs.readFile(bpath, "utf8");
      return NextResponse.json(JSON.parse(raw));
    }

    const raw = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(raw);
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const variants = body.variants;
    if (!variants || typeof variants !== "object") {
      return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    await ensureBackupsDir();
    // create timestamped backup of current file
    try {
      const existing = await fs.readFile(filePath, "utf8");
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupName = `shopify-variants-${timestamp}.json`;
      const backupPath = path.join(backupsDir, backupName);
      await fs.writeFile(backupPath, existing, "utf8");
    } catch (readErr) {
      // ignore if original doesn't exist yet
    }

    await fs.writeFile(filePath, JSON.stringify(variants, null, 2), "utf8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
