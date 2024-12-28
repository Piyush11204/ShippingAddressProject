import axios from "axios";
import React, { useEffect, useState } from "react";

function BuyProductList() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/product/buyproductlist`,
                    {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(
                                localStorage.getItem("accessToken")
                            )}`,
                        },
                    }
                );
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error.response?.data?.message || "Failed to load products");
                setLoading(false);
            }
        };

        fetchProduct();
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

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Purchased Products
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all products you have purchased
                    </p>
                </div>
            </div>

            <div className="mt-8 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Product Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Brand
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Seller
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">
                                                Actions
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products &&
                                        products.map((product) => (
                                            <tr key={product._id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {product.ProductName}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {product.brand}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                                                    ${product.price.toFixed(2)}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {product.owner}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {(!products || products.length === 0) && (
                    <div className="text-center py-12">
                        <div className="space-y-3">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900">
                                No purchases yet
                            </h3>
                            <p className="text-gray-500">
                                You haven't made any purchases yet.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BuyProductList;
