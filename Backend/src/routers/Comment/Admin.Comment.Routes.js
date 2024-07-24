import { Router } from "express";
import { validate } from "../../utils/Validation/validate";
import {
    deleteComment,
    editComment,
    getAllComments,
    updateComment,
} from "../../controllers/Comments/Admin.Comments.Controller";

const adminCommentRouter = Router();

adminCommentRouter
    .get("/", validate, getAllComments)
    .get("/:id", validate, editComment)
    .put("/:id", validate, updateComment)
    .delete("/:id", validate, deleteComment);

export default adminCommentRouter;
