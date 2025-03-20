import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://35.180.198.48",
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = Cookies.get('csrftoken');  // Get CSRF token from cookies
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;  // Set CSRF token in request header
  }
  return config;
});

export default axiosInstance;