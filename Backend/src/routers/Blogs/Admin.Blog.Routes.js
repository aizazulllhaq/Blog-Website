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
import multer from "multer";

const adminBlogRouter = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// api/v1/admin/blogs/new
adminBlogRouter
    .post(
        "/new",
        createBlogValidation,
        validate,
        upload.single("blogImage"),
        createBlog
    )
    .get("/", getAllBlogs)
    .get("/:blogId", editBlog)
    .put("/:blogId", updateBlog)
    .delete("/:blogId", deleteBlog);

export default adminBlogRouter;
