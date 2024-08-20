import { Tag } from "@/lib/types";
import { Badge } from "./ui/badge";

export default function TagGroup({ tags }: { tags: Tag[] }) {
  return tags.map((tag) => (
    <Badge key={tag.id} variant="outline">
      {tag.name}
    </Badge>
  ));
}
