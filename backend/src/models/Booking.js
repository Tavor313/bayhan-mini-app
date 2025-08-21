const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  userId: String,
  propertyId: String,
  startDate: Date,
  endDate: Date
});
module.exports = mongoose.model('Booking', bookingSchema);