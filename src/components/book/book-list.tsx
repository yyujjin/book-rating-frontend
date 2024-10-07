"use client";

import { useState } from "react";
import BookCard from "./book-card";
import BookModal from "./view-book-modal";
import { Book } from "@/lib/types";
import { fetchBooks } from "@/lib/actions/book";
import { useQuery } from "@tanstack/react-query";

export default function BookList() {
  const {
    isPending,
    isError,
    data: books,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  return (
    <>
      {books?.map((book, index) => (
        <BookCard key={index} book={book} setSelectedBook={setSelectedBook} />
      ))}
      {selectedBook && (
        <BookModal
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
    </>
  );
}
