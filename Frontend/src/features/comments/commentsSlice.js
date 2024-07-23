import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  commentList,
  deleteComment,
  getCommentByBlogId,
  newComment,
  updateComment,
} from "./commentsApi";

export const newCommentAsync = createAsyncThunk(
  "comment/newComment",
  async (commentData) => {
    const response = await newComment(commentData);
    return response.data;
  }
);

export const commentsListAsync = createAsyncThunk(
  "comment/commentsList",
  async (blogId) => {
    const response = await commentList(blogId);
    return response.data;
  }
);

export const getCommentsByBlogIdAsync = createAsyncThunk(
  "comment/getCommentByBlogId",
  async (cID) => {
    const response = await getCommentByBlogId(cID);
    return response;
  }
);

export const updateCommentAsync = createAsyncThunk(
  "comment/updateComment",
  async ({ comment, cID }) => {
    console.log(comment, cID);
    return response;
  }
);

export const deleteCommentAsync = createAsyncThunk(
  "comment/deleteComment",
  async (cID) => {
    const response = await deleteComment(cID);
    return response;
  }
);

const initialState = {
  status: "idle",
  error: null,
  isComment: false,
  comments: null,
  comment: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newCommentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.isComment = true;
        state.comments.push(action.payload);
      })
      .addCase(newCommentAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(commentsListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(commentsListAsync.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = "idle";
      })
      .addCase(commentsListAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getCommentsByBlogIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentsByBlogIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.comment = action.payload;
      })
      .addCase(getCommentsByBlogIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCommentAsync.fulfilled, (state) => {
        state.status = "idle";
        state.isComment = true;
      })
      .addCase(updateCommentAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default commentSlice.reducer;
