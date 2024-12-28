import React, { useState } from 'react';
import axios from 'axios';

const BloodForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        bloodGroup: "",
        disease: "",
        NumberofTimesDonated: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });

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

        try {
            const response = await axios.post('http://localhost:3000/api/blood/addDonor', formData);
            console.log(response);
            setSubmitMessage({ type: 'success', message: 'Donor added successfully!' });
            // Reset form
            setFormData({
                name: "",
                bloodGroup: "",
                disease: "",
                NumberofTimesDonated: ""
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitMessage({ type: 'error', message: 'Failed to add donor. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Blood Donor</h2>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Donor Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter donor name"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
                <input
                    type="text"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    placeholder="Enter blood group"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="disease" className="block text-sm font-medium text-gray-700">Disease (if any)</label>
                <input
                    type="text"
                    id="disease"
                    name="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    placeholder="Enter disease (if applicable)"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="NumberofTimesDonated" className="block text-sm font-medium text-gray-700">Number of Times Donated</label>
                <input
                    type="number"
                    id="NumberofTimesDonated"
                    name="NumberofTimesDonated"
                    value={formData.NumberofTimesDonated}
                    onChange={handleChange}
                    placeholder="Enter number of donations"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
                {isSubmitting ? 'Submitting...' : 'Add Donor'}
            </button>

            {submitMessage.message && (
                <div className={`mt-4 p-4 rounded-md ${submitMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {submitMessage.message}
                </div>
            )}
        </form>
    );
};

export default BloodForm;