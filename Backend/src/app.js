import express, { urlencoded } from "express";
import ApiError from "./utils/ApiError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ORIGIN } from "./constant.js";
import bodyParser from "body-parser";

// App
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: ORIGIN,
        credentials: true,
    })
);

app.use(cookieParser());
app.use(checkAuthentication);

// Routers
import usersRouter from "./routers/Users/Users.Routes.js";
import adminUsersRouter from "./routers/Users/Admin.Users.Routes.js";
import adminBlogRouter from "./routers/Blogs/Admin.Blog.Routes.js";
import commentRouter from "./routers/Comment/Comment.Routes.js";
import adminCommentRouter from "./routers/Comment/Admin.Comment.Routes.js";
import blogsRouter from "./routers/Blogs/Blog.Routes.js";
import {
    checkAuthentication,
    restrictToSecureRoutes,
} from "./middlewares/Auth.js";

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/admin/users", adminUsersRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use(
    "/api/v1/admin/blogs",
    restrictToSecureRoutes(["ADMIN"]),
    adminBlogRouter
);
app.use("/api/v1/comments", commentRouter);
app.use(
    "/api/v1/admin/comments",
    restrictToSecureRoutes(["ADMIN"]),
    adminCommentRouter
);

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
