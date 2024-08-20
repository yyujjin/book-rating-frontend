import axios from "axios";

export const fetchBooks = async () => {
  const { data } = await axios.get("http://localhost:8080/books");
  return data;
};

export const fetchTags = async () => {
  const { data } = await axios.get("http://localhost:8080/tags");
  return data;
};
