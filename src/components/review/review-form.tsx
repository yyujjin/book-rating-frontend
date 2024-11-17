import { Fn, Review } from "@/lib/types";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ChangeEvent, useState } from "react";
import { Star } from "lucide-react";
import Tooltip from "../ui/tooltip";
import { Content } from "@radix-ui/react-dialog";
import { toast } from "@/lib/hooks/use-toast";

export default function ReviewForm<T extends Partial<Review>>({
  review,
  onCancel,
  onSave,
}: {
  review: T;
  onCancel: Fn;
  onSave: (review: T) => void;
}) {
  const [formReview, setFormReview] = useState<T>({ ...review });
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

  const handleSave = () => {
    const { rating, content } = formReview;
    if (!rating) {
      return toast({ title: "점수를 선택하세요.", variant: "destructive" });
    } else if (!content) {
      return toast({ title: "내용을 입력하세요.", variant: "destructive" });
    }

    onSave(formReview);
    setFormReview(() => ({ rating: 0, content: "" } as T));
  };

  return (
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
        {/* <Button type="submit" variant="outline" onClick={onCancel}>
          Cancel
        </Button> */}
        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
