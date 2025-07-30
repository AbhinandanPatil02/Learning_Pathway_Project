import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api/users"; // Replace with your backend URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: error.response?.data?.error || "Failed to sign up." };
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.response?.data?.error || "Failed to log in." };
  }
};



