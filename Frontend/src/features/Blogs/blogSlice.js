import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
  getBlogsTags,
  getFilterBlogs,
  updateBlog,
} from "./blogApi";

export const createBlogAsync = createAsyncThunk(
  "blog/createBlog",
  async (blogData) => {
    const response = await createBlog(blogData);
    return response;
  }
);

export const editBlogAsync = createAsyncThunk("blog/editBlog", async (id) => {
  const response = await editBlog(id);
  return response;
});

export const updateBlogAsync = createAsyncThunk(
  "blog/updateBlog",
  async (blogData) => {
    const response = await updateBlog(blogData);
    return response;
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlog",
  async (id) => {
    const response = await deleteBlog(id);
    return response;
  }
);

export const getBlogAsync = createAsyncThunk("blog/getBlog", async (id) => {
  const response = await getBlog(id);
  return response.data[0];
});

export const getAllBlogsAsync = createAsyncThunk(
  "blog/getAllBlogs",
  async () => {
    const response = await getAllBlogs();
    return response;
  }
);

export const getBlogsTagsAsync = createAsyncThunk(
  "blog/getBlogsTags",
  async () => {
    const response = await getBlogsTags();
    return response.data;
  }
);

export const getFilterBlogsAsync = createAsyncThunk(
  "blog/getFilterBlogs",
  async (searchTerm) => {
    const response = await getFilterBlogs(searchTerm);
    return response;
  }
);

const initialState = {
  blog: null,
  blogs: null,
  status: "idle",
  error: null,
  blogsTags: null,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blog = action.payload;
      })
      .addCase(createBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(editBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blog = action.payload;
      })
      .addCase(editBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blog = action.payload;
      })
      .addCase(updateBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(deleteBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blog = action.payload;
      })
      .addCase(getBlogAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getBlogsTagsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBlogsTagsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blogsTags = action.payload;
      })
      .addCase(getBlogsTagsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getFilterBlogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilterBlogsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blogs = action.payload;
      })
      .addCase(getFilterBlogsAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});


export default blogSlice.reducer;