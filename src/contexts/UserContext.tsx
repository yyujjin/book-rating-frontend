"use client";

import { login as loginApi } from "@/lib/actions/auth";
import axiosClient from "@/lib/axios";
import LocalStorageService from "@/lib/local-storage";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoginInfo {
  username: string;
  password: string;
}

interface UserContextType {
  username: string | undefined;
  login: (loginInfo: LoginInfo) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<string | undefined>(undefined);

  //   useEffect(() => { // TODO:
  //     const username = LocalStorageService.getUsername();
  //     setUser(username);
  //   }, []);

  const login = async (values: LoginInfo) => {
    const data = await loginApi(values);
    if (!data) return;

    LocalStorageService.setAuth(data);
    setUser(data?.user.username);
    router.push("/");
  };

  const logout = async () => {
    await axiosClient.post("auth/logout");
    LocalStorageService.clear();
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ username: user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
