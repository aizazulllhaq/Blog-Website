import React from "react";
import Navbar from "../features/Layouts/Navbar";
import Footer from "../features/Layouts/Footer";
import AdminManageBlogs from "../features/admin/components/AdminManageBlogs";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <section className="w-full min-h-[100vh] bg-gray-950">
      <Navbar />
      <div className="max-w-[1050px] md:mx-auto mx-[20px] py-10 ">
        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl text-md font-bold text-white mb-8">
            Admin Dashboard
          </h1>
          <Link to={"/blogs/new"} className="bg-gray-900 hover:border-[1px]  border-gray-800 border-[1px] border-transparent hover:border-red-400 hover:bg-transparent text-white md:py-2 py-1 md:px-4 px-2 rounded-[4px] md:mr-2 md:text-xl text-md">Create New Blog</Link>
        </div>
        <div className="flex flex-col space-y-8">
          <AdminManageBlogs />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default AdminDashboardPage;
