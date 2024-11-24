// TODO: 정리
export interface Book {
  id: number;
  title: string;
  isbn: string;
  tags: Tag[];
  averageRating: number;
  thumbnail: string;
  reviewCount: number;
  contents: string;
  datetime: string;
  url: string;
  authors: string;
  publisher: string;
}

export interface AddBook {
  title: string;
  isbn: string;
  tags?: number[];
  thumbnail: string;
  contents: string;
  datetime: string;
  url: string;
  authors: string[];
  publisher: string;
}

export interface KakaoResponseBook {
  authors: string[];
  title: string;
  publisher: string;
  thumbnail: string;
  isbn: string;
  contents: string;
  datetime: string;
  url: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  rating: number;
  content: string;
  updateAt?: string;
}

export interface ReviewResponse {
  bookId: number;
  reviews: ReviewResponseItem[];
}

export type ReviewResponseItem = Review & { user: IUser };

export type AddReview = Omit<Review, "id">;

export interface AddReviewResponse {
  review: Review;
  averageRating: number;
}

export interface DeleteReviewResponse {
  averageRating: number;
}

export type Fn = () => void;

export interface Tag {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  username: string;
}

export interface IRegisterUser {
  username: string;
  password: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: IUser;
}
