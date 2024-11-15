import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="privacy-policy rounded-xl bg-gray-50 p-10 my-2 shadow-lg">
      {children}
    </div>
  );
};

export default Layout;
