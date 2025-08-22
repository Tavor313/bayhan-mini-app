const mongoose = require('mongoose');
const exchangeSchema = new mongoose.Schema({
  userId: String,
  weekFrom: Date,
  weekTo: Date
});
module.exports = mongoose.model('Exchange', exchangeSchema);