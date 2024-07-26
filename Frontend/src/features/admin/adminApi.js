export async function adminLogin(data) {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/admin/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error Occurred : ${error.message}`);
  }
}
