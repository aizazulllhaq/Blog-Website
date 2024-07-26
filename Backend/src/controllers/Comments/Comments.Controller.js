import Comment from "../../models/Comments/Comment.Model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import wrapAsync from "../../utils/wrapAsync.js";

export const createComment = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;
    const { name, comment } = req.body;

    await Comment.create({ name, comment, blog_id: blogId });

    res.status(201).json(
        new ApiResponse(true, "Comment Create Successfully", {})
    );
});

export const getAllBlogComments = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blogComments = await Comment.find({ blog_id: blogId }).select(
        "name comment -_id"
    );

    if (!blogComments)
        return next(new ApiError(404, "Comments Not Found", false));

    res.status(200).json(new ApiResponse(true, "Blog Comments", blogComments));
});
