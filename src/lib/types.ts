export interface Book {
  id: number;
  title: string;
  isbn: string;
  tags: Tag[];
  averageRating: number;
  thumbnail: string;
}

export interface AddBook {
  title: string;
  isbn: string;
  tags: number[];
  thumbnail: string;
}

export interface KakaoResponseBook {
  authors: string[];
  title: string;
  publisher: string;
  thumbnail: string;
  isbn: string;
  contents: string;
}

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
