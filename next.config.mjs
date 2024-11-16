/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// 요청이 api 로 시작할 경우 백엔드 서버를 호출
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
  images: {
    domains: ["search1.kakaocdn.net"], // 외부 이미지 호스트 추가
  },
};

export default nextConfig;
