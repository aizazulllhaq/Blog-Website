import axios from "axios";

export async function createBlog(blogData) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/blog/new",
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

export async function editBlog(id) {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/blog/${id}`);
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function updateBlog(blogData) {
  try {
    const response = await axios.update(
      "http://localhost:8000/api/v1/blog",
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

export async function deleteBlog(id) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/blog/${id}`
    );
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getBlog(id) {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/blogs?id=${id}`);
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getAllBlogs() {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/blog/all");
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getBlogsTags() {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/tags");
    return response;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}

export async function getFilterBlogs(searchTerm) {
  let response;
  try {
    if (searchTerm !== "") {
      response = await axios.get(
        `http://localhost:8000/api/v1/blogs?tagsArray_like=${searchTerm}`
      );
    } else {
      response = await axios.get("http://localhost:8000/api/v1/blogs");
    }
    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
