import axios from "axios";

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
