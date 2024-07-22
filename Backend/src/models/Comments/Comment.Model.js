import { model, Schema } from "mongoose";

const commentSchema = new Schema(
    {
        blog_id: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

export default Comment;
