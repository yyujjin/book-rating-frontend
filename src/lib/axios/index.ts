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
  // 구글 심사 통과 대기로 인해 우선 인증 없이 서비스
  // withCredentials: true, //인증 정보(쿠키) 포함
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ssrAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default axiosClient;
