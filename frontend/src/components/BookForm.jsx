import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const BookForm = ({ onBookAdded }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "To Read",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/books", form);
      toast.success("Book added!");
      onBookAdded(res.data); // update list in parent
      setForm({ title: "", author: "", genre: "", status: "To Read", notes: "" });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add book");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Add a New Book</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="p-2 border rounded w-full"
        >
          <option value="To Read">To Read</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full p-2 border rounded"
      ></textarea>
      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
