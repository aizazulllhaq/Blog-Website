import axios from "axios";

// Set up axios to send cookies with requests
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // Include cookies in cross-origin requests
});

export async function createBlog(blogData) {
  try {
    const response = await apiClient.post("/admin/blogs/new", blogData, {
      "Content-Type": "application/json",
    });
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function editBlog(blogId) {
  try {
    const response = await apiClient.get(`/admin/blogs/${blogId}`);
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateBlog(blogData, blogId) {
  try {
    const response = await apiClient.put(`/admin/blogs/${blogId}`, blogData, {
      "Content-Type": "multipart/form-data",
    });
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function deleteBlog(blogId) {
  try {
    const response = await apiClient.delete(`/admin/blogs/${blogId}`);
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getBlog(blogId) {
  try {
    const response = await apiClient.get(`/blogs/${blogId}`);
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getAllBlogs() {
  try {
    const response = await apiClient.get("/admin/blogs");
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getBlogsTags() {
  try {
    const response = await apiClient.get("/blogs/blogstags");
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getFilterBlogs(searchTerm) {
  let response;
  try {
    if (searchTerm !== "") {
      response = await apiClient.get(`/blogs?search=${searchTerm}`);
    } else {
      response = await apiClient.get("/blogs");
    }
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
