import React, { useState, useEffect } from "react";
import axios from "axios";

const BuyBook = () => {
    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState("");
    const userId = localStorage.getItem("userId");
    console.log(userId); // Check the output


    // Fetch all books to display in the dropdown
    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    // Purchase a book
    const handleBuyBook = async () => {
        if (!selectedBookId) {
            alert("Please select a book to purchase.");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/books/buy", {
                userId,
                bookId: selectedBookId,
            });
            alert("Book purchased successfully!");
            setSelectedBookId(""); // Reset the selection
        } catch (error) {
            console.error("Error purchasing book:", error);
            alert("Failed to purchase the book.");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="border p-4 mb-6">
            <h2 className="text-lg font-bold mb-2">Buy a Book</h2>
            <select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                className="border p-2 mb-4"
            >
                <option value="">Select a book</option>
                {books.map((book) => (
                    <option key={book._id} value={book._id}>
                        {book.title} by {book.author}
                    </option>
                ))}
            </select>
            <button
                onClick={handleBuyBook}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Purchase Book
            </button>
        </div>
    );
};

export default BuyBook;
