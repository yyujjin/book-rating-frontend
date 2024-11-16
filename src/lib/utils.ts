import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIsbn = (raw: string) => {
  const isbnList = raw.split(" ");
  if (isbnList.length < 2) {
    // 2007년 이전 발행된 책은 ISBN-10만 가지고 있을 수 있다.
    return isbnList[0];
  }

  // 2007년 이후에 ISBN-13이 국제 표준으로 채택되어,
  // ISBN-10과 ISBN-13 둘 다 가지거나 ISBN-13만 가질 수 있다.
  return isbnList[1];
};

export const validateSrc = (src: string) => {
  if (!src || (!src.startsWith("/") && !src.startsWith("http"))) {
    return "/placeholder.svg";
  }
  return src;
};
