"use client";

import BookCard from "./book-card";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/actions/book";

export default function BookList() {
  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <>
      {books?.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </>
  );
}
