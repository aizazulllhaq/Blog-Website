import Comment from "../../models/Comments/Comment.Model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import wrapAsync from "../../utils/wrapAsync.js";

export const createComment = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;
    const { name, comment } = req.body;

    const newComment = (
        await Comment.create({ name, comment, blog_id: blogId })
    );

    res.status(201).json(
        new ApiResponse(true, "Comment Create Successfully", newComment)
    );
});

export const getAllBlogComments = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blogComments = await Comment.find({ blog_id: blogId }).select(
        "name comment uploadTime -_id"
    );

    if (!blogComments)
        return next(new ApiError(404, "Comments Not Found", false));

    res.status(200).json(new ApiResponse(true, "Blog Comments", blogComments));
});
