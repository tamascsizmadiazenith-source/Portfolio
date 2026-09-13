import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const backupsDir = path.join(process.cwd(), "src", "config", "backups");

export async function GET() {
  try {
    await fs.mkdir(backupsDir, { recursive: true });
    const files = await fs.readdir(backupsDir);
    // return sorted list (newest first)
    const items = await Promise.all(
      files.map(async (f) => {
        const stat = await fs.stat(path.join(backupsDir, f));
        return { name: f, mtime: stat.mtime.getTime() };
      })
    );
    items.sort((a, b) => b.mtime - a.mtime);
    return NextResponse.json(items.map((i) => i.name));
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
