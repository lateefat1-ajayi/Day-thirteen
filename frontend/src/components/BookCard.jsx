import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link to={`/reader/${book._id}`} className="block">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        <div className="h-64 overflow-hidden rounded-t-xl">
          <img
            src={book.coverUrl || "https://via.placeholder.com/300x400?text=No+Cover"}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 italic">
            by {book.author}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
