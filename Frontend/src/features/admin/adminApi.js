import axios from "axios";

// Set up axios to send cookies with requests
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true, // Include cookies in cross-origin requests
});

export async function adminLogin(data) {
  try {
    const response = await apiClient.post(`/admin/users/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      data: response.data.data,
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message);
    }
  }
}

export async function adminLogout() {
  try {
    const response = await apiClient.post("/admin/users/logout");
    return response;
  } catch (error) {
    throw new Error("Logout Failed");
  }
}
