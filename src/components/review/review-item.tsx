import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FilePenIcon from "../icons/file-pen";
import { Button } from "../ui/button";
import TrashIcon from "../icons/trash";
import type { Fn, Review } from "@/lib/types";
import Rating from "../star-group";
import { useState } from "react";
import ReviewForm from "./review-form";
import { useReview } from "@/lib/hooks/review";
import Tooltip from "../ui/tooltip";

export default function BookReview({
  bookId,
  review,
  deleteHandler,
}: {
  bookId: number;
  review: Review;
  deleteHandler: Fn;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  const onCancel = () => {
    setIsEditMode(false);
  };

  const { updateReview } = useReview();
  const onSave = (formReview: Review) => {
    updateReview.mutate({
      bookId,
      review: { ...formReview, rating: Number(formReview.rating) },
    });
    onCancel();
  };

  return (
    <div className="flex items-start gap-4">
      <Avatar className="w-8 h-8 border mt-2">
        <AvatarImage src="/placeholder-user.jpg" alt="User" />
        <AvatarFallback>user</AvatarFallback>
      </Avatar>
      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between">
          <Rating rating={review.rating} />
          <div className="flex items-center gap-1 cursor-not-allowed">
            {/* 구글 로그인 될때까지 수정 기능 막기 */}
            {/* <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-muted/10"
              onClick={() => setIsEditMode(true)}
            >
              <FilePenIcon className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Button> */}

            <Tooltip content="관리자 권한만 삭제할 수 있습니다.">
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:bg-muted/10 disabled:cursor-not-allowed"
                onClick={deleteHandler}
                disabled={true}
              >
                <TrashIcon className="w-4 h-4 cursor-not-allowed" />
                <span className="sr-only">Delete</span>
              </Button>
            </Tooltip>
          </div>
        </div>
        {isEditMode ? (
          <ReviewForm review={review} onCancel={onCancel} onSave={onSave} />
        ) : (
          <p className="text-sm leading-relaxed line-clamp-3">
            {review.content}
          </p>
        )}
      </div>
    </div>
  );
}
