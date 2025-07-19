const express = require("express");
const router = express.Router();
const {
  getUserLibrary,
  addToLibrary,
  removeFromLibrary,
} = require("../controllers/libraryController");
const auth = require("../middleware/auth");

router.get("/library", auth, getUserLibrary);
router.post("/library/:bookId", auth, addToLibrary);
router.delete("/library/:bookId", auth, removeFromLibrary);

module.exports = router;
