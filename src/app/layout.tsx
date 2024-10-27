// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Manrope, Nanum_Gothic } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import Providers from "./providers";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased",
          fontHeading.variable,
          nanumGothic.variable
        )}
      >
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary min-h-screen">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
