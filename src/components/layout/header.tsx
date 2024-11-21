import React from "react";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import Auth from "../auth";
import { cx } from "class-variance-authority";

const dancingScript = Dancing_Script({
  subsets: ["latin"], // 사용할 문자 셋
  weight: ["400", "700"], // 폰트 굵기
});

const header = () => {
  return (
    <header className="container w-full flex items-center justify-between px-4 md:px-6 py-4 border-b">
      <Link href="/">
        <div className={cx(dancingScript.className, "text-3xl font-bold")}>
          Book Rating
        </div>
      </Link>
      <Auth />
    </header>
  );
};

export default header;
