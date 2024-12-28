import React, { useEffect, useState } from "react";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/books");
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error.response.data);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">All Books</h2>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book._id}>
                            <strong>{book.title}</strong> by {book.author} - {book.genre} ({book.publishedYear})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};

export default BookList;
