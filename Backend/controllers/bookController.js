const Book = require("../models/Book");


exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, description, coverImage } = req.body;

  if (!title || !author) {
    return res.status(400).json({ msg: "Title and author are required" });
  }

  try {
    const book = new Book({
      title,
      author,
      description,
      coverImage,
      addedBy: req.user, 
    });

    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};



exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ msg: "Book not found" });
    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    console.log("Looking for book with ID:", req.params.id); 

    const book = await Book.findById(req.params.id);

    if (!book) {
      console.log("Book not found in DB"); 
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error("Error in getBookById:", err.message); 
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

