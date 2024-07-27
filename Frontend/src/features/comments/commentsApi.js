import axios from "axios";

// Set up axios to send cookies with requests
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // Include cookies in cross-origin requests
});

export async function newComment(commentData, blogId) {
  try {
    const response = await apiClient.post(
      `/comments/${blogId}/new`,
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
      response = await apiClient.get(`/comments/${blogId}`);
    } else {
      response = await apiClient.get("/admin/comments");
    }
    return response.data.data;
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}

export async function getCommentById(cID) {
  try {
    const response = await apiClient.get(`/admin/comments/${cID}`);
    return response.data.data;
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}

export async function updateComment(comment, cID) {
  try {
    const response = await apiClient.put(`/admin/comments/${cID}`, comment, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("update comment : ", response);
    return response.data;
  } catch (error) {
    console.log("Error occurred:", error.message);
  }
}

export async function deleteComment(cID) {
  try {
    const response = await apiClient.delete(`/admin/comments/${cID}`);
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
