import { Book, Review } from "./types";

export const books: Book[] = [
  {
    title: "To Kill a Mockingbird",
    tags: ["Fiction", "Classic", "Drama"],
    rating: 4.7,
    level: 4,
  },
  {
    title: "1984",
    tags: ["Fiction", "Dystopian", "Classic"],
    rating: 5,
    level: 5,
  },
  {
    title: "Pride and Prejudice",
    tags: ["Fiction", "Romance", "Classic"],
    rating: 4.5,
    level: 4,
  },
  {
    title: "The Kite Runner",
    tags: ["Fiction", "Drama", "Historical"],
    rating: 4.4,
    level: 4,
  },
  {
    title: "The Handmaid's Tale",
    tags: ["Fiction", "Dystopian", "Feminist"],
    rating: 4.6,
    level: 5,
  },
  {
    title: "The Hobbit",
    tags: ["Fantasy", "Adventure", "Classic"],
    rating: 4.7,
    level: 3,
  },
];

export const comments: Review[] = [
  {
    id: 1,
    nickname: "JD",
    rate: 4.5,
    content:
      "This book is a masterpiece! The characters are so well-developed and the plot is captivating from start to finish. I couldn't put it down. Highly recommended for anyone who loves thought-provoking fiction.",
  },
  {
    id: 2,
    nickname: "MD",
    rate: 3.5,
    content:
      "I enjoyed the book, but I felt the pacing was a bit slow at times. The characters were interesting, but I wished there was more character development. Overall, it's a solid read, but not my personal favorite.",
  },
];
