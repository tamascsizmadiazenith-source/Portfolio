import { NextResponse } from "next/server";
import { listBlocked } from "@/lib/adminRate";

export async function GET() {
  try {
    const items = listBlocked();
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
