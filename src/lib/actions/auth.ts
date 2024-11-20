import axios from "axios";
import axiosClient from "../axios";
import { ILoginUser, IRegisterUser, IUser, LoginResponse } from "../types";

export const login = async (loginInfo: ILoginUser) => {
  try {
    const { data } = await axiosClient.post<LoginResponse>(
      `auth/login`,
      loginInfo
    );
    return data;
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

export const loginCheck = async (): Promise<IUser | undefined> => {
  try {
    const { data } = await axiosClient.get(`auth/me`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
