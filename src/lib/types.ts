export interface Book {
  title: string;
  tags: string[];
  rating: number;
  level: number;
}

export interface Review {
  id: number;
  nickname: string;
  rate: number;
  content: string;
}
