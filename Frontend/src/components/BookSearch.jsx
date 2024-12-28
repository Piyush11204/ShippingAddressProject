import React, { useState } from "react";
import axios from "axios";

const BookSearch = () => {
    const [title, setTitle] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/books/search/${title}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error searching book:", error.response.data);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Search Book by Title</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Book Title"
                className="border p-2 mb-2"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded mb-4">
                Search
            </button>

            {results.length > 0 && (
                <ul>
                    {results.map((book) => (
                        <li key={book._id}>
                            <strong>{book.title}</strong> by {book.author} - {book.genre} ({book.publishedYear})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BookSearch;
