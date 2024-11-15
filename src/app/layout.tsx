// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Dancing_Script, Manrope, Nanum_Gothic } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Providers from "./providers";
import { cx } from "class-variance-authority";
import Auth from "@/components/auth";
import Link from "next/link";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"], // 사용할 문자 셋
  weight: ["400", "700"], // 폰트 굵기
  variable: "--font-body",
});

export const metadata = {
  title: {
    template: "%s | Book Rating",
    default: "Book Rating",
  },
};

const dancingScript = Dancing_Script({
  subsets: ["latin"], // 사용할 문자 셋
  weight: ["400", "700"], // 폰트 굵기
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased bg-gradient-to-br from-primary to-secondary ",
          fontHeading.variable,
          nanumGothic.variable
        )}
      >
        <div className="flex flex-col items-center min-h-screen">
          <header className="container w-full flex items-center justify-between px-4 md:px-6 py-4">
            <Link href="/">
              <div
                className={cx(dancingScript.className, "text-3xl font-bold")}
              >
                Book Rating
              </div>
            </Link>
            <Auth />
          </header>
          <Providers>{children}</Providers>
          <footer className="container flex justify-between w-full pb-5">
            <p>© 2024 Book Rating. All rights reserved.</p>
            <div className="flex gap-5 text-sm">
              <Link
                href="/privacy-policy"
                className="pr-5 border-r border-gray-400"
              >
                개인정보 처리방침
              </Link>
              <Link href="/terms">이용약관</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
