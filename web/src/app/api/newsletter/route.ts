import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email } = (body ?? {}) as Record<string, unknown>;

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const sent = await sendMail({
    subject: "New newsletter subscription",
    text: `New newsletter subscriber: ${email}`,
    replyTo: email,
  });

  if (!sent) {
    return NextResponse.json({ error: "Could not subscribe right now. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
