import { Router } from "express";
import { createBlogValidation } from "../../utils/Validation/Blog.Validation";
import { validate } from "express-validation";
import {
    createBlog,
    deleteBlog,
    editBlog,
    getAllBlogs,
    updateBlog,
} from "../../controllers/Blogs/Admin.Blogs.Controller";

const adminBlogRouter = Router();

// api/v1/admin/blogs/new
adminBlogRouter
    .post("/new", createBlogValidation, validate, createBlog)
    .get("/", getAllBlogs)
    .get("/:blogId", editBlog)
    .put("/:blogId", updateBlog)
    .delete("/:blogId", deleteBlog);

export default adminBlogRouter;
