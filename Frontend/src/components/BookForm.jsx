import React, { useState } from "react";
import axios from "axios";

const BookForm = ({ onBookAdded }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        publishedYear: "",
        copiesAvailable: 0,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/books", formData);
            onBookAdded(response.data);
            setFormData({
                title: "",
                author: "",
                genre: "",
                publishedYear: "",
                copiesAvailable: 0,
            });
        } catch (error) {
            console.error("Error adding book:", error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 mb-4">
            <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="border p-2 mb-2"
            />
            <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="border p-2 mb-2"
            />
            <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Genre"
                className="border p-2 mb-2"
            />
            <input
                type="number"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                placeholder="Published Year"
                className="border p-2 mb-2"
            />
            <input
                type="number"
                name="copiesAvailable"
                value={formData.copiesAvailable}
                onChange={handleChange}
                placeholder="Copies Available"
                className="border p-2 mb-2"
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Add Book
            </button>
        </form>
    );
};

export default BookForm;
