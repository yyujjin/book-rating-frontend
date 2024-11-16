"use client";

import axiosClient from "@/lib/axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { IUser } from "@/lib/types";

const Auth = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const getUserInfo = async () => {
    try {
      const { data } = await axiosClient.post<IUser>("loginInfo");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 구글 심사 동안 인증 없이 서비스
  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  const handleLogout = async () => {
    await axiosClient.post("logout");
    setUser(null);
  };
  return (
    <div>
      {user ? (
        <div className="flex gap-2 items-center">
          <Avatar className="h-8 w-8 border">
            <AvatarImage
              src={user.avatar || "/placeholder-user.jpg"}
              alt="User"
            />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-gray-200"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      )}
    </div>
  );
};

export default Auth;
