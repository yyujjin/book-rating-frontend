import { RegisterForm } from "@/components/auth/register-form";
import Logo from "@/components/ui/logo";
import Link from "next/link";

export const metadata = {
  title: "Register",
};

export default function LoginPage() {
  return (
    <div className="w-[400px] justify-center flex flex-col p-5 border-0">
      <Logo className="text-center" />
      <RegisterForm />
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        이미 회원이세요?{" "}
        <Link
          href="/login"
          className="font-semibold text-amber-800 hover:text-amber-700"
        >
          로그인하기
        </Link>
      </p>
    </div>
  );
}
