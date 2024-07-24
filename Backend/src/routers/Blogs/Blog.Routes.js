import { Router } from "express";
import {
    getAllORFilterBlogs,
    getBlog,
} from "../../controllers/Blogs/Blogs.Controller";

const blogsRouter = Router();

blogsRouter
    .get("/:blodId", getBlog)
    .get("/", getAllORFilterBlogs);

export default blogsRouter;
