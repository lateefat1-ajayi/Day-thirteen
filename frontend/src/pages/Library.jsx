import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import BookCard from "../components/BookCard";


const Library = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await API.get("/books");
                setBooks(res.data);
            } catch (err) {
                console.error("Failed to fetch books", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading books...</div>;

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">📚 Library</h2>
            {books.length === 0 ? (
                <p className="text-center text-gray-500">No books available yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}

                </div>
            )}
        </div>
    );
};

export default Library;
