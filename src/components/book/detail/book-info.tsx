import { Book } from "@/lib/types";
import Image from "next/image";
import TagGroup from "../../tag-group";
import Rating from "../../star-group";
import { validateSrc } from "@/lib/utils";
import { DialogTitle } from "../../ui/dialog";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function BookInfo({
  selectedBook,
  averageRating,
}: {
  selectedBook: Book;
  averageRating: number;
}) {
  return (
    <div className="flex gap-16 justify-center text-slate-500">
      <Image
        src={validateSrc(selectedBook.thumbnail)}
        alt={selectedBook.title}
        width={150}
        height={150}
        className="p-1 max-h-52 object-contain"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <Rating rating={averageRating} />
          <Button variant="ghost" size="sm" className="h-auto">
            <HeartFilledIcon className="opacity-40 w-5 h-5" />
          </Button>
        </div>
        {/* {TODO:} */}
        <h1 className="mt-4 text-2xl lg:text-3xl font-bold text-slate-900">
          {selectedBook.title}
        </h1>
        <p className="text-sm mt-2">Version 1.0 (Updated June 5, 2021)</p>
        <p className="mt-6 text-slate-600 ">
          The Application UI Icon Pack comes with over 200 icons in 3 styles:
          outline, filled, and branded. This playful icon pack is tailored for
          complex application user interfaces with a friendly and legible look.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
          <TagGroup tags={selectedBook.tags} />
        </div>
      </div>
    </div>
  );
}
