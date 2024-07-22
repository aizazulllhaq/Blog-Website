import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { newCommentAsync } from "../commentsSlice";

const CommentsSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    const commentData = { ...data, blogId:id };
    dispatch(newCommentAsync(commentData));
    reset();
  };

  return (
    <section className="max-w-[1000px] mx-auto rounded-lg shadow-md p-[30px]">
      <hr className="opacity-20 border-2 border-gray-700 my-[20px]" />

      <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
      <form className="mb-4" onSubmit={handleSubmit(handleOnSubmit)}>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Enter Your Name..."
          className="bg-transparent w-full p-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 my-3"
        />
        {errors.name && (
          <span className="text-md text-red-500">{errors.name.message}</span>
        )}
        <textarea
          {...register("comment", { required: "Comment is required" })}
          className="w-full p-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none bg-transparent"
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
          Submit
        </button>
      </form>
    </section>
  );
};

export default CommentsSection;
