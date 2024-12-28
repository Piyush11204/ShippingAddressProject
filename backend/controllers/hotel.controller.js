// controllers/hotel.controller.js
import { Hotel } from "../models/Hotel.model.js";

// Create a new hotel
export const createHotel = async (req, res) => {
	console.log("Request body:", req.body); // Add this for debugging
	const { name, location, rooms, amenities, pricePerNight } = req.body;
	try {
		if (!name || !location || !rooms || !pricePerNight) {
			return res
				.status(400)
				.json({ message: "All required fields must be provided" });
		}
		const hotel = await Hotel.create({
			name,
			location,
			rooms,
			amenities,
			pricePerNight,
		});
		res.status(201).json(hotel);
	} catch (error) {
		console.error("Error creating hotel:", error.message);
		res.status(500).json({ message: error.message });
	}
};

// Get all hotels
export const getHotels = async (req, res) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Get a hotel by ID
export const getHotelById = async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id);
		if (!hotel) return res.status(404).json({ message: "Hotel not found" });
		res.status(200).json(hotel);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Update a hotel
export const updateHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!hotel) return res.status(404).json({ message: "Hotel not found" });
		res.status(200).json(hotel);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Delete a hotel
export const deleteHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findByIdAndDelete(req.params.id);
		if (!hotel) return res.status(404).json({ message: "Hotel not found" });
		res.status(200).json({ message: "Hotel deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getHotelByName = async (req, res) => {
	const { name } = req.params; // Extract name from parameters
	try {
		// Use a case-insensitive regular expression for partial matching
		const hotels = await Hotel.find({
			name: { $regex: name, $options: "i" },
		});

		// Check if any hotels were found
		if (hotels.length === 0) {
			return res
				.status(404)
				.json({
					message: "No hotels found matching the search criteria",
				});
		}
		res.status(200).json(hotels);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
