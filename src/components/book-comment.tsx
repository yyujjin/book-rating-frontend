import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FilePenIcon from "./icons/file-pen";
import { Button } from "./ui/button";
import TrashIcon from "./icons/trash";
import type { Review } from "@/lib/types";
import Rating from "./star-group";

export default function BookReview({ comment }: { comment: Review }) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="w-8 h-8 border mt-2">
        <AvatarImage src="/placeholder-user.jpg" alt="User" />
        <AvatarFallback>{comment.nickname}</AvatarFallback>
      </Avatar>
      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between">
          <Rating rating={3.5} />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-muted/10"
            >
              <FilePenIcon className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-muted/10"
            >
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        <p className="text-sm leading-relaxed line-clamp-3">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
