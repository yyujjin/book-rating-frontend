"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BookInfo from "@/components/book/detail/book-info";
import ReviewForm from "@/components/review/review-form";
import { notFound } from "next/navigation";
import { fetchBook } from "@/lib/actions/book";
import ReviewList from "@/components/review/review-list";
import { AxiosError } from "axios";

export default function BookDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    data: selectedBook,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(+id),
    retry: (_, error) => {
      const axiosError = error as AxiosError;

      // 네트워크 오류일 때만 재시도
      if (axiosError?.response?.status === 500) return true;
      return false;
    },
  });

  const [averageRating, setAverageRating] = useState(
    selectedBook?.averageRating || 0
  );

  const handleAverageRating = (rating: number | undefined) => {
    setAverageRating(rating || 0);
  };

  if (isFetching) {
    return <div>loading...</div>;
  }

  if (isError || !selectedBook) {
    return notFound();
  }

  return (
    <div className="container md:w-3/4 lg:w-1/2 mx-auto py-8 px-4 md:px-6 flex flex-col  gap-6">
      <BookInfo selectedBook={selectedBook} averageRating={averageRating} />
      <ReviewForm
        bookId={selectedBook?.id}
        handleAverageRating={handleAverageRating}
      />
      <ReviewList
        selectedBook={selectedBook}
        setAverageRating={setAverageRating}
      />
    </div>
  );
}
