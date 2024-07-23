import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import BlogDetailPage from "./Pages/BlogDetailPage";
import MainPage from "./Utils/Hero";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import NewBlogPage from "./Pages/NewBlogPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/blogs/:id",
      element: <BlogDetailPage />,
    },
    {
      path: "/blogPost",
      element: <MainPage />,
    },
    {
      path: "/admin-login",
      element: <AdminLoginPage />,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboardPage />,
    },
    {
      path: "/blogs/new",
      element: <NewBlogPage />,
    },
    {
      path: "/blogs/edit/:id",
      element: <NewBlogPage state={"edit"} />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
