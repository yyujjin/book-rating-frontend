export interface Book {
  id: number;
  title: string;
  isbn: string;
  tags: Tag[];
  average: number;
}

export type AddBook = Omit<Book, "id" | "tags"> & {
  tagIds: number[];
};

export interface Tag {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  rating: number;
  content: string;
  updateAt?: Date;
}

export type AddReview = Omit<Review, "id">;

export type Fn = () => void;

export interface Tag {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  avatar: string;
}
