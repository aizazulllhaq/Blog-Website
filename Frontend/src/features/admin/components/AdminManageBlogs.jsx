import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogAsync, getFilterBlogsAsync } from "../../Blogs/blogSlice";
import {
  commentsListAsync,
  deleteCommentAsync,
} from "../../comments/commentsSlice";
import { Link } from "react-router-dom";

const AdminManageBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const comments = useSelector((state) => state.comment.comments);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [deleteBlogById, setDeleteBlogById] = useState(null);
  const [deleteCommentById, setDeleteCommentById] = useState(null);

  const toggleComments = (id) => {
    setSelectedBlogId(selectedBlogId === id ? null : id);
  };

  const handleDeleteBlog = async (blogId) => {
    await dispatch(deleteBlogAsync(blogId));
    setDeleteBlogById(blogId);
  };

  const handleDeleteComentById = async (cID) => {
    await dispatch(deleteCommentAsync(cID));
    setDeleteCommentById(cID);
  };

  useEffect(() => {
    dispatch(getFilterBlogsAsync(""));

    dispatch(commentsListAsync());
  }, [dispatch, selectedBlogId, deleteBlogById, deleteCommentById]);


  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="md:text-2xl text-xl font-bold text-white mb-4">
        Manage Blogs & Comments
      </h2>
      {blogs &&
        blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-900 p-4 mb-4 rounded-lg">
            <h3 className="md:text-xl text-md font-semibold text-white py-[5px]">
              {blog.title}
            </h3>
            <div className="flex justify-between">
              <p className="text-gray-400 py-[5px] md:text-md text-sm">
                Author : {blog.author}
              </p>
              <p className="text-gray-400 md:text-md text-sm">
                {blog.uploadTime}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap">
              <Link
                to={`/blogs/edit/${blog._id}`}
                className="bg-blue-600 hover:border-[1px]  border-blue-600 border-[1px] border-transparent hover:border-blue-600 hover:bg-transparent text-white py-2 px-4 rounded-[4px] mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteBlog(blog._id)}
                className="bg-red-600 hover:border-[1px]  border-red-600 border-[1px] border-transparent hover:border-red-600 hover:bg-transparent text-white md:py-2 py-1 md:px-4 px-2 rounded-[4px] mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => toggleComments(blog._id)}
                className="bg-green-600 hover:border-[1px]  border-green-600 border-[1px] border-transparent hover:border-green-600 hover:bg-transparent text-white md:py-2 py-1 md:px-4 px-2 rounded-[4px] mr-2"
              >
                Comments (
                {comments &&
                  comments.filter((c) => c.blog_id == blog._id).length}
                )
              </button>
            </div>
            {selectedBlogId == blog._id && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h4 className="md:text-xl text-md font-semibold text-white md:py-0 py-2">
                  Comments
                </h4>
                {comments &&
                  comments
                    .filter((c) => c.blog_id == blog._id)
                    .map((comment) => (
                      <div
                        key={comment._id}
                        className="bg-gray-900 p-3 mb-3 rounded-lg"
                      >
                        <h5 className="md:text-lg text-md font-semibold text-white py-[5px]">
                          {comment.name}
                        </h5>
                        <div className="flex justify-between md:flex-nowrap flex-wrap md:space-y-0 space-y-[10px]">
                          <p className="text-gray-400 py-[5px] md:text-md text-sm">
                            {comment.comment}
                          </p>
                          <p className="text-gray-400 md:text-md text-sm">
                            {comment.uploadTime || "1 hour ago"}
                          </p>
                        </div>

                        <div className="mt-2">
                          <Link
                            to={`/blogs/${blog._id}/comments/${comment._id}`}
                            className="text-white py-1 px-3 rounded-[4px] bg-blue-600 hover:border-[1px]  border-blue-600 border-[1px] border-transparent hover:border-blue-600 hover:bg-transparent mr-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteComentById(comment._id)}
                            className="text-white py-1 px-3 rounded-[4px] bg-red-600 hover:border-[1px]  border-red-600 border-[1px] border-transparent hover:border-red-600 hover:bg-transparent"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
        ))}
    </div>
    // <>
    //   {blogs &&
    //     blogs.map((blog) => <div className="text-white">{blog.title}</div>)}
    //   {comments &&
    //     comments.map((comment) => (
    //       <div className="text-white">{comment.name}</div>
    //     ))}
    // </>
  );
};

export default AdminManageBlogs;
