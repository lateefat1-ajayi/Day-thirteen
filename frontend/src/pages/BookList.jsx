const BookList = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">📖 My Book List</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title, author, or genre"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 shadow-sm"
        />

        {/* Placeholder for book list */}
        <div className="bg-white p-4 rounded shadow text-gray-700 text-center">
          No books yet! Add some to your collection.
        </div>
      </div>
    </div>
  );
};

export default BookList;
