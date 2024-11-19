"use client";

import axiosClient from "@/lib/axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import LocalStorageService from "@/lib/local-storage";

const Auth = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const username = LocalStorageService.getUsername();
    setUser(username);
  }, []);

  const handleLogout = async () => {
    await axiosClient.post("auth/logout");
    LocalStorageService.clear();
    setUser(null);
  };
  return (
    <div>
      {user ? (
        <div className="flex gap-2 items-center">
          <div className="flex items-center rounded-lg px-4 py-2 h-10 gap-1">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={"/placeholder-user.jpg"} alt="User" />
              <AvatarFallback>{user}</AvatarFallback>
            </Avatar>
            <span>{user}</span>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-gray-200"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/register">Sign up</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Auth;
