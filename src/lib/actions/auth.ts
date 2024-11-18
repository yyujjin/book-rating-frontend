import axios from "axios";
import axiosClient from "../axios";
import { ILoginUser, IRegisterUser } from "../types";

export const login = async (loginInfo: ILoginUser) => {
  try {
    const {
      data: { user, accessToken },
    } = await axiosClient.post(`auth/login`, loginInfo);
    localStorage.setItem("accessToken", accessToken); // TODO: 간단하지만 보안 취약. 인가 작업 이후 쿠키로 변경
    localStorage.setItem("username", user.username);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 401) {
        throw new Error("아이디 또는 패스워드를 확인하세요.");
      }
    } else {
      console.error(err);
      throw new Error("Network Error");
    }
  }
};

export const register = async (user: IRegisterUser) => {
  try {
    await axiosClient.post(`auth/register`, user);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 400) {
        throw new Error("이미 존재하는 ID입니다.");
      }
    } else {
      console.error(err);
      throw new Error("Network Error");
    }
  }
};
