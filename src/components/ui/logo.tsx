import { cx } from "class-variance-authority";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import React from "react";

const dancingScript = Dancing_Script({
  subsets: ["latin"], // 사용할 문자 셋
  weight: ["400", "700"], // 폰트 굵기
});

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
      <div
        className={cx(dancingScript.className, className, "text-3xl font-bold")}
      >
        Book Rating
      </div>
    </Link>
  );
};

export default Logo;
