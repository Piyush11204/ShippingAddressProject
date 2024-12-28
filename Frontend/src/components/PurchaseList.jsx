import React, { useState, useEffect } from "react";
import axios from "axios";

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/books/purchases");
                setPurchases(response.data);
            } catch (error) {
                console.error("Error fetching purchases:", error.response.data);
            }
        };

        fetchPurchases();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Books and Users Who Purchased Them</h2>
            {purchases.length > 0 ? (
                purchases.map((purchase, index) => (
                    <div key={index} className="border p-4 mb-4">
                        <h3 className="text-xl font-bold">
                            {purchase.book.title} by {purchase.book.author}
                        </h3>
                        <p>Genre: {purchase.book.genre}</p>
                        <p>Published Year: {purchase.book.publishedYear}</p>
                        <h4 className="font-bold mt-2">Purchased by:</h4>
                        {purchase.purchasedBy === "No users have purchased this book" ? (
                            <p>{purchase.purchasedBy}</p>
                        ) : (
                            <ul>
                                {purchase.purchasedBy.map((user) => (
                                    <li key={user._id}>
                                        {user.name} - {user.email}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            ) : (
                <p>No purchases found.</p>
            )}
        </div>
    );
};

export default PurchaseList;
