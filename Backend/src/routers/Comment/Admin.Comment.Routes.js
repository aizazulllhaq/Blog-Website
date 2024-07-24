import { Router } from "express";
import { validate } from "../../utils/Validation/validate";
import {
    deleteComment,
    updateComment,
} from "../../controllers/Comments/Admin.Comments.Controller";

const adminCommentRouter = Router();

adminCommentRouter
    .get("/:id", validate, getCommentById)
    .get("/:id", validate, getCommentById)
    .put("/:id", validate, updateComment)
    .delete("/:id", validate, deleteComment);

export default adminCommentRouter;
