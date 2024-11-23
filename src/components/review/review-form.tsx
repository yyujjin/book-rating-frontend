import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useReviewForm } from "@/lib/hooks/use-review-form";
import { ChangeEvent } from "react";
import { useUser } from "@/contexts/UserContext";
import Tooltip from "../ui/tooltip";

export default function ReviewForm({
  bookId,
  handleAverageRating,
}: {
  bookId: number;
  handleAverageRating: (rating: number | undefined) => void;
}) {
  const { formReview, mode, setFormReview, handleSave, myReview } =
    useReviewForm(bookId, handleAverageRating);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormReview({ ...formReview, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    rating: number
  ) => {
    e.stopPropagation();
    setFormReview((prev) => ({ ...prev, rating }));
  };

  const { user } = useUser();

  return (
    <div className="p-4 border-t">
      <h4 className="text-sm font-medium mb-4 text-slate-800">
        {myReview ? "나의 후기" : "새 후기 작성"}
      </h4>
      <div className="space-y-2">
        <div>
          <Label>rating</Label>
          <div className="flex items-center mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                size="sm"
                className={`p-0 hover:text-yellow-400 focus-visible:ring-opacity-0 ${
                  star <= (formReview.rating ?? 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={(e) => handleRatingChange(e, star)}
              >
                <Star className="w-6 h-6 fill-current" />
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label>review</Label>
          <Textarea
            value={formReview.content}
            name="content"
            onChange={onChange}
            className="bg-white"
          />
        </div>
        <div className="flex gap-2 justify-end">
          {!user ? (
            <Tooltip content="">
              <Button disabled>로그인이 필요합니다</Button>
            </Tooltip>
          ) : (
            <Button type="button" onClick={handleSave}>
              {mode === "create" ? "Save" : "Edit"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
