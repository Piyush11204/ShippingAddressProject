import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
    >
        {children}
    </Link>
);

const Navbar = () => {
    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src="/api/placeholder/32/32"
                                alt="Logo"
                            />
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/hotels">Hotels</NavLink>
                                <NavLink to="/blood">Blood</NavLink>
                                <NavLink to="/bloodForm">Blood Form</NavLink>
                                <NavLink to="/libManage">Lib Mangment</NavLink>
                                <NavLink to="/FileExample">File</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <NavLink to="/login">Login</NavLink>
                        </div>
                    </div>
                    <div className="mr-2 flex md:hidden">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;