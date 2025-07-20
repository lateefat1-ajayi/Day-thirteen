import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; 

    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      toast.error("Failed to load books");
    }
  };

  fetchBooks();
}, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Book List</h1>
        <button
          onClick={() => navigate("/add-book")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Book
        </button>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-600">No books found.</p>
      ) : (
        <ul className="space-y-3">
          {books.map((book) => (
            <li
              key={book._id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <h2 className="font-bold">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author} • {book.genre}</p>
                <p className="text-sm text-blue-600">{book.status}</p>
                {book.notes && <p className="text-xs mt-1">{book.notes}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookListPage;
