import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', index: true },
  userTelegramId: { type: Number, index: true },
  year: Number,
  week: Number,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ['pending','confirmed','rejected','cancelled'], default: 'pending' },
  isHoliday: { type: Boolean, default: false },
  comment: String
}, { timestamps: true });

bookingSchema.index({ property: 1, year: 1, week: 1 }, { unique: true });

export default mongoose.model('Booking', bookingSchema);
