import { AddReview, Book, Review, ReviewResponse } from "@/lib/types";
import { Button } from "../../ui/button";
import BookReview from "../../review/review-item";
import { Cross2Icon } from "@radix-ui/react-icons";
import { fetchReviews, postReview } from "@/lib/actions/review";
import { useState } from "react";
import BookInfo from "./book-info";
import { deleteReview } from "@/lib/actions/review";
import ReviewForm from "../../review/review-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "../../ui/card";
import { toast } from "@/lib/hooks/use-toast";
import { AlertDialog } from "@/components/ui/alert-dialog";

export default function BookModal({
  selectedBook,
  setSelectedBook,
}: {
  selectedBook: Book;
  setSelectedBook: (selectedBook: Book | null) => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [averageRating, setAverageRating] = useState(
    selectedBook.averageRating
  );
  const [selectedReview, setSelectedReview] = useState<number | null>(null);

  const { isPending, isError, data, error } = useQuery<ReviewResponse>({
    queryKey: ["reviews", selectedBook],
    queryFn: () => fetchReviews(selectedBook.id),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setAverageRating(data?.data.averageRating || 0);
      toast({ title: "리뷰가 등록되었습니다." });
    },
    onError: (err) => {
      alert(err);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setAverageRating(data?.data.averageRating || 0);
      toast({ title: "리뷰가 삭제되었습니다." });
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

  return (
    <div className=" w-full max-h-[80vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-5">
        <BookInfo selectedBook={selectedBook} averageRating={averageRating} />
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

              <ReviewForm<AddReview>
                review={{ rating: 0, content: "" }}
                onSave={onSave}
                onCancel={() => setShowAddForm(false)}
              />
            </CardContent>
          </Card>
        )}
      </div>

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
                deleteHandler={() => setSelectedReview(c.id)}
              />
            ))
          )}
        </div>
      </div>
      <AlertDialog
        open={!!selectedReview}
        handleOpen={() => setSelectedReview(null)}
        handleAction={() =>
          mutationDelete.mutate({
            bookId: selectedBook.id,
            reviewId: selectedReview!,
          })
        }
        title="정말 리뷰를 삭제하시겠습니까?"
      />
    </div>
  );
}
