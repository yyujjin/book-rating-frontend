import React, { useState } from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { deleteReview, fetchReviews } from "@/lib/actions/review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Book, ReviewResponse } from "@/lib/types";
import { toast } from "@/lib/hooks/use-toast";
import BookReview from "./review-item";

interface Props {
  selectedBook: Book;
  setAverageRating: (rating: number) => void;
}
const ReviewList = ({ selectedBook, setAverageRating }: Props) => {
  const [selectedReview, setSelectedReview] = useState<number | null>(null);

  const { isPending, isError, data, error } = useQuery<ReviewResponse>({
    queryKey: ["reviews", selectedBook],
    queryFn: () => fetchReviews(selectedBook.id),
    enabled: !!selectedBook?.id,
  });

  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: deleteReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setAverageRating(data?.data.averageRating || 0);
      toast({ title: "리뷰가 삭제되었습니다." });
      queryClient.invalidateQueries({ queryKey: ["my-review"] });
    },
  });
  return (
    <>
      <div className="flex flex-col p-4 border-t">
        <h3 className="text-sm font-medium mb-4 text-slate-800">Reviews</h3>
        <div className="flex-grow overflow-auto mb-4 pr-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {data?.reviews.length === 0 ? (
            <div className="text-gray-500 italic">
              There’s no review yet. Be the first to write one! ✍️
            </div>
          ) : (
            data?.reviews.map((c) => (
              <BookReview
                key={c.id}
                bookId={selectedBook.id || 0}
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
    </>
  );
};

export default ReviewList;
