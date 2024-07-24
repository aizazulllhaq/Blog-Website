import express from "express";
import ApiError from "./utils/ApiError.js";
import cookieParser from "cookie-parser";

// App
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routers
import usersRouter from "./routers/Users/Users.Routes.js";
import adminUsersRouter from "./routers/Users/Admin.Users.Routes.js";

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/admin/users", adminUsersRouter);
app.use("/api/v1/")

// Route Doesn't Exists ( 404 )
app.use("*", (req, res, next) => {
    next(new ApiError(404, "Route Doesn't Exists", false));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const {
        statusCode = 500,
        message = "Internal Server Error",
        success = false,
    } = err;

    res.status(statusCode).json({ success, message });
});

export default app;
