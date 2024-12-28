import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Handle successful registration
            console.log("Registration successful:", data);
        } catch (err) {
            setError(err.message || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us today and start your journey
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="johndoe123"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            {loading ? (
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
