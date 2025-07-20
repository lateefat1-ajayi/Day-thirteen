const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  const books = await Book.find({ user: req.user.id });
  res.json(books);
};

exports.addBook = async (req, res) => {
  const { title, author, genre, status, notes } = req.body;
  const book = await Book.create({
    user: req.user.id,
    title,
    author,
    genre,
    status,
    notes
  });
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

  await book.remove();
  res.json({ msg: 'Book removed' });
};
