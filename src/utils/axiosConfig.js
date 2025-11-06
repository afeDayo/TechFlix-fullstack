// utils/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://techflix-backend.onrender.com",
  timeout: 20000,
});

// Request interceptor - add Authorization from localStorage on every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // plain string
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - consistent error logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
