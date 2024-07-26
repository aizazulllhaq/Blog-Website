import { model, Schema } from "mongoose";

const commentSchema = new Schema(
    {
        blog_id: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
        },
        // user_id: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User",
        // },
        name: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        uploadTime: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

export default Comment;
