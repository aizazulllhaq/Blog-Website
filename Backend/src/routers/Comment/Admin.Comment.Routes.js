import { Router } from "express";
import { validate } from "../../utils/Validation/validate.js";
import {
    deleteComment,
    getCommentById,
    updateComment,
    getCommentList
} from "../../controllers/Comments/Admin.Comments.Controller.js";

const adminCommentRouter = Router();

// api/v1/admin/comments
adminCommentRouter
    .get("/",getCommentList)
    .get("/:id", validate, getCommentById) // for getComment or editComment
    .put("/:id", validate, updateComment)
    .delete("/:id", validate, deleteComment);

export default adminCommentRouter;
