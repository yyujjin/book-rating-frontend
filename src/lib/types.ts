export interface Book {
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
  nickname: string;
  rate: number;
  content: string;
}
