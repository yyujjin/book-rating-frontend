"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

const Auth = () => {
  const { username, logout } = useUser();

  return (
    <div>
      {username ? (
        <div className="flex gap-2 items-center">
          <div className="flex items-center rounded-lg px-4 py-2 h-10 gap-1">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={"/placeholder-user.jpg"} alt="User" />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <span>{username}</span>
          </div>
          <Button
            variant="outline"
            onClick={logout}
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
