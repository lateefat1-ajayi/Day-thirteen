const express = require("express");
const router = express.Router();
const { addBook, getAllBooks } = require("../controllers/bookController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// Public
router.get("/", getAllBooks);

// Admin-only
router.post("/", auth, isAdmin, addBook);

module.exports = router;
