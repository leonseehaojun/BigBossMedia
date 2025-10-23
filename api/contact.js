// /api/contact.js
import { Resend } from 'resend';

// Initialize the Resend API client with your API key (set this in Vercel > Environment Variables)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1️⃣ Send the message to the admin inbox
    await resend.emails.send({
      from: 'noreply@bigbossmedia.sg',
      to: 'admin@bigbossmedia.sg',
      subject: `📬 New Contact Message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // 2️⃣ Send an auto-reply to the customer
    await resend.emails.send({
      from: 'noreply@bigbossmedia.sg',
      to: email,
      subject: 'We received your message!',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to <strong>Big Boss Media</strong>.</p>
        <p>We’ve received your message and our team will get back to you soon.</p>
        <br>
        <p>— The Big Boss Media Team</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send message', details: error });
  }
}
