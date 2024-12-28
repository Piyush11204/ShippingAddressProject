import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="mb-6 flex">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hotels..."
                className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;