import axios from "axios";
import { AddReview, Review } from "../types";
import axiosClient from "../axios";

export const fetchReviews = async (bookId: number) => {
  const { data } = await axiosClient.get(`books/${bookId}/reviews`);
  return data;
};

export const postReview = async (bookId: number, review: AddReview) => {
  try {
    await axiosClient.post(`books/${bookId}/reviews`, review);
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

export const patchReview = async (bookId: number, review: Review) => {
  try {
    await axiosClient.patch(`books/${bookId}/reviews/${review.id}`, review);
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

export const deleteReview = async (bookId: number, reviewId: number) => {
  try {
    await axiosClient.delete(`books/${bookId}/reviews/${reviewId}`);
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
