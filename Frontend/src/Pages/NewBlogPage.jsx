import React from "react";
import NewBlog from "../features/Blogs/components/NewBlog";
import Navbar from "../features/Layouts/Navbar";
import Footer from "../features/Layouts/Footer";

const NewBlogPage = ({ state }) => {
  return (
    <section className="w-full min-h-[100vh] bg-gray-950">
      <Navbar />
      <NewBlog state={state} />
      <Footer />
    </section>
  );
};

export default NewBlogPage;
