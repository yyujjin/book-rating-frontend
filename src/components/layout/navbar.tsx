"use client";

import { cx } from "class-variance-authority";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"], // 사용할 문자 셋
  weight: ["400", "500", "600", "700"], // 폰트 굵기
  variable: "--font-nav",
});

const menus = [
  {
    label: "책 탐색",
    link: "/books",
  },
  {
    label: "내 책장",
    link: "/my-books",
  },
];
const active = "border-b-2 border-b-primary";
const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-10 h-full items-stretch">
      {menus.map(({ label, link }) => (
        <Link
          href={link}
          className={cx(
            link === pathname ? active : "text-slate-500",
            "font-medium transition duration-200 inline-flex items-center px-2",
            notoSansKr.variable,
            "font-sans"
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
