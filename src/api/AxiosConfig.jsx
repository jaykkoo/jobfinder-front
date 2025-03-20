import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://http://35.180.198.48",
  withCredentials: true,
});

export default axiosInstance;