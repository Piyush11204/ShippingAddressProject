import React from 'react';
import axios from 'axios';

const HotelList = ({ hotels, onDelete, onEdit, onHotelDeleted }) => {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                await axios.delete(`http://localhost:3000/api/hotels/${id}`);
                onHotelDeleted(id);
            } catch (error) {
                console.error('Error deleting hotel:', error);
                alert('Failed to delete hotel. Please try again.');
            }
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Hotel List</h2>
            {hotels.map((hotel) => (
                <div key={hotel._id} className="border p-4 rounded-md shadow-sm">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <p>Location: {hotel.location}</p>
                    <p>Rooms: {hotel.rooms}</p>
                    <p>Amenities: {hotel.amenities.join(', ')}</p>
                    <p>Price per night: ${hotel.pricePerNight}</p>
                    <div className="mt-2 space-x-2">
                        <button
                            onClick={() => onEdit(hotel)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(hotel._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotelList;