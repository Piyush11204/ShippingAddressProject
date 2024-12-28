// models/Hotel.model.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	publishedYear: {
		type: Number,
		required: true,
	},
	copiesAvailable: {
		type: Number,
		required: true,
		default: 1,
	},
});

export const Book = mongoose.model("Book", bookSchema);
