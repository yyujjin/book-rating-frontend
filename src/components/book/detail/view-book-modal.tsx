import { Book, ReviewResponse } from "@/lib/types";
import BookReview from "../../review/review-item";
import { fetchReviews } from "@/lib/actions/review";
import { useState } from "react";
import BookInfo from "./book-info";
import { deleteReview } from "@/lib/actions/review";
import ReviewForm from "../../review/review-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/lib/hooks/use-toast";
import { AlertDialog } from "@/components/ui/alert-dialog";

export default function BookModal({
  selectedBook,
  setSelectedBook,
}: {
  selectedBook: Book;
  setSelectedBook: (selectedBook: Book | null) => void;
}) {
  const [averageRating, setAverageRating] = useState(
    selectedBook.averageRating
  );
  const [selectedReview, setSelectedReview] = useState<number | null>(null);

  const { isPending, isError, data, error } = useQuery<ReviewResponse>({
    queryKey: ["reviews", selectedBook],
    queryFn: () => fetchReviews(selectedBook.id),
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

  const handleAverageRating = (rating: number | undefined) => {
    setAverageRating(rating || 0);
  };

  return (
    <div className=" w-full max-h-[80vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-5">
        <BookInfo selectedBook={selectedBook} averageRating={averageRating} />
        <ReviewForm
          bookId={selectedBook.id}
          handleAverageRating={handleAverageRating}
        />
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
