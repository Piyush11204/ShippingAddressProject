import React from "react";
import { Link } from "react-router-dom";

const NavbarPart2 = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white font-bold text-xl">
                            My Store
                        </Link>
                    </div>
                    <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                            to="/getallproducts"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            All Products
                        </Link>

                        <Link
                            to="/userproducts"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            My Products
                        </Link>

                        <Link
                            to="/buyproductlist"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Buy Products
                        </Link>

                        {/* Add Product Button */}
                        <Link
                            to="/add"
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Add Product
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarPart2;
