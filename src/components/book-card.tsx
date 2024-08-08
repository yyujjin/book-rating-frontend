import Link from "next/link";
import { Badge } from "./ui/badge";
import StarIcon from "./icons/star-icon";
import { Button } from "./ui/button";
import HeartIcon from "./icons/heart-icon";

export default function BookCard({ book, setSelectedBook }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={() => setSelectedBook(book)}
    >
      <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
        <span className="sr-only">View Book</span>
      </Link>
      <img
        src="/placeholder.svg"
        alt={book.title}
        width={500}
        height={700}
        className="object-cover w-full h-80"
        style={{ aspectRatio: "500/700", objectFit: "cover" }}
      />
      <div className="p-4 bg-background">
        <h3 className="text-xl font-bold">{book.title}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {book.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                className={`w-5 h-5 ${
                  i < Math.floor(book.rating)
                    ? "fill-primary"
                    : "fill-muted stroke-muted-foreground"
                }`}
              />
            ))}
          </div>
          <div className="text-sm font-medium">{book.rating}</div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary">Level {book.level}</Badge>
          <Button
            size="sm"
            variant="ghost"
            className="text-primary hover:bg-primary/10"
          >
            <HeartIcon className="w-5 h-5" />
            <span className="sr-only">Add to Favorites</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
