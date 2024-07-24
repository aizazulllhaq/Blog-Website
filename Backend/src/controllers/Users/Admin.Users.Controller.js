import wrapAsync from "../../utils/wrapAsync.js";
import User from "../../models/Users/User.Model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createUserByAdmin = wrapAsync(
    async (username, email, password) => {
        const user = await User.create({
            username,
            email,
            password,
            role: "ADMIN",
            isVerified: true,
        });

        console.log(`User Created by Admin : ${user}`);
    }
);

export const adminLogin = wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user && !user.isPasswordCorrect(password))
        return next(new ApiError(401, "Invalid Credentials", false));

    const token = user.generateAccessToken();

    res.status(200)
        .cookie("accessToken", token)
        .json(new ApiResponse(true, "Login Successfull", {}));
});

export const getAllUsers = wrapAsync(async (req, res, next) => {});

export const editUser = wrapAsync(async (req, res, next) => {});

export const updateUser = wrapAsync(async (req, res, next) => {});

export const deleteUser = wrapAsync(async (req, res, next) => {});
