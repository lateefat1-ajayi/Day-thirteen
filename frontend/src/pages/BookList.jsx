import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import api from "../services/api";
import { toast } from "react-toastify";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      toast.error("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">📚 Your Book List</h1>

       
        <BookForm onBookAdded={handleBookAdded} />

        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full p-2 border border-gray-300 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        
        {filteredBooks.length > 0 ? (
          <ul className="space-y-4">
            {filteredBooks.map((book) => (
              <li
                key={book._id}
                className="bg-white p-4 rounded shadow border-l-4 border-green-500"
              >
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-600">Genre: {book.genre}</p>
                <p className="text-sm text-gray-500">Status: {book.status}</p>
                {book.notes && (
                  <p className="mt-2 text-sm text-gray-600">📝 {book.notes}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-10">No books added yet.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
