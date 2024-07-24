import { Router } from "express";
import { validate } from "../../utils/Validation/validate";
import { commentValidation } from "../../utils/Validation/Comment.Validation";
import { createComment, getAllBlogComments, getCommentById } from "../../controllers/Comments/Comments.Controller.js";


const commentRouter = Router();

commentRouter
    .get("/new" ,commentValidation, validate, createComment)
    .get("/:blogId",validate,getAllBlogComments);

export default commentRouter;
