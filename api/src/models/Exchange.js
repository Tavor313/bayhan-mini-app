import mongoose from 'mongoose';

const exchangeSchema = new mongoose.Schema({
  requesterTelegramId: Number,
  targetTelegramId: Number,
  requesterBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  target: { property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }, year: Number, week: Number },
  message: String,
  status: { type: String, enum: ['waiting','confirmed','declined'], default: 'waiting' }
}, { timestamps: true });

export default mongoose.model('Exchange', exchangeSchema);
