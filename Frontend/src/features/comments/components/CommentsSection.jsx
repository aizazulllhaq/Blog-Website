import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCommentsByBlogIdAsync,
  newCommentAsync,
  updateCommentAsync,
} from "../commentsSlice";

const CommentsSection = ({ state,blogID }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment.comment);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    let commentData;
    if (state !== "edit") {
      commentData = { ...data, blog_id: blogID };
      dispatch(newCommentAsync({ commentData, blogId:blogID }));
    } else {
      commentData = { ...data, blogId: blogID };
      dispatch(updateCommentAsync({ comment: commentData  }));
    }
    reset();
  };

  useEffect(() => {
    if (state === "edit") {
      dispatch(getCommentsByBlogIdAsync());
    }
  }, []);

  useEffect(() => {
    if (state === "edit" && comment) {
      setValue("name", comment.name);
      setValue("comment", comment.comment);
    }
  }, [comment, setValue]);

  return (
    <section className="max-w-[1000px] mx-auto rounded-lg shadow-md p-[30px]">
      {state !== "edit" && (
        <hr className="opacity-20 border-2 border-gray-700 my-[20px]" />
      )}

      <h2
        className={`md:text-2xl text-xl font-bold mb-4 ${
          state === "edit" ? "text-white text-center" : ""
        }`}
      >
        {state === "edit" ? "Edit Comment" : "Leave a Comment"}
      </h2>
      <form className="mb-4" onSubmit={handleSubmit(handleOnSubmit)}>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Enter Your Name..."
          className={`w-full p-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 my-3 ${
            state === "edit" ? "bg-gray-900 text-white" : "bg-transparent"
          }`}
        />
        {errors.name && (
          <span className="text-md text-red-500">{errors.name.message}</span>
        )}
        <textarea
          {...register("comment", { required: "Comment is required" })}
          className={`w-full p-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 my-3 resize-none ${
            state === "edit" ? "bg-gray-900 text-white" : "bg-transparent"
          }`}
          rows="5"
          placeholder="Write your comment here..."
        ></textarea>
        {errors.comment && (
          <span className="text-md text-red-500">{errors.comment.message}</span>
        )}
        <button
          type="submit"
          className="block mt-3 bg-red-800 text-white opacity-90 py-2 px-4 rounded-md hover:bg-red-900"
        >
          {state === "edit" ? "Update Comment" : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default CommentsSection;
