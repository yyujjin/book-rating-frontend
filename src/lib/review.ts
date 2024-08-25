import axios from "axios";

export const deleteReview = async (bookId: number, reviewId: number) => {
  try {
    await axios.delete(`api/books/${bookId}/reviews/${reviewId}`);
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
