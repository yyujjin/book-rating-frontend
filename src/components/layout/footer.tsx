import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="container flex justify-between w-full py-4 text-sm text-slate-500 border-t border-gray-100">
      <p>© 2024 Book Rating. All rights reserved.</p>
      <Link
        target="_blank"
        href="https://github.com/suhyeoonn/book-rating-frontend"
      >
        <Image src={"/github.svg"} width={24} height={24} alt="github" />
      </Link>
      {/* <div className="flex gap-5 text-sm">
        <Link href="/privacy-policy" className="pr-5 border-r">
          개인정보 처리방침
        </Link>
        <Link href="/terms">이용약관</Link>
      </div> */}
    </footer>
  );
};

export default Footer;
