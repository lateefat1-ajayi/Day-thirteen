const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        Welcome to <span className="text-purple-600">BookBin</span> 📚
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Track, manage, and reflect on the books you read — all in one beautiful space.
      </p>
      <div className="space-x-4">
        <a href="/login" className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition">Login</a>
        <a href="/register" className="bg-gray-200 text-purple-700 px-5 py-2 rounded hover:bg-gray-300 transition">Register</a>
      </div>
    </div>
  );
};

export default Welcome;
