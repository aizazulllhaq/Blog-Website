import Comment from "../../models/Comments/Comment.Model";
import ApiResponse from "../../utils/ApiResponse";
import wrapAsync from "../../utils/wrapAsync";

export const createComment = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;
    const { name, content } = req.body;

    await Comment.create({ name, content, blog_id: blogId });

    res.status(201).json(
        new ApiResponse(true, "Comment Create Successfully", {})
    );
});

export const getAllBlogComments = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blogComments = await Comment.find({ blog_id: blogId }).select(
        "name content -_id"
    );

    if (!blogComments)
        return next(new ApiError(404, "Comments Not Found", false));

    res.status(200).json(new ApiResponse(true, "Blog Comments", blogComments));
});
