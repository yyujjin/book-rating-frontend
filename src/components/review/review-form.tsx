import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useReviewForm } from "@/lib/hooks/use-review-form";
import { ChangeEvent } from "react";

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

  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <h4 className="text-lg font-semibold mb-2">
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
            <Button type="button" onClick={handleSave}>
              {mode === "create" ? "Save" : "Edit"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
