import { Book, Review } from "@/lib/types";
import { Button } from "../ui/button";
import Rating from "../star-group";
import BookReview from "./review-item";
import { Cross2Icon } from "@radix-ui/react-icons";
import { fetchReviews } from "@/lib/actions";
import { useEffect, useState } from "react";
import BookInfo from "./book-info";

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
  }, [selectedBook.id]);

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
        <BookInfo selectedBook={selectedBook} />
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
