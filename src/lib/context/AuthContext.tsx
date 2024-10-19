"use client";

import { useLocalStorage } from "@frontend-opensource/use-react-hooks";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { ILogin, IUser } from "../types";

export interface UserContextType {
  token: string | null;
  user: IUser | null;
  login: (data: ILogin) => void;
}

// Auth Context 생성
const AuthContext = createContext<UserContextType | null>(null);

// Provider 컴포넌트에서 토큰 및 사용자 정보 관리
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const [token, setToken] = useLocalStorage<string>("token", "");
  const setUserStorage = useLocalStorage<string>("user", "")[1];

  const login = (data: ILogin) => {
    const { accessToken: token, user } = data;

    // TODO: 토큰은 메모리에서 관리하고 유저 정보는 API로 조회하도록 수정되어야 한다.
    // setUserStorage(JSON.stringify(user));
    // setToken(token);

    setUser(user);
  };

  //   const logout = () => {
  //     setToken(null);
  //     setUser(null);
  //     localStorage.removeItem("accessToken"); // 로컬 스토리지에서 토큰 제거
  //   };

  return (
    <AuthContext.Provider value={{ token, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Context error");
  }
  return context;
};
