import axios from "axios";
import { AddBook, Book } from "../types";
import axiosClient from "../axios";

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const { data } = await axiosClient.get(`books`);

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export const postBook = async (book: AddBook) => {
  try {
    await axiosClient.post(`books`, book);
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
    await axiosClient.patch(`books/${book.id}`, book);
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

export const deleteBook = async (bookId: number) => {
  try {
    await axiosClient.delete(`books/${bookId}`);
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 400) {
        throw new Error("리뷰가 등록된 책은 삭제할 수 없습니다.");
      }
    } else {
      console.error(err);
      throw new Error("Network Error");
    }
  }
};
