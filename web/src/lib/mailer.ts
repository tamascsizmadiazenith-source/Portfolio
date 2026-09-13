const DEFAULT_TO = process.env.ALERT_TO || "tamas@csizmadia.net";

type SendMailOptions = {
  subject: string;
  text: string;
  replyTo?: string;
  to?: string;
};

export async function sendMail({ subject, text, replyTo, to }: SendMailOptions) {
  const from = process.env.SMTP_FROM || `no-reply@${process.env.NOW_URL || "localhost"}`;
  const recipient = to || DEFAULT_TO;

  // Prefer SendGrid HTTP API
  const sgKey = process.env.SENDGRID_API_KEY;
  if (sgKey) {
    try {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sgKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: recipient }] }],
          from: { email: from },
          reply_to: replyTo ? { email: replyTo } : undefined,
          subject,
          content: [{ type: "text/plain", value: text }],
        }),
      });
      if (res.ok) return true;
    } catch {
      // fallthrough to SMTP or logging
    }
  }

  // If SMTP env configured, try nodemailer via dynamic require (avoid static bundling)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  if (smtpHost && smtpUser && smtpPass) {
    try {
      // use eval to avoid bundler resolving 'nodemailer' at build time
      const requireFn = eval("require");
      const nodemailer = requireFn("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort || 587,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({ from, to: recipient, replyTo, subject, text });
      return true;
    } catch {
      // fallthrough to logging
    }
  }

  // No mail transport configured — log so the message isn't silently lost.
  console.error("sendMail: no SENDGRID_API_KEY or SMTP_* configured; message not delivered", {
    subject,
    to: recipient,
  });
  return false;
}
