const mongoose = require('mongoose');

const captionSchema = new mongoose.Schema({
  content: { type: String },
  img: { type: String },
});

const historySchema = new mongoose.Schema({
  title: { type: String },
  caption: [captionSchema],
});

const chuaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  history: [historySchema],
  googleMapUrl: { type: String }, 
});

module.exports = mongoose.model('Chua', chuaSchema);
