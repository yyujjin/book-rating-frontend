import Link from "next/link";
import { Badge } from "../ui/badge";
import { Book } from "@/lib/types";
import Rating from "../star-group";
import Image from "next/image";
import TagGroup from "../tag-group";

export default function BookCard({
  book,
  setSelectedBook,
}: {
  book: Book;
  setSelectedBook: (book: Book) => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={() => setSelectedBook(book)}
    >
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Book</span>
      </Link>
      <Image
        src="/placeholder.svg"
        alt={book.title}
        width={500}
        height={700}
        className="object-cover w-full h-80"
        style={{ aspectRatio: "500/700", objectFit: "cover" }}
      />
      <div className="p-4 bg-white">
        <h3 className="text-xl font-bold">{book.title}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <TagGroup tags={book.tags} />
        </div>
        <Rating rating={book.rating} />
      </div>
    </div>
  );
}
