import axios from "axios";

export async function newComment(commentData, blogId) {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/comments/${blogId}/new`,
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function commentList(blogId) {
  let response;
  try {
    if (blogId) {
      response = await axios.get(
        `http://localhost:8080/api/v1/comments/${blogId}`
      );
    } else {
      response = await axios.get("http://localhost:8080/api/v1/comments");
    }
    return response.data.data;
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}

export async function getCommentByBlogId(blogId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/comments/${blogId}`
    );
    return response.data[0];
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}

export async function updateComment(comment, cID) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/admin/comments/${cID}`,
      comment,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}

export async function deleteComment(cID) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/admin/comments/${cID}`
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
