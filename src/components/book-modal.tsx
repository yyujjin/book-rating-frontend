import HeartIcon from "./icons/heart-icon";
import StarIcon from "./icons/star-icon";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function BookModal({ selectedBook, setSelectedBook }) {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-20">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl h-full max-h-[80vh] overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
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
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">Level {selectedBook.level}</Badge>
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
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  className={`w-5 h-5 ${
                    i < Math.floor(selectedBook.rating)
                      ? "fill-primary"
                      : "fill-muted stroke-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm font-medium">{selectedBook.rating}</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    </div>
                    <div className="text-sm font-medium">4.5</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:bg-muted/10"
                    >
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:bg-muted/10"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed line-clamp-3">
                  This book is a masterpiece! The characters are so
                  well-developed and the plot is captivating from start to
                  finish. I couldn't put it down. Highly recommended for anyone
                  who loves thought-provoking fiction.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-primary" />
                      <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                      <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                    </div>
                    <div className="text-sm font-medium">3.5</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:bg-muted/10"
                    >
                      <FilePenIcon className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:bg-muted/10"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed line-clamp-3">
                  I enjoyed the book, but I felt the pacing was a bit slow at
                  times. The characters were interesting, but I wished there was
                  more character development. Overall, it's a solid read, but
                  not my personal favorite.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:bg-muted/10"
            onClick={() => setSelectedBook(null)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  function FilePenIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
      </svg>
    );
  }

  function TrashIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    );
  }
}
