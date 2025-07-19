const User = require("../models/User");
const Book = require("../models/Book");


exports.getUserLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("library");
    res.json({ library: user.library });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch library" });
  }
};


exports.addToLibrary = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (user.library.includes(bookId)) {
      return res.status(400).json({ msg: "Book already in library" });
    }

    user.library.push(bookId);
    await user.save();

    res.json({ msg: "Book added to library", library: user.library });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add book" });
  }
};


exports.removeFromLibrary = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    user.library = user.library.filter(
      (id) => id.toString() !== bookId.toString()
    );
    await user.save();

    res.json({ msg: "Book removed", library: user.library });
  } catch (err) {
    res.status(500).json({ msg: "Failed to remove book" });
  }
};
