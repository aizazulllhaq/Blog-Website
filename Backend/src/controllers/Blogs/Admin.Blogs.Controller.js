import wrapAsync from "../../utils/wrapAsync.js";
import Blog from "../../models/Blogs/Blog.Model.js";
import BlogsTags from "../../models/Blogs/BlogTags.Model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

export const createBlog = wrapAsync(async (req, res, next) => {
    const { title, content, tags } = req.body;

    const blogImg = req.file;
    const UID = req.user.id;

    const tagPromises = tags.map(async (tag) => {
        let tag = await BlogsTags.findOne({ name: tag });
        if (!tag) {
            tag = await BlogsTags.create({ name: tag });
        }
        return tag._id;
    });

    const tagsIDs = await Promise.all(tagPromises);

    const blog = await Blog.create({
        title,
        content,
        author: UID,
        tags: tagsIDs,
        image: blogImg.path,
    });

    res.status(201).json(
        new ApiResponse(true, "Blog Created Successfully", blog)
    );
});

export const getAllBlogs = wrapAsync(async (req, res, next) => {
    const blogs = await Blog.find({});

    res.status(200).json(new ApiResponse(true, "All Blogs", blogs));
});

export const editBlog = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) return next(new ApiError(404, "Blog Not Found", false));

    res.status(200).json(new ApiResponse(true, "Blog for Edit", blog));
});

export const updateBlog = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;
    const { title, content, tags } = req.body;
    const blogImage = req.file;
    const UID = req.user.id;

    const blog = await Blog.findById(blogId);

    if (!blog) return next(new ApiError(404, "Blog Not Found", false));

    if (blog.author !== UID)
        return next(new ApiError(401, "Unauthorized Access", false));

    if (blog.title !== title) {
        blog.title = title;
    }

    if (blog.content !== content) {
        blog.content = content;
    }

    if (blog.tags !== tags) {
        blog.tags = tags;
    }

    if (blog.image.split("-")[1] !== blogImage.originalname) {
        blog.image = blogImage.originalname;
    }

    await blog.save();

    res.status(200).json(
        new ApiResponse(true, "Blog Updated Successfully", {})
    );
});

export const deleteBlog = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) return next(new ApiError(404, "Blog Not Found", false));

    await Blog.deleteOne({ _id: blog._id });

    res.status(200).json(
        new ApiResponse(true, "Blog Deleted Successfully", {})
    );
});
