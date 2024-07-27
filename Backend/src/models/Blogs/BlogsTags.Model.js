import { model, Schema } from "mongoose";

const blogsTagsSchema = new Schema(
    {
        name: {
            type: "String",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const BlogsTags = model("BlogsTags", blogsTagsSchema);
