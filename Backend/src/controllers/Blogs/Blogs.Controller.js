import Blog from "../../models/Blogs/Blog.Model.js";
import { BlogsTags } from "../../models/Blogs/BlogsTags.Model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import wrapAsync from "../../utils/wrapAsync.js";

export const getBlogsTags = wrapAsync(async (req, res, next) => {
    const blogsTags = await BlogsTags.find({}).select("name -_id");

    const tagsArray = blogsTags.map((tag) => tag.name);

    res.status(200).json(new ApiResponse(true, "Blogs Tags", tagsArray));
});

export const getBlog = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId)
        .populate("author", "username -_id")
        .populate("tags", "name -_id")
        .exec();

    if (!blog) return next(new ApiError(404, "Blog Not Found", false));

    const tags = blog.tags.map((tag) => tag.name);

    const filterBlog = blog.toObject();
    filterBlog.tags = tags;

    res.status(200).json(new ApiResponse(true, "Blog Detail", filterBlog));
});

export const getAllORFilterBlogs = wrapAsync(async (req, res, next) => {
    const { search } = req.query;

    if (!search || search.length === 0) {
        const blogs = await Blog.find({})
            .populate("author", "username -_id")
            .populate("tags", "name -_id")
            .exec();

        const transformedBlogs = blogs.map((blog) => {
            const tags = blog.tags.map((tag) => tag.name);
            return {
                ...blog.toObject(),
                author: blog.author.username,
                tags: tags,
            };
        });

        return res
            .status(200)
            .json(new ApiResponse(true, "All Blogs", transformedBlogs));
    }

    const tag = await BlogsTags.findOne({ name: search });

    if (!tag) return next(new ApiError(404, "Blog Not Found", false));

    const blogs = await Blog.find({ tags: tag._id })
        .populate("author", "username -_id")
        .populate("tags", "name -_id")
        .exec();

    const transformedBlogs = blogs.map((blog) => {
        const tags = blog.tags.map((tag) => tag.name);
        return {
            ...blog.toObject(),
            author: blog.author.username,
            tags: tags,
        };
    });


    res.status(200).json(
        new ApiResponse(true, "Filter Blogs", transformedBlogs)
    );
});
