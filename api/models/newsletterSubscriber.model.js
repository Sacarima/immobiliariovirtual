// models/NewsletterSubscriber.js
import mongoose from 'mongoose';

const emailRegex = /.+@.+\..+/;

const NewsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, 'Invalid email'],
      unique: true, // prevent duplicates
      index: true,
    },
    name: { type: String, trim: true, default: '' },
    consent: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'subscribed', 'unsubscribed'],
      default: 'subscribed',
      index: true,
    },
    tags: { type: [String], default: [] },
    source: { type: String, default: 'web' }, // e.g. 'web','mobile','partner'
    ip: { type: String },
    userAgent: { type: String },
    unsubscribedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// keep only one record per email (unique index already enforces it)
// ensure case-insensitive uniqueness via lowercase: true on the field
export default mongoose.models.NewsletterSubscriber ||
  mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
