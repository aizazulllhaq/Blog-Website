import axios from "axios";

export async function newComment(commentData) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/comments",
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function commentList(blogId) {
  let response;
  try {
    if (blogId) {
      response = await axios.get(
        `http://localhost:8000/api/v1/comments?blogId=${blogId}`
      );
    } else {
      response = await axios.get("http://localhost:8000/api/v1/comments");
    }
    return response;
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}
