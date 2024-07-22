import React from "react";
import AdminManageUsers from "../features/admin/components/AdminManageUsers";
import AdminManageComments from "../features/admin/components/AdminManageComments";

const AdminDashboardPage = () => {
  return (
    <section className="">
      <AdminManageUsers />
      <AdminManageComments />
    </section>
  );
};

export default AdminDashboardPage;
