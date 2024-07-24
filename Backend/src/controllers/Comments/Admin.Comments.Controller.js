import Comment from "../../models/Comments/Comment.Model";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import wrapAsync from "../../utils/wrapAsync";

// getCommentById - editComment
export const getCommentById = wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) return next(new ApiError(404, "Comment Not Found", false));

    res.status(200).json(new ApiResponse(true, "Comment", comment));
});

export const updateComment = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, comment } = req.body;

    const isComment = await Comment.findById(id);

    if (!isComment) return next(new ApiError(404, "Comment Not Found", false));

    if (isComment.name !== name) {
        isComment.name = name;
    }

    if (isComment.comment !== comment) {
        isComment.comment = comment;
    }

    await isComment.save();

    res.status(200).json(
        new ApiResponse(true, "Comment Updated Successfully", {})
    );
});

export const deleteComment = wrapAsync(async (req, res, next) => {
    const { id } = req.params;

    const isComment = await Comment.findById(id);

    if (!isComment) return next(new ApiError(404, "Comment Not Found", false));

    await Comment.deleteOne({ _id: isComment._id });

    res.status(200).json(
        new ApiResponse(true, "Comment Deleted Successfully", {})
    );
});
