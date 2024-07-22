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
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/comments?blogId=${blogId}`
    );
    return response;
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}
