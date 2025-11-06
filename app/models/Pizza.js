const mongoose = require('mongoose');

const pizzaSchema = mongoose.Schema({
  type: String,
  ingredients: String,
  steps: String,
  image: String,  // Changed from imageURL
  price: Number
});

module.exports = mongoose.model('Pizza', pizzaSchema);