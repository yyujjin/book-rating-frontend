import axios from "axios";
import { AddBook, Book } from "./types";

export const fetchBooks = async () => {
  const { data } = await axios.get("http://localhost:8080/books");
  return data;
};

export const fetchTags = async () => {
  const { data } = await axios.get("http://localhost:8080/tags");
  return data;
};

export const fetchReviews = async (bookId: number) => {
  const { data } = await axios.get(`api/books/${bookId}/reviews`);
  return data;
};

export const postBook = async (book: AddBook) => {
  try {
    await axios.post(`api/books`, book);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 409) {
        throw new Error("이미 등록된 ISBN입니다.");
      }
    } else {
      console.error(err);
      throw new Error("Network Error");
    }
  }
};

export const patchBook = async (book: Book) => {
  try {
    await axios.patch(`api/books/${book.id}`, book);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 400) {
        throw new Error("존재하지 않는 책입니다.");
      }
    } else {
      console.error(err);
      throw new Error("Network Error");
    }
  }
};