import { AddReview, Book, Review } from "@/lib/types";
import { Button } from "../ui/button";
import BookReview from "../review/review-item";
import { Cross2Icon } from "@radix-ui/react-icons";
import { fetchReviews, postReview } from "@/lib/actions/review";
import { useState } from "react";
import BookInfo from "./book-info";
import { deleteReview } from "@/lib/actions/review";
import ReviewEditForm from "../review/review-edit-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "../ui/card";

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
    onError: (err) => {
      alert(err);
    },
  });

  const onSave = (formReview: AddReview) => {
    mutation.mutate({
      bookId: selectedBook.id,
      review: {
        ...formReview,
        rating: Number(formReview.rating),
      },
    });
  };

  const onDelete = async (bookId: number, reviewId: number) => {
    try {
      await deleteReview(bookId, reviewId);
    } catch (err) {
      alert(err);
    }
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
        {/* 우측: 후기 목록 및 작성 */}
        <div className="flex flex-col ">
          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          <div className="flex-grow overflow-auto mb-4 pr-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {data?.reviews.length === 0 ? (
              <div className="text-gray-500 italic">
                There’s no review yet. Be the first to write one! ✍️
              </div>
            ) : (
              data?.reviews.map((c) => (
                <BookReview
                  key={c.id}
                  bookId={selectedBook.id}
                  review={c}
                  deleteHandler={() => onDelete(selectedBook.id, c.id)}
                />
              ))
            )}
          </div>

          {false ? (
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-semibold text-gray-600">
                  리뷰는 한 번만 작성 가능합니다.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white">
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold mb-2">새 후기 작성</h4>

                <ReviewEditForm<AddReview>
                  review={{ rating: 0, content: "" }}
                  onSave={onSave}
                  onCancel={() => setShowAddForm(false)}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
