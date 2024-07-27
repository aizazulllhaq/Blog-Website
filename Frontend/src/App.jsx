import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import BlogDetailPage from "./Pages/BlogDetailPage";
import MainPage from "./Utils/Hero";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import NewBlogPage from "./Pages/NewBlogPage";
import EditCommentPage from "./Pages/EditCommentPage";
import Problem from "./Problem";
import Protected from "./features/admin/components/Protected";
import { useState } from "react";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      {/* Use basename if your app is in a subdirectory */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
        <Route path="/blogPost" element={<MainPage />} />
        <Route path="/admin-login" element={<AdminLoginPage/>} />
        <Route
          path="/admin-dashboard"
          element={
            <Protected>
              <AdminDashboardPage />
            </Protected>
          }
        />
        <Route
          path="/blogs/new"
          element={
            <Protected>
              <NewBlogPage />
            </Protected>
          }
        />
        <Route
          path="/blogs/edit/:id"
          element={
            <Protected>
              <NewBlogPage state={"edit"} />
            </Protected>
          }
        />
        <Route
          path="/blogs/:blogId/comments/:commentId"
          element={
            <Protected>
              <EditCommentPage />
            </Protected>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/problem" element={<Problem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
