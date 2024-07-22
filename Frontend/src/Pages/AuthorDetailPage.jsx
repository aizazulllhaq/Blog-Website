import React from "react";
import AuthorDetail from "../features/author/components/AuthorDetail";
import AuthorBlogs from "../features/author/components/AuthorBlogs";

const AuthorDetailPage = () => {
  return (
    <section className="">
      <AuthorDetail />
      <AuthorBlogs />
    </section>
  );
};

export default AuthorDetailPage;
