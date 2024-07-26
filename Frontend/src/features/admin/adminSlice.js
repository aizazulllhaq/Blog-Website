import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "./adminApi";

export const adminLoginAsync = createAsyncThunk(
  "auth/adminLogin",
  async (data) => {
    const response = await adminLogin(data);
    return response;
  }
);

const initialState = {
  error: null,
  status: "idle",
  admin: null,
};

export const adminSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.admin = action.payload;
      })
      .addCase(adminLoginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default adminSlice.reducer;
