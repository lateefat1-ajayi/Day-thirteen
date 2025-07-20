import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-lg">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">📚 Welcome to BookBin</h1>
        <p className="text-gray-700 mb-6">
          Keep track of all the books you want to read, are currently reading, or have finished. Organize your reading journey effortlessly.
        </p>
        <div className="space-x-4">
          <Link to="/books" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Go to Book List
          </Link>
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
