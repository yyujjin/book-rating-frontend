import { AddReview, Book, Review } from "@/lib/types";
import { Button } from "../ui/button";
import BookReview from "../review/review-item";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { fetchReviews, postReview } from "@/lib/actions/review";
import { useState } from "react";
import BookInfo from "./book-info";
import { deleteReview } from "@/lib/actions/review";
import ReviewEditForm from "../review/review-edit-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const [showAddForm, setShowAddForm] = useState(false);

  const { isPending, isError, data, error } = useQuery<Response>({
    queryKey: ["reviews", selectedBook],
    queryFn: () => fetchReviews(selectedBook.id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const onSave = (formReview: AddReview) => {
    const { rating } = formReview;
    if (rating < 0 || rating > 5) {
      alert("0 ~ 5 사이의 값만 입력 가능합니다.");
      return;
    }

    mutation.mutate({
      bookId: selectedBook.id,
      review: {
        ...formReview,
        rating: Number(formReview.rating),
      },
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
        <BookInfo
          selectedBook={selectedBook}
          averageRating={data?.averageRating || 0}
        />
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
              review={{ rating: 0, content: "" }}
              onSave={onSave}
              onCancel={() => setShowAddForm(false)}
            />
          )}
          <div className="space-y-4">
            {data?.reviews.length ? (
              data?.reviews.map((c) => (
                <BookReview
                  key={c.id}
                  bookId={selectedBook.id}
                  review={c}
                  deleteHandler={() => deleteReview(selectedBook.id, c.id)}
                />
              ))
            ) : (
              <div className="text-gray-500 italic">
                There’s no review yet. Be the first to write one! ✍️
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
