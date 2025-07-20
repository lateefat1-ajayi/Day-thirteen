 import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API = "https://day-thirteen.onrender.com";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "unread",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (!user) return navigate("/login");
    fetchBooks();
  }, [user]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API}/books`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch books");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/books/${editingId}`, form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("Book updated successfully!");
      } else {
        await axios.post(`${API}/books`, form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        toast.success("Book added successfully!");
      }
      setForm({
        title: "",
        author: "",
        genre: "",
        status: "unread",
        notes: "",
      });
      setEditingId(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save book");
    }
  };

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      status: book.status,
      notes: book.notes,
    });
    setEditingId(book._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/books/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Book deleted!");
      fetchBooks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold">📚 BookBin</h1>
        
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          required
          className="p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          required
          className="p-2 border rounded"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          className="p-2 border rounded"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
        <select
          className="p-2 border rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
        <textarea
          placeholder="Notes (optional)"
          className="p-2 border rounded"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Filter / Search / Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <label>Status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by title or author"
          className="p-2 border rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="text-sm text-blue-600 underline"
        >
          Sort: {sortAsc ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* Book List */}
      <div className="grid gap-4">
        {books
          .filter((book) =>
            filter === "all" ? true : book.status === filter
          )
          .filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sortAsc
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title)
          )
          .map((book) => (
            <div key={book._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre || "N/A"}</p>
              <p><strong>Status:</strong> {book.status}</p>
              <p><strong>Notes:</strong> {book.notes || "None"}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 text-sm"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
