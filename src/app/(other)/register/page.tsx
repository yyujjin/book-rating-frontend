import { RegisterForm } from "@/components/auth/register-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"], // 사용할 문자 셋
  weight: ["400", "700"], // 폰트 굵기
});

export const metadata = {
  title: "Register",
};

export default function LoginPage() {
  return (
    <Card className="w-[400px] justify-center flex flex-col gap-5 p-5">
      <CardHeader className="space-y-2">
        <CardTitle className={`text-4xl font-bold text-center text-gray-600 `}>
          Sign up
        </CardTitle>
        <CardDescription className={`text-md italic text-center `}>
          Welcome!😊
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
