import { Fn, Review } from "@/lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ChangeEvent, useState } from "react";

export default function ReviewEditForm({
  review,
  onCancel,
  onSave,
}: {
  review: Review;
  onCancel: Fn;
  onSave: (review: Review) => void;
}) {
  const [formReview, setFromReview] = useState({ ...review });
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFromReview({ ...formReview, [e.target.name]: e.target.value });
  };
  return (
    <form action="" className="space-y-2">
      <div>
        <Label>rating</Label>
        <Input
          type="number"
          name="rating"
          value={formReview.rating}
          onChange={onChange}
        />
      </div>
      <div>
        <Label>review</Label>
        <Textarea
          value={formReview.reviewText}
          name="reviewText"
          onChange={onChange}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="submit" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={() => onSave(formReview)}>
          Save
        </Button>
      </div>
    </form>
  );
}
