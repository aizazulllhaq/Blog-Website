import { Router } from "express";
import { signUpValidation } from "../../utils/Validation/Users.Validation";
import { validate } from "../../utils/Validation/validate";
import {
    deleteUser,
    editUser,
    getAllUsers,
    updateUser,
} from "../../controllers/Users/Admin.Users.Controller";

const adminUsersRouter = Router();

adminUsersRouter
    .get("/", signUpValidation, validate, getAllUsers)
    .get("/:id", validate, editUser)
    .put("/:id", validate, updateUser)
    .delete("/:id", validate, deleteUser);

export default adminUsersRouter;
