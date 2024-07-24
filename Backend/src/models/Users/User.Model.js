import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constant.js";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
        },
        bio: {
            type: String,
        },
        role: {
            type: String,
            default: "USER",
            enum: ["USER", "ADMIN"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10); // return hash-password

    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); // return true,false
};

userSchema.methods.generateAccessToken = function () {
    const payload = {
        id: this._id,
        email: this.email,
        role: this.role,
        isVerified: this.isVerified,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    return token;
};

const User = model("User", userSchema);

export default User;
