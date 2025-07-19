import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Reader = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://day-thirteen.onrender.com/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch book:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading book...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        <p>Book not found.</p>
        <Link to="/" className="mt-4 text-blue-500 underline">← Back to Library</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 block">
        ← Back to Library
      </Link>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{book.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-4">by {book.author}</p>
        <img
          src={book.coverUrl || "https://via.placeholder.com/300x400?text=No+Cover"}
          alt={book.title}
          className="w-full max-w-xs mb-6 rounded shadow"
        />

        <div className="prose dark:prose-invert max-w-none">
          
          <p>{book.content || "This book has no content yet. Please check back later."}</p>
        </div>
      </div>
    </div>
  );
};

export default Reader;
