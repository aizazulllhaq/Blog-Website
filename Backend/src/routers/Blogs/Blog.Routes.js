import { Router } from "express";
import {
    getAllORFilterBlogs,
    getBlog,
    getBlogsTags,
} from "../../controllers/Blogs/Blogs.Controller.js";
import { getBlogValidation } from "../../utils/Validation/Blog.Validation.js";
import { validate } from "../../utils/Validation/validate.js";

const blogsRouter = Router();

// api/v1/blogs
blogsRouter
    .get("/blogsTags", getBlogsTags)
    .get("/:blogId", getBlogValidation, validate, getBlog)
    .get("/", getAllORFilterBlogs); // ?search= ( query parameter )

export default blogsRouter;
