import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  commentList,
  deleteComment,
  getCommentById,
  newComment,
  updateComment,
} from "./commentsApi";

export const newCommentAsync = createAsyncThunk(
  "comment/newComment",
  async ({ commentData, blogId }) => {
    const response = await newComment(commentData, blogId);
    return response;
  }
);

export const commentsListAsync = createAsyncThunk(
  "comment/commentsList",
  async (blogId) => {
    const response = await commentList(blogId);
    return response;
  }
);

export const getCommentsByIdAsync = createAsyncThunk(
  "comment/getCommentById",
  async (cID) => {
    const response = await getCommentById(cID);
    return response;
  }
);

export const updateCommentAsync = createAsyncThunk(
  "comment/updateComment",
  async ({ comment, cID }) => {
    const response = await updateComment(comment, cID);
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
      .addCase(getCommentsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.comment = action.payload;
      })
      .addCase(getCommentsByIdAsync.rejected, (state, action) => {
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
