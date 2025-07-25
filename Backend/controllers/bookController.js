const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  const books = await Book.find({ user: req.user.id });
  res.json(books);
};

exports.addBook = async (req, res) => {
  const { title, author, genre, status, notes } = req.body;

  try {
    const book = await Book.create({
      user: req.user.id,
      title,
      author,
      genre,
      status,
      notes
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Error creating book:", err); 
    res.status(500).json({ msg: "Server error adding book", error: err.message });
  }
};



exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ msg: "Book not found" });

    if (!book.user || book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    await book.deleteOne(); // or book.remove()
    res.json({ msg: "Book removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error deleting book" });
  }
};

