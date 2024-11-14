import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cx } from "class-variance-authority";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const dancingScript = Dancing_Script({
  subsets: ["latin"], // 사용할 문자 셋
  weight: ["400", "700"], // 폰트 굵기
});

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  const handleKakaoLogin = () => {
    // Implement Kakao login logic here
    console.log("Kakao login clicked");
  };
  return (
    <Card className="w-[400px] justify-center flex flex-col gap-10 p-10">
      <CardHeader className="space-y-2">
        <CardTitle
          className={`text-4xl font-bold text-center text-gray-600 ${dancingScript.className}`}
        >
          Book Rating
        </CardTitle>
        <CardDescription className={`text-lg italic text-center`}>
          Share good books with more people.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className={cx("w-full gap-2 font-bold")}
          asChild
        >
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}
          >
            <img
              width={16}
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            />
            Google로 로그인
          </Link>
        </Button>
        {/* <Button
          variant="outline"
          className="w-full bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90"
          onClick={handleKakaoLogin}
        >
          카카오톡으로 로그인
        </Button> */}
      </CardContent>
    </Card>
  );
}
