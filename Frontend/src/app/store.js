import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/admin/adminSlice";
import blogReducer from "../features/Blogs/blogSlice";
import commentReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    comment: commentReducer,
  },
});
