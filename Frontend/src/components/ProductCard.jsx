// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 m-4">
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.ProductName}</h3>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
                <Link
                    to={`/product/${product._id}`}
                    className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                    View Product
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
