import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FilePenIcon from "../icons/file-pen";
import { Button } from "../ui/button";
import TrashIcon from "../icons/trash";
import type { Fn, Review, ReviewResponseItem } from "@/lib/types";
import Rating from "../star-group";
import { useEffect, useState } from "react";
import { useReview } from "@/lib/hooks/review";
import LocalStorageService from "@/lib/local-storage";

const IS_ADMIN = process.env.NEXT_PUBLIC_IS_ADMIN === "true" ? false : true;

export default function BookReview({
  bookId,
  review,
  deleteHandler,
}: {
  bookId: number;
  review: ReviewResponseItem;
  deleteHandler: Fn;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-b-gray-100">
      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Rating rating={review.rating} />
          </div>
          <div className="flex items-center gap-1 cursor-not-allowed">
            <div className="text-xs space-x-1">
              <span className="font-bold">{review.user.username}</span>
              <span className="text-gray-500">{review.updateAt}</span>
            </div>
            {review.user.id === LocalStorageService.getUserId() && (
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:bg-muted/10"
                onClick={deleteHandler}
              >
                <TrashIcon
                  className={`w-4 h-4 ${!IS_ADMIN ? "cursor-not-allowed" : ""}`}
                />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm leading-relaxed line-clamp-3 pb-2">
          {review.content}
        </p>
      </div>
    </div>
  );
}
