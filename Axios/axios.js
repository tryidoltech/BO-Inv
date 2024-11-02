import axios from "axios";

// Create an axios instance
const instance = axios.create({
  // Set your base URL (adjust based on production/development)
 baseURL:"https://billbackend.vercel.app/api/v1/user",
//  baseURL:"http://localhost:5001/api/v1/user",
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

export default instance;
