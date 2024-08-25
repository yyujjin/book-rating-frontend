import { Fn, Review } from "@/lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function ReviewEditForm({
  review,
  onClose,
  onSave,
}: {
  review: Review;
  onClose: Fn;
  onSave: Fn;
}) {
  return (
    <form action="" className="space-y-2">
      <div>
        <Label>rating</Label>
        <Input type="number" defaultValue={review.rating} />
      </div>
      <div>
        <Label>review</Label>
        <Textarea defaultValue={review.reviewText} />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="submit" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={onSave}>
          Save
        </Button>
      </div>
    </form>
  );
}
