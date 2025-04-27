// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081",
});

// Interceptor to automatically attach email from sessionStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const email = sessionStorage.getItem("username"); // 👈 fetch only the email string
    console.log("The Header Passed is ", email);
    if (email) {
      config.headers["X-Institution-Identifier"] = email; // 👈 correct custom header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
