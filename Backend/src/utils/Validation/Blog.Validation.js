import { check } from "express-validator";


export const createBlogValidation = [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('tags', 'Tags are required')
        .isArray()
        .withMessage('Tags must be an array')
        .custom((tags) => {
            // Ensure that all items in the tags array are strings
            if (!tags.every(tag => typeof tag === 'string')) {
                throw new Error('All tags must be strings');
            }
            return true;
        }),
];

export const getBlogValidation = [
    check("blogId")
        .notEmpty()
        .withMessage("blogId is required")
        .isMongoId()
        .withMessage("Invalid blogId format"),
];
