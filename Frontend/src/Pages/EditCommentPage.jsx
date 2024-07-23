import React from "react";
import CommentsSection from "../features/comments/components/CommentsSection";
import Navbar from "../features/Layouts/Navbar";
import Footer from "../features/Layouts/Footer";

const EditCommentPage = () => {
  return (
    <>
      <Navbar />
      <section className="w-full h-[100vh] bg-gray-950 py-[20px]">
        <div className="max-w-[1050px] mx-auto bg-gray-800 rounded-[6px]">
          <CommentsSection state={"edit"} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EditCommentPage;
