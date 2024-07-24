import { JWT_SECRET } from "../constant";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";

export const checkAuthentication = (req, res, next) => {
    const { token } = req.cookies;

    req.user = null;

    if (!token) return next();

    try {
        const user = jwt.verify(token, JWT_SECRET);

        req.user = user;

        next();
    } catch (error) {
        return next(new ApiError(400, "Invalid Token", false));
    }
};

export const restrictToSecureRoutes = (role = []) => {
    return (req, _, next) => {
        if (!req.user) return next(new ApiError(404, "Please First Login"));

        if (!req.user.isVerified)
            return next(new ApiError(400, "Please Verify Your Email"));
        if (!role.includes(req.user.role))
            return next(new ApiError(400, "Role Must be Present"));
        next();
    };
};
