import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/product/userproducts", {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
                    },
                });
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-center">
                    <p className="text-xl">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
                },
            });
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">My Products</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all your products including their status, price, and details.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link
                        to="/products/new"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add Product
                    </Link>
                </div>
            </div>

            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Product Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Category
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Price
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Brand
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {product.ProductName}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {product.category}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                ${product.price.toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                {product.buyer ? (
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                        Sold
                                                    </span>
                                                ) : product.isSellable ? (
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                                                        Available
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                        Not Available
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {product.brand}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div className="flex gap-3 justify-end">
                                                    <Link
                                                        to={`/product/${product._id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                {products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No products found. Start by adding a new product.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProduct;