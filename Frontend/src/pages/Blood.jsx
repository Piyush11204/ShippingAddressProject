import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Blood = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/blood/showDonor/shubham');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch donor data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                loading
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
                    <p className="text-gray-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Blood Donors</h1>
                {data && data.length > 0 ? (
                    <ul className="bg-white shadow overflow-hidden sm:rounded-md">
                        {data.map(donor => (
                            <li key={donor._id} className="border-b border-gray-200 last:border-b-0">
                                <div className="px-4 py-5 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{donor.name}</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        <span className="font-semibold">Disease:</span> {donor.disease}
                                    </p>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        <span className="font-semibold">Number of times donated:</span> {donor.NumberofTimesDonated}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-700">No donors found.</p>
                )}
            </div>
        </div>
    );
}

export default Blood;