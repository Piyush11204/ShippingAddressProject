import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/aysncHandler.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        // Generate access token and refresh token
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save the refresh token in the database
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while generating tokens",
        });
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, username } = req.body;

    if (
        !fullName?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !username?.trim()
    ) {
        res.status(400).json({
            message: "All fields are required",
        });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    console.log(userExists);
    if (userExists) {
        res.status(400).json({
            message: "User already exists",
        });
    }

    const user = await User.create({ fullName, email, password, username });

    if (!user) {
        res.status(400).json({
            message: "An error occurred while creating the user",
        });
    }

    const userData = user.toObject();
    delete userData.password;
    delete userData.refreshToken;

    res.status(201).json({
        message: "User registered successfully",
        user: userData,
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body)
    if ((!email && !username) || !password) {
        res.status(400).json({
            message: "Email/Username and password are required",
        });
    }

    let user;
    if (email) {
        user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "Email not found",
            });
        }
    } else if (username) {
        user = await User.findOne({ username });
        if (!user) {
            res.status(404).json({
                message: "Username not found",
            });
        }
    }

    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect) {
        res.status(401).json({
            message: "Invalid password",
        });
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: false, // Always false for local development or tests
    };

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json({
            message: "User logged in successfully",
            user: user.toObject(), // Ensure this is defined here
            accessToken,
        });
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: false, // Always false for local development or tests
    };

    return res
        .status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json({
            message: "User logged out successfully",
        });
        
});

const getUserById = asyncHandler(async (req, res) => {
    const userId  = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
    }

    res.status(200).json({
        message: "User found",
        user,
    });
});

export { registerUser, loginUser, logoutUser, getUserById };
