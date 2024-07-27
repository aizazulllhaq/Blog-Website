import wrapAsync from "../../utils/wrapAsync.js";
import Blog from "../../models/Blogs/Blog.Model.js";
import { BlogsTags } from "../../models/Blogs/BlogsTags.Model.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

export const createBlog = wrapAsync(async (req, res, next) => {
    const { title, content, tags } = req.body;

    const blogImg = req.file;
    if (!blogImg)
        return next(new ApiError(400, "file image is required", false));
    const UID = req.user.id;

    const tagPromises = tags.map(async (tagName) => {
        let tag = await BlogsTags.findOne({ name: tagName });
        if (!tag) {
            tag = await BlogsTags.create({ name: tagName });
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
    const blogs = await Blog.find({}).populate("author", "username").exec();

    const uBlogs = blogs.map((blog) => {
        // blog.author_id=blog.author_id.username
        const blogObject = blog.toObject();
        blog.author = blog.author.username;
        return blogObject;
    });

    res.status(200).json(new ApiResponse(true, "All Blogs", uBlogs));
});

export const editBlog = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId)
        .populate("author", "username -_id")
        .populate("tags", "name -_id")
        .exec();

    if (!blog) return next(new ApiError(404, "Blog Not Found", false));

    res.status(200).json(new ApiResponse(true, "Blog for Edit", blog));
});

export const updateBlog = wrapAsync(async (req, res, next) => {
    const { blogId } = req.params;
    const { title, content, tags } = req.body;
    const blogImg = req.file;

    // Find the existing blog by ID
    const blog = await Blog.findById(blogId);
    if (!blog) {
        return next(new ApiError(404, "Blog not found"));
    }

    // Extract the tag names from the request
    const tagsArray = Array.isArray(tags) ? tags : JSON.parse(tags); // Ensure tags is an array of strings

    // Compare the existing tags (ObjectIds) with the new tags
    const existingTags = await BlogsTags.find({ _id: { $in: blog.tags } }); // Get existing tags from the database

    // Create a set of existing tag names for comparison
    const existingTagNames = existingTags.map((tag) => tag.name);


    // Determine which tags are new
    const tagsToCreate = tagsArray.filter(
        (tagName) => !existingTagNames.includes(tagName)
    );

    // Create new tags if necessary
    const tagPromises = tagsToCreate.map(async (tagName) => {
        let tag = await BlogsTags.findOne({ name: tagName });
        if (!tag) {
            tag = await BlogsTags.create({ name: tagName });
        }
        return tag._id;
    });

    const newTagIds = await Promise.all(tagPromises);

    // Combine existing tag IDs with new tag IDs
    const updatedTagIds = [...new Set([...blog.tags, ...newTagIds])];

    // Update the blog with new tag IDs
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    if (blogImg) {
        blog.image = blogImg.path; // Update the image if a new one is provided
    }
    blog.tags = updatedTagIds;

    await blog.save();

    res.status(200).json(
        new ApiResponse(true, "Blog updated successfully", blog)
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
