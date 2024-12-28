import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelForm = ({ onHotelAdded, selectedHotel, onHotelUpdated }) => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        rooms: "",
        amenities: "",
        pricePerNight: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });

    useEffect(() => {
        if (selectedHotel) {
            setFormData({
                name: selectedHotel.name,
                location: selectedHotel.location,
                rooms: selectedHotel.rooms.toString(),
                amenities: selectedHotel.amenities.join(', '),
                pricePerNight: selectedHotel.pricePerNight.toString()
            });
        }
    }, [selectedHotel]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage({ type: '', message: '' });

        const url = selectedHotel
            ? `http://localhost:3000/api/hotels/${selectedHotel._id}`
            : "http://localhost:3000/api/hotels";
        const method = selectedHotel ? 'put' : 'post';

        try {
            const response = await axios[method](url, {
                ...formData,
                rooms: parseInt(formData.rooms),
                pricePerNight: parseFloat(formData.pricePerNight),
                amenities: formData.amenities.split(',').map(item => item.trim())
            });

            setSubmitMessage({ type: 'success', message: `Hotel ${selectedHotel ? 'updated' : 'added'} successfully!` });
            if (selectedHotel) {
                onHotelUpdated(response.data);
            } else {
                onHotelAdded(response.data);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting hotel:', error);
            setSubmitMessage({ type: 'error', message: 'Failed to submit hotel. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            location: "",
            rooms: "",
            amenities: "",
            pricePerNight: ""
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">Number of Rooms</label>
                <input
                    type="number"
                    id="rooms"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities</label>
                <input
                    type="text"
                    id="amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Comma-separated list of amenities"
                    required
                />
            </div>
            <div>
                <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">Price Per Night</label>
                <input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {isSubmitting ? 'Submitting...' : (selectedHotel ? 'Update Hotel' : 'Add Hotel')}
            </button>
            {submitMessage.message && (
                <div className={`p-4 rounded-md ${submitMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {submitMessage.message}
                </div>
            )}
        </form>
    );
};

export default HotelForm;