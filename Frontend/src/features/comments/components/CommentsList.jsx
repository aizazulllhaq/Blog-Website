import React, { useEffect } from "react";
import { commentsListAsync } from "../commentsSlice";
import { useDispatch, useSelector } from "react-redux";

const CommentsList = ({ blogId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    dispatch(commentsListAsync(blogId));
  }, [blogId]);

  return (
    <section className="max-w-[900px] mx-auto pb-[30px] mb-[20px] p-[30px]">
      <hr className="opacity-20 border-2 border-gray-700 my-[40px]" />

      <h1 className="md:text-2xl text-xl my-[20px] font-semibold">
        Comments List
      </h1>
      {comments &&
        comments.map((comment, index) => (
          <div
            key={index}
            className="comments border-2 border-gray-900 rounded-lg my-[10px]"
          >
            <div className="comment p-4">
              <h1 className="text-xl opacity-70 py-[10px]">{comment.name}</h1>
              <p className="text-md opacity-90">{comment.comment}</p>
              <p className="opacity-50 pt-[10px] text-sm font-thin">
                {formatDate(comment.uploadTime)}
              </p>
            </div>
          </div>
        ))}
    </section>
  );
};

export default CommentsList;
