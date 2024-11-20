import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="container flex justify-between w-full pb-5">
      <p>© 2024 Book Rating. All rights reserved.</p>
      <div className="flex gap-5 text-sm">
        <Link href="/privacy-policy" className="pr-5 border-r border-gray-400">
          개인정보 처리방침
        </Link>
        <Link href="/terms">이용약관</Link>
      </div>
    </footer>
  );
};

export default Footer;
