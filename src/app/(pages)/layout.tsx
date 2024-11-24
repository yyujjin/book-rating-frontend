import Header from "@/components/layout/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="py-7 w-full flex flex-col items-center min-h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;
