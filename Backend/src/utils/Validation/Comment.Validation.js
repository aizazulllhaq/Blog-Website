import { check } from "express-validator";


export const commentValidation = [
    check("name", "Name is Required").not().isEmpty(),
    check("comment", "Comment is Required").not().isEmpty(),
];
