"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const Auth = () => {
  const { user, logout } = useUser();
  const { username } = user || {};

  return (
    <div>
      {username ? (
        <div className="flex items-center">
          <div className="flex items-center rounded-lg py-2 h-10 gap-2">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={"/placeholder-user.jpg"} alt="User" />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <span className="text-slate-900 font-medium border-r pr-3 text-sm">
              {username}
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={logout}
            className="text-slate-900 font-medium"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="space-x-2">
          {/* <Button variant="ghost" asChild>
            <Link href="/register">Sign up</Link>
          </Button> */}

          <Button
            variant="ghost"
            asChild
            className="text-slate-900 font-semibold"
          >
            <Link href="/login">
              <div className="flex items-center gap-1">
                Login in
                <ArrowRightIcon />
              </div>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Auth;
