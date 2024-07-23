import React from "react";
import Login from "../features/admin/components/Login";
import Navbar from "../features/Layouts/Navbar";
import Footer from "../features/Layouts/Footer";

const AdminLoginPage = () => {
  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
};

export default AdminLoginPage;
