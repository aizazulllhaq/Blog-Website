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

const App = () => {
  return (
    <BrowserRouter basename="/Blog-Wesbite"> {/* Use basename if your app is in a subdirectory */}
      <Routes>
        <Route path="/Blog-Wesbite" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/blogPost" element={<MainPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/blogs/new" element={<NewBlogPage />} />
        <Route path="/blogs/edit/:id" element={<NewBlogPage state={"edit"} />} />
        <Route path="/blogs/:blogID/comment/:commentId" element={<EditCommentPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/problem" element={<Problem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
