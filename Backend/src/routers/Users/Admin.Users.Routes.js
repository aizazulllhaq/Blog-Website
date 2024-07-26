import { Router } from "express";
import {
    loginValidation,
    signUpValidation,
} from "../../utils/Validation/Users.Validation.js";
import { validate } from "../../utils/Validation/validate.js";
import {
    adminLogin,
    deleteUser,
    editUser,
    getAllUsers,
    updateUser,
} from "../../controllers/Users/Admin.Users.Controller.js";

const adminUsersRouter = Router();

// api/v1/admin/users
adminUsersRouter
    .post("/login", adminLogin)
    .get("/", signUpValidation, validate, getAllUsers)
    .get("/:id", validate, editUser)
    .put("/:id", validate, updateUser)
    .delete("/:id", validate, deleteUser);

export default adminUsersRouter;
