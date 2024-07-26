import React, { useState } from "react";

const Problem = () => {
  const [inp, setInp] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments((prevState) => [...prevState, inp]);
    setInp("");
  };
  return (
    <section className="commentsSection max-w-[1050px] mx-auto">
      <div className="addComment">
        <h1>Create a comment</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your comment...."
            onChange={(e) => setInp(e.target.value)}
            value={inp}
          />
          <button>Comment</button>
        </form>
      </div>

      <div className="commentsList">
        <h1>Comments List : </h1>
        {comments &&
          comments.map((comment, index) => (
            <div
              key={index}
              className="comment border-[1px] border-red-400 rounded-[4px]"
            >
              <h1 className="font-thin opacity-70">Aizaz</h1>
              <p>{comment}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Problem;
