import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";

const BookFormPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add a Book</h1>
        <button
          onClick={() => navigate("/book-list")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View All Lists
        </button>
      </div>
      <BookForm />
    </div>
  );
};

export default BookFormPage;
