import React from "react";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import Auth from "../auth";
import { cx } from "class-variance-authority";
import Logo from "../ui/logo";

const header = () => {
  return (
    <header className="container w-full flex items-center justify-between px-4 md:px-6 py-4 border-b">
      <Logo />
      <Auth />
    </header>
  );
};

export default header;
