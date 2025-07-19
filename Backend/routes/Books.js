const express = require("express");
const router = express.Router();
const {
  addBook,
  getAllBooks,
  getBookById,
  deleteBook,
} = require("../controllers/bookController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");


router.get("/", getAllBooks);
router.get("/:id", getBookById); 

// Admin routes
router.post("/", auth, isAdmin, addBook);
router.delete("/:id", auth, isAdmin, deleteBook); 
module.exports = router;
