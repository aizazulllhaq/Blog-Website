import axios from "axios";

export async function createUser(userData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/users/api/v1",
      userData,
      {
        "Content-Type": "application/json",
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error Occurred : ", error.message);
  }
}
