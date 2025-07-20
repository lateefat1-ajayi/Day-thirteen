import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";


const BookForm = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "",
    notes: "",
  });



  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  console.log("Submitting book with token:", token);
  if (!token) {
    toast.error("No authorization token found. Please login again.");
    return;
  }
  try {
    await api.post("/books", form, {
  headers: { Authorization: `Bearer ${token}` }
});
    toast.success("Book added!");
  } catch (err) {
    console.error("Book submission error:", err);
    toast.error(err.response?.data?.msg || "Failed to add book");
  }
};


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <input
          type="text"
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Reading status</option>
          <option value="Want to Read">Want to Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Finished">Finished</option>
        </select>
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
