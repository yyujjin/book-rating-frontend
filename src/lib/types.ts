export interface Book {
  id: number;
  title: string;
  isbn: string;
  tags: Tag[];
  rating: number;
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
  reviewText: string;
  updateAt: Date;
}

export type Fn = () => void;
