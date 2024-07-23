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

  const toggleComments = (id) => {
    setSelectedBlogId(selectedBlogId === id ? null : id);
  };

  useEffect(() => {
    dispatch(getFilterBlogsAsync(""));

    dispatch(commentsListAsync());
  }, [dispatch, selectedBlogId]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Manage Blogs & Comments
      </h2>
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-900 p-4 mb-4 rounded-lg">
            <h3 className="text-xl font-semibold text-white py-[5px]">
              {blog.title}
            </h3>
            <div className="flex justify-between">
              <p className="text-gray-400 py-[5px]">Author : {blog.author}</p>
              <p className="text-gray-400">{blog.uploadTime}</p>
            </div>
            <div className="mt-4 flex flex-wrap">
              <Link
                to={`/blogs/edit/${blog.id}`}
                className="bg-blue-600 hover:border-[1px]  border-blue-600 border-[1px] border-transparent hover:border-blue-600 hover:bg-transparent text-white py-2 px-4 rounded-[4px] mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => dispatch(deleteBlogAsync(blog.id))}
                className="bg-red-600 hover:border-[1px]  border-red-600 border-[1px] border-transparent hover:border-red-600 hover:bg-transparent text-white py-2 px-4 rounded-[4px] mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => toggleComments(blog.id)}
                className="bg-green-600 hover:border-[1px]  border-green-600 border-[1px] border-transparent hover:border-green-600 hover:bg-transparent text-white py-2 px-4 rounded-[4px] mr-2"
              >
                Comments (
                {comments && comments.filter((c) => c.blogId == blog.id).length}
                )
              </button>
            </div>
            {selectedBlogId == blog.id && (
              <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-xl font-semibold text-white">Comments</h4>
                {comments &&
                  comments
                    .filter((c) => c.blogId == blog.id)
                    .map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-gray-900 p-3 mb-3 rounded-lg"
                      >
                        <h5 className="text-lg font-semibold text-white py-[5px]">
                          {comment.name}
                        </h5>
                        <div className="flex justify-between">
                          <p className="text-gray-400 py-[5px]">
                            {comment.comment}
                          </p>
                          <p className="text-gray-400">
                            {comment.uploadTime || "1 hour ago"}
                          </p>
                        </div>

                        <div className="mt-2">
                          <Link
                            to={`/blogs/${blog.id}/comment/${comment.id}`}
                            className="text-white py-1 px-3 rounded-[4px] bg-blue-600 hover:border-[1px]  border-blue-600 border-[1px] border-transparent hover:border-blue-600 hover:bg-transparent mr-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() =>
                              dispatch(deleteCommentAsync(comment.id))
                            }
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
