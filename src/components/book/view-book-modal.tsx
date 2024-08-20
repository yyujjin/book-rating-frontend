import { Book, Review } from "@/lib/types";
import { Button } from "../ui/button";
import Rating from "../star-group";
import BookReview from "./review-item";
import { Cross2Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import TagGroup from "../tag-group";
import { fetchReviews } from "@/lib/actions";
import { useEffect, useState } from "react";

interface Response {
  reviews: Review[];
  averageRating: number;
}

export default function BookModal({
  selectedBook,
  setSelectedBook,
}: {
  selectedBook: Book;
  setSelectedBook: (selectedBook: Book | null) => void;
}) {
  const [reviews, setReviews] = useState<Review[]>();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews(selectedBook.id).then((res: Response) => {
      setReviews(res.reviews);
      setAverageRating(res.averageRating);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-20">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 text-muted-foreground hover:bg-muted/10"
          onClick={() => setSelectedBook(null)}
        >
          <Cross2Icon className="w-5 h-5" />
        </Button>
        <div>
          <Image
            src="/placeholder.svg"
            alt={selectedBook.title}
            width={500}
            height={700}
            className="object-cover w-full h-80 rounded-lg"
            style={{ aspectRatio: "500/700", objectFit: "cover" }}
          />
          <h2 className="text-2xl font-bold mt-4">{selectedBook.title}</h2>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
            <TagGroup tags={selectedBook.tags} />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-xl">Reviews</h2>
          <Rating rating={averageRating} />
          <div className="space-y-4">
            {reviews &&
              reviews.map((c) => <BookReview key={c.id} review={c} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
