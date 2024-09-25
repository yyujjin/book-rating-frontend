import { AddReview, Book, Review } from "@/lib/types";
import { Button } from "../ui/button";
import Rating from "../star-group";
import BookReview from "../review/review-item";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { fetchReviews, postReview } from "@/lib/actions/review";
import { useEffect, useState } from "react";
import BookInfo from "./book-info";
import { deleteReview } from "@/lib/actions/review";
import ReviewEditForm from "../review/review-edit-form";

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

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchReviews(selectedBook.id).then((res: Response) => {
      setReviews(res.reviews);
      setAverageRating(res.averageRating);
    });
  }, [selectedBook.id]);

  const onSave = (formReview: AddReview) => {
    postReview(selectedBook.id, {
      ...formReview,
      rating: Number(formReview.rating),
    });
    // onCancel(); TODO:
  };

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
        <BookInfo selectedBook={selectedBook} averageRating={averageRating} />
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <h2 className="font-bold text-xl">Reviews</h2>
            <Button
              size={"sm"}
              className="gap-1"
              onClick={() => setShowAddForm(true)}
            >
              <PlusIcon />
              Add Review
            </Button>
          </div>
          {showAddForm && (
            <ReviewEditForm<AddReview>
              review={{ rating: 0, reviewText: "" }}
              onSave={onSave}
              onCancel={() => alert("cancel")}
            />
          )}
          <div className="space-y-4">
            {reviews &&
              reviews.map((c) => (
                <BookReview
                  key={c.id}
                  bookId={selectedBook.id}
                  review={c}
                  deleteHandler={() => deleteReview(selectedBook.id, c.id)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
