import React from "react";
import Auth from "../auth";
import Logo from "../ui/logo";
import Nav from "./navbar";

const header = () => {
  return (
    <header className="container w-full flex items-center justify-between h-16 border-b">
      <div className="flex gap-10 items-center h-full">
        <Logo />
        <Nav />
      </div>
      <Auth />
    </header>
  );
};

export default header;
