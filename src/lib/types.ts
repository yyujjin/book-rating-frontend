export interface Book {
  id: number;
  title: string;
  tags: Tag[];
  rating: number;
  level: number;
}

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
