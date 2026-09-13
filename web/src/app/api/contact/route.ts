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

  const { name, email, subject, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !EMAIL_RE.test(email.trim()) ||
    typeof subject !== "string" || !subject.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Please fill in all fields with a valid email address." }, { status: 400 });
  }

  const text = `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;

  const sent = await sendMail({
    subject: `[Contact] ${subject}`,
    text,
    replyTo: email,
  });

  if (!sent) {
    return NextResponse.json({ error: "Could not send message right now. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
