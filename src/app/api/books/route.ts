// app/api/books/route.js
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const KAKAO_API = "https://dapi.kakao.com/v3/search/book";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword");

  const { data } = await axios.get(`${KAKAO_API}?query=${keyword}`, {
    headers: {
      Authorization: process.env.KAKAO_API_KEY,
    },
  });

  return NextResponse.json(data);
}
