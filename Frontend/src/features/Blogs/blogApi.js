import axios from "axios";

export async function createBlog(blogData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/admin/blogs/new",
      blogData,
      {
        "Content-Type": "application/json",
      }
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function editBlog(blogId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/admin/blogs/${blogId}`
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateBlog(blogData, blogId) {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/admin/blogs/${blogId}`,
      blogData,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function deleteBlog(blogId) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/admin/blogs/${blogId}`
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getBlog(blogId) {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/blogs/${blogId}`
    );
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getAllBlogs() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/admin/blogs"
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getBlogsTags() {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/blogs/blogstags"
    );
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getFilterBlogs(searchTerm) {
  let response;
  try {
    if (searchTerm !== "") {
      response = await axios.get(
        `http://localhost:8080/api/v1/blogs?search=${searchTerm}`
      );
    } else {
      response = await axios.get("http://localhost:8080/api/v1/blogs");
    }
    return response.data.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
