// api/models/ContactMessage.js
import mongoose from 'mongoose';

const emailRegex = /.+@.+\..+/;

const ContactMessageSchema = new mongoose.Schema(
  {
    name:      { type: String, trim: true, required: true, maxlength: 120 },
    email:     { type: String, trim: true, lowercase: true, required: true, match: [emailRegex, 'Invalid email'] },
    phone:     { type: String, trim: true, default: '' },
    subject:   { type: String, trim: true, default: 'General', maxlength: 120 },
    message:   { type: String, trim: true, required: true, maxlength: 5000 },
    consent:   { type: Boolean, default: false, index: true },
    status:    { type: String, enum: ['new', 'read', 'archived'], default: 'new', index: true },
    ip:        { type: String },
    userAgent: { type: String },
    // optional honeypot capture if you decide to send it
    hp:        { type: String, select: false },
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', ContactMessageSchema);
