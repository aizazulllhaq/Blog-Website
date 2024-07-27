import { model, Schema } from "mongoose";

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            url: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "BlogsTags",
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Blog = model("Blog", blogSchema);

export default Blog;
