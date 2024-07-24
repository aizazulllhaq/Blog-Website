import { Router } from "express";
import { signUpValidation } from "../../utils/Validation/Users.Validation";
import { validate } from "../../utils/Validation/validate";
import { createUser, getUser } from "../../controllers/Users/Users.Controller";

const usersRouter = Router();

usersRouter
    .get("/new", signUpValidation, validate, createUser)
    .get("/:id", validate, getUser);


export default usersRouter;
