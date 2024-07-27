import wrapAsync from "../../utils/wrapAsync.js";
import User from "../../models/Users/User.Model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { NODE_ENV } from "../../constant.js";

export const createUserByAdmin = async (username, email, password) => {
    const user = await User.create({
        username,
        email,
        password,
        role: "ADMIN",
        isVerified: true,
    });

    console.log(`User Created by Admin : ${user}`);
};

export const adminLogin = wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new ApiError(401, "Invalid Credentials", false));

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch)
        return next(new ApiError(401, "Invalid Credentials", false));

    if (!user.isVerified)
        return next(new ApiError(400, "Please First Verify Your Email", false));

    const token = await user.generateAccessToken();

    res.status(200)
        .cookie("accessToken", token, {
            httpOnly: true, // Prevent JavaScript access
            secure: NODE_ENV === "production", // Use 'secure' in production
            sameSite: "Strict", // Helps prevent CSRF attacks
        })
        .json(new ApiResponse(true, "Login Successfull", token));
});

export const getAllUsers = wrapAsync(async (req, res, next) => {});

export const editUser = wrapAsync(async (req, res, next) => {});

export const updateUser = wrapAsync(async (req, res, next) => {});

export const deleteUser = wrapAsync(async (req, res, next) => {});

export const logoutAdmin = (req, res, next) => {
    res.status(200)
        .clearCookie("accessToken")
        .json(new ApiResponse(true, "Admin Logout Successfully", {}));
};
