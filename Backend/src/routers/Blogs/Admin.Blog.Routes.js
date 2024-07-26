import { Router } from "express";
import { createBlogValidation } from "../../utils/Validation/Blog.Validation.js";
import {
    createBlog,
    deleteBlog,
    editBlog,
    getAllBlogs,
    updateBlog,
} from "../../controllers/Blogs/Admin.Blogs.Controller.js";
import multer from "multer";
import { validate } from "../../utils/Validation/validate.js";

const adminBlogRouter = Router();

// Middleware for handling file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "uploads/"),
        filename: (req, file, cb) =>
            cb(null, `${Date.now()}-${file.originalname}`),
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"), false);
        }
    },
});
// api/v1/admin/blogs/
adminBlogRouter
    .post(
        "/new",
        upload.single("image"),
        createBlogValidation,
        validate,
        createBlog
    )
    .get("/", getAllBlogs)
    .get("/:blogId", editBlog)
    .put("/:blogId", upload.single("image"), updateBlog)
    .delete("/:blogId", deleteBlog);

export default adminBlogRouter;
