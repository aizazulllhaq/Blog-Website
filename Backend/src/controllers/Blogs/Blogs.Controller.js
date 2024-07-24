import Blog from "../../models/Blogs/Blog.Model";
import { BlogsTags } from "../../models/Blogs/BlogTags.Model";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import wrapAsync from "../../utils/wrapAsync";

export const getBlogsTags = wrapAsync(async (req, res, next) => {
    const blogsTags = await BlogsTags.find({});

    res.status(200).json(new ApiResponse(true, "Blogs Tags", blogsTags));
});

export const getBlog = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("tags", "name").exec();

    if (!blog) return next(new ApiError(404, "Blog Not Found", false));

    res.status(200).json(new ApiResponse(true, "Blog Detail", blog));
});

export const getAllORFilterBlogs = wrapAsync(async (req, res, next) => {
    const { search } = req.query;

    if (!search && search.length === 0) {
        const blogs = await Blog.find({});

        return res.status(200).json(new ApiResponse(true, "All Blogs", blogs));
    }

    const tag = await BlogsTags.findOne({ name: search }).select("_id");

    if (!tag) return next(new ApiError(404, "Blog Not Found", false));

    const filterBlogs = await Blog.findOne({ tags: tag._id })
        .populate("tags", "name")
        .exec();

    res.status(200).json(new ApiResponse(true, "Filter Blogs", filterBlogs));
});
