import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogout } from "./adminApi";

export const adminLoginAsync = createAsyncThunk(
  "auth/adminLogin",
  async (data) => {
    const response = await adminLogin(data);
    return response;
  }
);

export const adminLogoutAsync = createAsyncThunk(
  "auth/adminLogout",
  async () => {
    const response = await adminLogout();
    return response;
  }
);

const initialState = {
  status: "idle",
  isAdmin: false,
  accessToken: null,
  error: null,
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
        state.isAdmin = true;
        state.accessToken = action.payload.data;
      })
      .addCase(adminLoginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(adminLogoutAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(adminLogoutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.isAdmin = false;
      })
      .addCase(adminLogoutAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default adminSlice.reducer;
