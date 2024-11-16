import { Book } from "@/lib/types";
import Image from "next/image";
import TagGroup from "../tag-group";
import Rating from "../star-group";
import { validateSrc } from "@/lib/utils";

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
        src={validateSrc(selectedBook.bookCoverUrl)}
        alt={selectedBook.title}
        width={150}
        height={150}
        className="p-1 max-h-52 object-contain"
      />
      <div className="flex-1 w-full">
        <h2 className="text-xl font-bold mt-4">{selectedBook.title}</h2>
        <Rating rating={averageRating} />
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
          <TagGroup tags={selectedBook.tags} />
        </div>
      </div>
    </div>
  );
}
