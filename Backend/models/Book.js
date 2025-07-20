const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  author: String,
  genre: String,
  status: String,
  notes: String
});


module.exports = mongoose.model('Book', bookSchema);
