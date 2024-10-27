import BookCard from "./book-card";
import { Book } from "@/lib/types";
import { ssrAxiosClient } from "@/lib/axios";

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
    </>
  );
}
