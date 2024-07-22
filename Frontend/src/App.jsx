import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import BlogDetailPage from "./Pages/BlogDetailPage";
import BlogPost from "./Utils/BlogPost";
import MainPage from "./Utils/Hero";

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
      element: (
        <MainPage/>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
