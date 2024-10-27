import { useState } from "react";
import BookCard from "./book-card";
import BookModal from "./view-book-modal";
import { Book } from "@/lib/types";
import { fetchBooks } from "@/lib/actions/book";
import axiosClient, { ssrAxiosClient } from "@/lib/axios";

async function getBooks(): Promise<Book[]> {
  const { data } = await ssrAxiosClient.get("/books");
  return data;
}

export default async function BookList() {
  const books = await getBooks();

  return (
    <>
      {books?.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
      {/* {selectedBook && (
        <BookModal
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )} */}
    </>
  );
}
