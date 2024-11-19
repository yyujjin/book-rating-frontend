import axios from "axios";
import LocalStorageService from "../local-storage";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// TODO: CORS 해결하려고 두 가지 분리한 것 같은데 시간 지나니 헷갈린다
// apiBaseUrl가 필요한가?
const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //인증 정보(쿠키) 포함
});

export const ssrAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default axiosClient;
