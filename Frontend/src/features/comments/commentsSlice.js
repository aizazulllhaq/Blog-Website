import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentList, newComment } from "./commentsApi";

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

const initialState = {
  status: "idle",
  error: null,
  isComment: false,
  comments: null,
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
      .addCase(newCommentAsync.fulfilled, (state,action) => {
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
      });
  },
});

export default commentSlice.reducer;
