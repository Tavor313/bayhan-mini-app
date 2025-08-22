const mongoose = require('mongoose');
const propertySchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String
});
module.exports = mongoose.model('Property', propertySchema);