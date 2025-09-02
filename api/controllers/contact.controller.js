// api/controllers/contact.controller.js
import ContactMessage from '../models/contactMessage.model.js';
import nodemailer from 'nodemailer';

const isEmail = (v) => /.+@.+\..+/.test(v || '');

function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (k in obj) out[k] = obj[k];
  return out;
}

export async function createContact(req, res) {
  try {
    const body = req.body || {};
    const { name = '', email = '', phone = '', subject = 'General', message = '', consent = false } = body;

    // server-side validations mirroring your frontend
    if (!name.trim())   return res.status(400).json({ ok: false, message: 'Name is required' });
    if (!isEmail(email)) return res.status(400).json({ ok: false, message: 'Valid email is required' });
    if (!message.trim()) return res.status(400).json({ ok: false, message: 'Message is required' });
    if (!consent)        return res.status(400).json({ ok: false, message: 'Consent is required' });

    // optional honeypot: if present and non-empty, silently accept without action
    if (typeof body.hp === 'string' && body.hp.trim()) {
      return res.status(200).json({ ok: true, message: 'Received' });
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      subject: String(subject || 'General').trim(),
      message: String(message).trim(),
      consent: Boolean(consent),
      ip: req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',
      userAgent: req.get('user-agent') || '',
      // keep hp if you decide to send it
      hp: typeof body.hp === 'string' ? body.hp : undefined,
    };

    const doc = await ContactMessage.create(payload);

    // optional email notification (fires iff SMTP env vars are set)
    await maybeSendEmail(doc).catch((err) => {
      // Don’t fail the request if email sending fails
      console.error('contact email error:', err?.message || err);
    });

    return res.status(201).json({ ok: true, message: 'Received', data: pick(doc, ['_id', 'status']) });
  } catch (err) {
    console.error('createContact error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

/** Send email only if SMTP env is configured */
async function maybeSendEmail(doc) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM || !MAIL_TO) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subjectLine = `New contact: ${doc.subject} — ${doc.name}`;
  const text = [
    `Subject: ${doc.subject}`,
    `Name: ${doc.name}`,
    `Email: ${doc.email}`,
    `Phone: ${doc.phone || '-'}`,
    `Consent: ${doc.consent ? 'yes' : 'no'}`,
    `IP: ${doc.ip || '-'}`,
    `User-Agent: ${doc.userAgent || '-'}`,
    '',
    'Message:',
    doc.message,
  ].join('\n');

  await transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: subjectLine,
    text,
  });
}
