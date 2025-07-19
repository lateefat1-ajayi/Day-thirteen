import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
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
                            logout();
                            navigate("/login");
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-0.5">Login</Link>
                        <Link to="/register"  className="p-1 rounded bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5">Register</Link>
                    </>
                )}

            </div>
        </nav>
    );
};

export default NavBar;
