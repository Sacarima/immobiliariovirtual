// controllers/newsletter.controller.js
import NewsletterSubscriber from "../models/newsletterSubscriber.model.js";

const isEmail = (v) => /.+@.+\..+/.test(v || '');

export async function subscribe(req, res) {
  try {
    const { email, name = '', consent = false, tags = [], source = 'web' } = req.body || {};
    if (!isEmail(email)) return res.status(400).json({ ok: false, message: 'Valid email is required' });
    if (!consent)      return res.status(400).json({ ok: false, message: 'Consent is required' });

    const payload = {
      email: String(email).trim().toLowerCase(),
      name: String(name || '').trim(),
      consent: Boolean(consent),
      source,
      ip: req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
      userAgent: req.get('user-agent') || '',
      status: 'subscribed',
      unsubscribedAt: null,
    };

    // upsert: create if new, else update existing (e.g., resubscribe)
    const doc = await NewsletterSubscriber.findOneAndUpdate(
      { email: payload.email },
      {
        $set: {
          ...payload,
          // merge tags uniquely
        },
        $addToSet: { tags: { $each: Array.isArray(tags) ? tags : [] } },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      ok: true,
      message: 'Subscribed',
      data: { id: doc._id, email: doc.email, status: doc.status },
    });
  } catch (err) {
    // handle duplicate email race conditions
    if (err?.code === 11000) {
      return res.status(200).json({ ok: true, message: 'Already subscribed' });
    }
    console.error('subscribe error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

export async function check(req, res) {
  try {
    const email = String(req.query.email || '').trim().toLowerCase();
    if (!isEmail(email)) return res.status(400).json({ ok: false, message: 'Valid email is required' });

    const doc = await NewsletterSubscriber.findOne({ email }).lean();
    return res.status(200).json({
      ok: true,
      exists: !!doc,
      status: doc?.status || null,
      unsubscribedAt: doc?.unsubscribedAt || null,
    });
  } catch (err) {
    console.error('check error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

export async function unsubscribe(req, res) {
  try {
    const { email } = req.body || {};
    if (!isEmail(email)) return res.status(400).json({ ok: false, message: 'Valid email is required' });

    const doc = await newsletterSubscriber.findOneAndUpdate(
      { email: String(email).trim().toLowerCase() },
      { $set: { status: 'unsubscribed', unsubscribedAt: new Date() } },
      { new: true }
    );

    // idempotent: OK even if not found
    return res.status(200).json({
      ok: true,
      message: 'Unsubscribed',
      data: doc ? { id: doc._id, email: doc.email } : null,
    });
  } catch (err) {
    console.error('unsubscribe error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}