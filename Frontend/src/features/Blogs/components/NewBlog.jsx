import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createBlogAsync } from "../blogSlice";

const NewBlog = ({ state = "new" }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const tagsArray = data.tagsArray.split(",");
    dispatch(createBlogAsync({ ...data, tagsArray: tagsArray }));
    reset();
  };
  return (
    <div className="max-w-[800px] mx-auto py-[20px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-gray-800 text-white rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
            value={state === "edit" ? "value to edit" : ""}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            {...register("content", { required: "Content is required" })}
            rows="4"
            className="w-full p-2 rounded bg-gray-700 text-white resize-none"
            required
            value={state === "edit" ? "value to edit" : ""}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-lg mb-2">
            Author
          </label>
          <input
            type="text"
            {...register("author", { required: "Author is required" })}
            id="author"
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={state === "edit" ? "value to edit" : ""}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tagsArray" className="block text-lg mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            {...register("tagsArray", { required: "Tags are required" })}
            value={state === "edit" ? "value to edit" : ""}
            id="tagsArray"
            placeholder="Enter tags, separated by commas"
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-lg mb-2">
            Blog Image
          </label>
          <input
            type="file"
            id="image"
            {...register("file", { required: "File is required" })}
            accept="image/*"
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 file:border-0 file:bg-blue-600 file:text-white file:py-2 file:px-4 file:rounded file:cursor-pointer hover:file:bg-blue-700"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 py-2 px-4 rounded text-white hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
