"use client";

import BookCard from "./book-card";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/actions/book";
import Link from "next/link";

export default function BookList() {
  const { data: books } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  return (
    <>
      {books?.map((book, index) => (
        <Link href={`/books/${book.id}`} key={index}>
          <BookCard book={book} />
        </Link>
      ))}
    </>
  );
}
