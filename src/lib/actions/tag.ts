import axiosClient from "../axios";

export const fetchTags = async () => {
  const { data } = await axiosClient.get("http://localhost:8080/tags");
  return data;
};
