import fs from "fs/promises";
import path from "path";

const ALERT_TO = process.env.ALERT_TO || "tamas@csizmadia.net";

export async function sendBlockAlert(ip: string) {
  const from = process.env.SMTP_FROM || `no-reply@${process.env.NOW_URL || "localhost"}`;

  const subject = `Blocked IP: ${ip} on Csizmadia admin`;
  const body = `The IP ${ip} was blocked due to repeated failed admin login attempts at ${new Date().toISOString()}.`;

  // Prefer SendGrid HTTP API
  const sgKey = process.env.SENDGRID_API_KEY;
  if (sgKey) {
    try {
      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sgKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: ALERT_TO }] }],
          from: { email: from },
          subject,
          content: [{ type: "text/plain", value: body }],
        }),
      });
      return;
    } catch (err) {
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
      // eslint-disable-next-line no-eval
      const requireFn = eval("require");
      const nodemailer = requireFn("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort || 587,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({ from, to: ALERT_TO, subject, text: body });
      return;
    } catch (err) {
      // fallthrough to logging
    }
  }

  // Fallback: append to alerts log
  try {
    const dir = path.join(process.cwd(), "src", "config", "backups");
    await fs.mkdir(dir, { recursive: true });
    const logPath = path.join(dir, "alerts.log");
    const line = `${new Date().toISOString()}\tBLOCKED ${ip} - could not send email\n`;
    await fs.appendFile(logPath, line, "utf8");
  } catch (err) {
    // ignore
  }
}
