import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const BookForm = () => {
  const { id } = useParams(); // for edit mode
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "",
    notes: "",
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchBook = async () => {
        try {
          const res = await api.get(`/books/${id}`);
          setForm(res.data);
        } catch (err) {
          toast.error("Failed to load book for editing");
        }
      };

      fetchBook();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await api.put(`/books/${id}`, form);
        toast.success("Book updated");
      } else {
        await api.post("/books", form);
        toast.success("Book added");
      }
      navigate("/book-list");
    } catch (err) {
      toast.error("Error saving book");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Book" : "Add Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Status</option>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
          <option value="Wishlist">Wishlist</option>
        </select>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
