import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
	getUserById,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(verifyJWT, logoutUser);
userRouter.route("/getUser").get(verifyJWT,getUserById)

export default userRouter; 
