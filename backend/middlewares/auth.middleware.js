import { asyncHandler } from "../utils/aysncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
	try {
		const token =
			req.cookies?.accessToken ||
			req.header("Authorization")?.replace("Bearer ", "");

		if (!token) {
			throw new Error(401, "Unauthorized request");
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decodedToken?.id).select(
			"-password -refreshToken"
		);

		if (!user) {
			throw new Error(401, "Invalid Access Token");
		}

		req.user = user;
		next();
	} catch (error) {
		throw new Error(401, error?.message || "Invalid access token");
	}
});
