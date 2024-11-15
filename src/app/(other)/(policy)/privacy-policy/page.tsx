import React from "react";

const page = () => {
  return (
    <>
      <h2 className="text-center">개인정보 처리방침</h2>
      <p>
        본 Book rating 웹사이트는 Google OAuth를 통해 사용자의 정보를 인증하며,
        다음과 같은 개인정보를 처리합니다.
      </p>
      <h3>1. 수집하는 개인정보</h3>
      <ul>
        <li>구글 고유 ID: 사용자 구분을 위해 수집됩니다.</li>
        <li>이메일 주소: 사용자 인증을 위해 수집됩니다.</li>
        <li>
          프로필 이미지 URL: 사용자의 프로필 이미지를 표시하기 위해 수집됩니다.
        </li>
      </ul>
      <h3>2. 개인정보 사용 목적</h3>
      <ul>
        <li>사용자 인증 및 로그인 기능 제공</li>
        <li>웹사이트의 개인화된 사용자 경험 제공</li>
      </ul>
      <h3>3. 개인정보 보관 및 삭제</h3>
      <ul>
        <li>개인정보는 사용자가 웹사이트를 이용하는 동안만 보관됩니다.</li>
        <li>사용자가 요청하는 경우, 개인정보는 즉시 삭제됩니다.</li>
      </ul>
      <h3>4. 타사 서비스</h3>
      <ul>
        <li>
          본 웹사이트는 Google OAuth를 사용합니다. Google의 개인정보 처리방침은
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            className="text-blue-700 font-bold underline px-1"
          >
            여기
          </a>
          에서 확인할 수 있습니다.
        </li>
      </ul>
      <h3>5. 문의처</h3>
      <ul>
        <li>개인정보와 관련된 문의 사항은 아래 이메일로 연락해 주세요.</li>
        <li>이메일: 2aba1740@gmail.com</li>
      </ul>

      <p>본 개인정보 처리방침은 2024년 11월 14일부터 시행됩니다.</p>
    </>
  );
};

export default page;
