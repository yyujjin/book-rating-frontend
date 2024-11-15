import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// TODO: CORS 해결하려고 두 가지 분리한 것 같은데 시간 지나니 헷갈린다
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
