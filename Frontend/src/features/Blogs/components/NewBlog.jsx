import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBlogAsync, editBlogAsync, updateBlogAsync } from "../blogSlice"; // Ensure you have a fetchBlogAsync action
import { useParams } from "react-router-dom";

const NewBlog = ({ state }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blog);
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("content", data.content || "");
    formData.append("author", data.author || "");
    formData.append(
      "tagsArray",
      data.tagsArray ? data.tagsArray.split(",").join(",") : ""
    );

    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    if (state === "edit") {
      dispatch(updateBlogAsync({ blogData: formData, id: blog.id }));
      console.log({ blogData: formData, id: blog.id });
    } else {
      dispatch(createBlogAsync(formData));
    }

    reset();
  };

  useEffect(() => {
    if (state === "edit") {
      dispatch(editBlogAsync(id));
    }
  }, [dispatch, id, state]);

  useEffect(() => {
    if (state === "edit" && blog) {
      setValue("title", blog.title);
      setValue("content", blog.content);
      setValue("author", blog.author);
      if (Array.isArray(blog.tagsArray)) {
        setValue("tagsArray", blog.tagsArray.join(","));
      }
      setImagePreview(blog.img); // Set initial image preview to the existing blog image
    }
  }, [blog, state, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set preview for the new file
    }
  };

  return (
    <div className="max-w-[800px] mx-auto py-[20px] px-[10px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-gray-800 text-white rounded-lg"
      >
        <h2 className="md:text-2xl text-xl font-bold mb-4">
          {state === "edit" ? "Edit Blog" : "Create New Blog"}
        </h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-lg mb-2">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            className="w-full p-2 rounded bg-gray-700 text-white resize-none"
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
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tagsArray" className="block text-lg mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            {...register("tagsArray", { required: "Tags are required" })}
            id="tagsArray"
            placeholder="Enter tags, separated by commas"
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-lg mb-2">
            Blog Image
          </label>
          <div className="mb-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Blog"
                className="w-[300px] h-[200px] rounded mb-2"
              />
            )}
          </div>
          <input
            type="file"
            {...register("file")}
            accept="image/*"
            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 file:border-0 file:bg-blue-600 file:text-white file:py-2 file:px-4 file:rounded file:cursor-pointer hover:file:bg-blue-700"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 py-2 px-4 rounded text-white hover:bg-blue-700"
        >
          {state === "edit" ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
