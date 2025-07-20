const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  status: { type: String, enum: ['read', 'unread'], default: 'unread' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
