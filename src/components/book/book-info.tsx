import { Book } from "@/lib/types";
import Image from "next/image";
import TagGroup from "../tag-group";
import Rating from "../star-group";

export default function BookInfo({
  selectedBook,
  averageRating,
}: {
  selectedBook: Book;
  averageRating: number;
}) {
  return (
    <div className="flex gap-5 items-center">
      <Image
        src="/placeholder.svg"
        alt={selectedBook.title}
        width={200}
        height={200}
        className="object-cover rounded-lg"
        style={{ aspectRatio: "100/100", objectFit: "cover" }}
      />
      <div>
        <h2 className="text-2xl font-bold mt-4">{selectedBook.title}</h2>
        <Rating rating={averageRating} />
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
          <TagGroup tags={selectedBook.tags} />
        </div>
      </div>
    </div>
  );
}
