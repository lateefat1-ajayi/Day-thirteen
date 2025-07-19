const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book"); 

dotenv.config();

const genres = ["fantasy", "science fiction", "romance"];

async function fetchBooksByGenre(genre) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(genre)}&maxResults=20`
    );

    return res.data.items
      .filter((item) => item.volumeInfo.title && item.volumeInfo.authors && item.volumeInfo.imageLinks)
      .map((item) => ({
  title: item.volumeInfo.title,
  author: item.volumeInfo.authors[0],
  description: item.volumeInfo.description || "No description available.",
  coverUrl: item.volumeInfo.imageLinks?.thumbnail
    ? item.volumeInfo.imageLinks.thumbnail.replace(/^http:\/\//i, "https://")
    : "https://via.placeholder.com/300x400?text=No+Cover",
  genre,
  addedBy: "seed-script", // 🔥 This is required to satisfy your schema
}));


  } catch (err) {
    console.error(`❌ Failed to fetch for genre: ${genre}`, err.message);
    return [];
  }
}

async function seedBooks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const allBooks = [];

    for (const genre of genres) {
      const books = await fetchBooksByGenre(genre);
      console.log(`📚 Fetched ${books.length} books for genre: ${genre}`);
      allBooks.push(...books);
    }

    if (allBooks.length === 0) {
      console.log("⚠️ No books found. Aborting seed.");
      return;
    }

    await Book.deleteMany({});
    console.log("First book sample:", allBooks[0]);
    await Book.insertMany(allBooks);
    console.log(`✅ Inserted ${allBooks.length} books into database.`);

  } catch (error) {
    console.error("❌ Error seeding books:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seedBooks();
