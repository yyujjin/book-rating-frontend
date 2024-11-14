import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-7 w-full flex flex-col items-center min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
