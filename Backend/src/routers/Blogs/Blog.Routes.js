import { Router } from "express";
import {
    getAllORFilterBlogs,
    getBlog,
} from "../../controllers/Blogs/Blogs.Controller";
import { getBlogValidation } from "../../utils/Validation/Blog.Validation";
import { validate } from "../../utils/Validation/validate";

const blogsRouter = Router();
// api/v1/blogs
blogsRouter
    .get("/:blodId", getBlogValidation, validate, getBlog)
    .get("/", getAllORFilterBlogs); // ?search= ( query parameter )

export default blogsRouter;
