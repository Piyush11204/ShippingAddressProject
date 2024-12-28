import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
			index: true,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		refreshToken: {
			type: String,
		},
		purchasedBooks: [
			{
				bookId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Book",
				},
				purchaseDate: { type: Date, default: Date.now },
			},
		],
	},
	{
		timestamps: true,
	}
);

// Hash password before saving
userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();

	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

// Check password method
userSchema.methods.checkPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		return false; // Return false if there's an error
	}
};

// Generate access token method
userSchema.methods.generateAccessToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

// Generate refresh token method
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

export const User = mongoose.model("User", userSchema);
