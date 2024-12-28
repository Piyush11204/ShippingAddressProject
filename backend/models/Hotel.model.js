// models/Hotel.model.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			required: true,
			trim: true,
		},
		rooms: {
			type: Number,
			required: true,
		},
		amenities: {
			type: [String],
		},
		pricePerNight: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Hotel = mongoose.model("Hotel", hotelSchema);
