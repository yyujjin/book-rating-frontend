"use client";

import { useState } from "react";
import BookCard from "./book-card";
import BookModal from "./view-book-modal";
import { Book } from "@/lib/types";

export default function BookList({ books }: { books: Book[] }) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  return (
    <>
      {books.map((book, index) => (
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
