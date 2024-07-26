import { Router } from "express";
import { validate } from "../../utils/Validation/validate.js";
import { commentValidation } from "../../utils/Validation/Comment.Validation.js";
import {
    createComment,
    getAllBlogComments,
} from "../../controllers/Comments/Comments.Controller.js";

const commentRouter = Router();

// api/v1/comments
commentRouter
    .post("/:blogId/new", commentValidation, validate, createComment)
    .get("/:blogId", validate, getAllBlogComments);

export default commentRouter;
