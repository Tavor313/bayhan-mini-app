import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  address: String,
  location: { lat: Number, lng: Number },
  country: String,
  capacity: Number,
  rooms: Number,
  area: Number,
  gallery: [String], // URLs
  shareDenominator: { type: Number, default: 8 }, // e.g. 1/8
  rotationOrder: [{ type: Number }], // telegram IDs by turn
  priorityWeeks: [{ year: Number, week: Number, label: String }],
  managerContact: { name: String, phone: String, telegram: String }
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
