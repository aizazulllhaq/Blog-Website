import { Router } from "express";
import { signUpValidation } from "../../utils/Validation/Users.Validation.js";
import { validate } from "../../utils/Validation/validate.js";
import { createUser, getUser } from "../../controllers/Users/Users.Controller.js";

const usersRouter = Router();

// api/v1/users
usersRouter
    .get("/new", signUpValidation, validate, createUser)
    .get("/:id", validate, getUser);


export default usersRouter;
