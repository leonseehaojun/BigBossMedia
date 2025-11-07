import "./loadEnv.js";
import { Resend } from "resend";

let resend;
const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resend) {
    resend = new Resend(key);
  }
  return resend;
};

const ADMIN_INBOX = process.env.CONTACT_RECIPIENT || "leonsee1000@yahoo.com.sg";
const FROM_EMAIL = process.env.CONTACT_FROM || "noreply@bigbossmedia.sg";

const validateEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }

  const client = getResend();
  if (!client) {
    console.error("Missing RESEND_API_KEY environment variable");
    return res.status(500).json({ error: "Email service is not configured" });
  }

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_INBOX,
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    await client.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "We received your message!",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to <strong>Big Boss Media</strong>.</p>
        <p>We’ve received your message and our team will get back to you soon.</p>
        <p style="margin-top:24px;">— The Big Boss Media Team</p>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    const detail =
      typeof error?.message === "string" ? error.message : "Failed to send message";
    return res.status(500).json({ error: detail });
  }
}
