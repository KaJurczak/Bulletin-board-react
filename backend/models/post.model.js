const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String},
  dateOfPublication: { type: Date, required: true },
  updateDate: { type: Date, required: true },
  status: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  userId: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
