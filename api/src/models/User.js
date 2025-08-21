import mongoose from 'mongoose';
import { encryptField, decryptField } from '../utils/crypto.js';

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, index: true, unique: true },
  role: { type: String, enum: ['owner','admin'], default: 'owner' },
  firstName: String,
  lastName: String,
  email: { type: String, get: decryptField, set: encryptField },
  phone: { type: String, get: decryptField, set: encryptField },
  language: { type: String, enum: ['ru','en'], default: 'ru' },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  guests: [{ name: String, phone: { type: String, get: decryptField, set: encryptField } }],
  notifications: { booking: { type: Boolean, default: true }, exchange: { type: Boolean, default: true } }
}, { timestamps: true, toJSON: { getters: true } });

export default mongoose.model('User', userSchema);
