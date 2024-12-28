import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelForm from '../components/HotelForm';
import HotelList from '../components/HotelList';
import SearchBar from '../components/SearchBar';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/hotels");
            setHotels(response.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
            alert('Failed to fetch hotels. Please try again.');
        }
    };

    const handleSearch = async (searchTerm) => {
        if (!searchTerm.trim()) {
            fetchHotels();
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/api/hotels/search/${searchTerm}`);
            setHotels(response.data);
        } catch (error) {
            console.error('Error searching hotels:', error);
            alert('Failed to search hotels. Please try again.');
        }
    };

    const handleHotelAdded = (newHotel) => {
        setHotels(prevHotels => [...prevHotels, newHotel]);
    };

    const handleHotelUpdated = (updatedHotel) => {
        setHotels(prevHotels => prevHotels.map(hotel =>
            hotel._id === updatedHotel._id ? updatedHotel : hotel
        ));
        setSelectedHotel(null);
    };

    const handleHotelDeleted = (deletedHotelId) => {
        setHotels(prevHotels => prevHotels.filter(hotel => hotel._id !== deletedHotelId));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Hotel Management</h1>
            <SearchBar onSearch={handleSearch} />
            <HotelForm
                onHotelAdded={handleHotelAdded}
                selectedHotel={selectedHotel}
                onHotelUpdated={handleHotelUpdated}
            />
            <HotelList
                hotels={hotels}
                onEdit={setSelectedHotel}
                onHotelDeleted={handleHotelDeleted}
            />
        </div>
    );
};

export default Hotels;