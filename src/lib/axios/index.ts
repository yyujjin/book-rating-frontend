import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const axiosClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000,
  withCredentials: true,
});

export const ssrAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 5000,
  withCredentials: true,
});

export default axiosClient;
