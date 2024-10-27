import { Fn, Review } from "@/lib/types";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ChangeEvent, useState } from "react";
import { Star } from "lucide-react";

export default function ReviewEditForm<T extends Partial<Review>>({
  review,
  onCancel,
  onSave,
}: {
  review: T;
  onCancel: Fn;
  onSave: (review: T) => void;
}) {
  const [formReview, setFromReview] = useState<T>({ ...review });
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFromReview({ ...formReview, [e.target.name]: e.target.value });
  };
  const handleRatingChange = (rating: number) => {
    setFromReview((prev) => ({ ...prev, rating }));
  };
  return (
    <form action="" className="space-y-2">
      <div>
        <Label>rating</Label>
        <div className="flex items-center mb-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="sm"
              className={`p-0 hover:text-yellow-400 ${
                star <= (formReview.rating ?? 0)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
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
        {/* <Button type="submit" variant="outline" onClick={onCancel}>
          Cancel
        </Button> */}
        <Button type="button" onClick={() => onSave(formReview)}>
          Save
        </Button>
      </div>
    </form>
  );
}
