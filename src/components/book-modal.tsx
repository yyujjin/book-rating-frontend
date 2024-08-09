import { Book } from "@/lib/types";
import HeartIcon from "./icons/heart-icon";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Rating from "./star-group";
import BookReview from "./book-comment";
import { comments } from "@/lib/dummy-data";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function BookModal({
  selectedBook,
  setSelectedBook,
}: {
  selectedBook: Book;
  setSelectedBook: (selectedBook: Book | null) => void;
}) {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-20">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 text-muted-foreground hover:bg-muted/10"
          onClick={() => setSelectedBook(null)}
        >
          <Cross2Icon className="w-5 h-5" />
        </Button>
        <div>
          <img
            src="/placeholder.svg"
            alt={selectedBook.title}
            width={500}
            height={700}
            className="object-cover w-full h-80 rounded-lg"
            style={{ aspectRatio: "500/700", objectFit: "cover" }}
          />
          <h2 className="text-2xl font-bold mt-4">{selectedBook.title}</h2>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
            {selectedBook.tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-bold text-xl">Reviews</h2>
          <Rating rating={selectedBook.rating} />
          <div className="space-y-4">
            {comments.map((c) => (
              <BookReview key={c.id} comment={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
