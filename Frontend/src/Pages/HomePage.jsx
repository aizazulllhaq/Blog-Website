import React from "react";
import Navbar from "../features/Layouts/Navbar";
import SearchBarFilterBlogs from "../features/Blogs/components/SearchBarFilterBlogs";
import Footer from "../features/Layouts/Footer";

const Home = () => {
  return (
    <section className="w-full min-h-screen bg-gray-950">
      <Navbar />
      <SearchBarFilterBlogs />
      <Footer />
    </section>
  );
};

export default Home;
