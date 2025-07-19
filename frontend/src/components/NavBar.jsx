import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const user = false; // TODO: Replace with AuthContext later

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        <Link to="/">📚 BookBin</Link>
      </h1>
      <div className="flex items-center space-x-4">
        <Link to="/library" className="text-gray-700 dark:text-white hover:text-blue-500">Library</Link>
        {user ? (
          <button
            onClick={() => {
              // logout logic here
              navigate("/login");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-white dark:text-white bg-blue-500 p-1 rounded hover:bg-blue-600">Login</Link>
            <Link to="/register" className="text-white dark:text-white bg-blue-500 p-1 rounded hover:bg-blue-600">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
