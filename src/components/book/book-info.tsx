import { Book } from "@/lib/types";
import Image from "next/image";
import TagGroup from "../tag-group";

export default function BookInfo({ selectedBook }: { selectedBook: Book }) {
  return (
    <div>
      <Image
        src="/placeholder.svg"
        alt={selectedBook.title}
        width={500}
        height={700}
        className="object-cover w-full h-80 rounded-lg"
        style={{ aspectRatio: "500/700", objectFit: "cover" }}
      />
      <h2 className="text-2xl font-bold mt-4">{selectedBook.title}</h2>
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
        <TagGroup tags={selectedBook.tags} />
      </div>
    </div>
  );
}
