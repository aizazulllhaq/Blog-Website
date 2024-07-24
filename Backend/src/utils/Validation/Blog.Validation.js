import { check } from "express-validation";

export const createBlogValidation = [
    check("title", "Title is Required").not().isEmpty(),
    check("content", "Content is Required").not().isEmpty(),
    check("author", "Author is Required").not().isEmpty(),
    check("tagsArray", "Tags are Required")
        .isArray()
        .withMessage("Tags must be an array"),
    check("blogImage").custom((_, { req }) => {
        if (!req.file) {
            throw new Error("Image is required");
        }
        const mimeType = req.file.mimetype;
        if (
            mimeType === "image/jpg" ||
            mimeType === "image/png" ||
            mimeType === "image/jpeg"
        ) {
            return true;
        } else {
            throw new Error(
                "Please upload an image in (png, jpg, jpeg) format only"
            );
        }
    }),
];

export const getBlogValidation = [
    check("blogId")
        .notEmpty()
        .withMessage("blogId is required")
        .isMongoId()
        .withMessage("Invalid blogId format"),
];
