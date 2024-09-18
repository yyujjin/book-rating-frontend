"use client";

import { useEffect, useState } from "react";
import BookCard from "./book-card";
import BookModal from "./view-book-modal";
import { Book } from "@/lib/types";
import { fetchBooks } from "@/lib/actions/book";

export default function BookList() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchBooks();
      setBooks(data);
    }

    fetchData();
  }, []);

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
