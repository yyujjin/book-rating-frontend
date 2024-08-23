import { Book } from "@/lib/types";
import Rating from "../star-group";
import Image from "next/image";
import TagGroup from "../tag-group";
import { Button } from "../ui/button";
import FilePenIcon from "../icons/file-pen";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import BookForm from "./book-form";
import { patchBook } from "@/lib/actions";

export default function BookCard({
  book,
  setSelectedBook,
}: {
  book: Book;
  setSelectedBook: (book: Book) => void;
}) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState(book);

  const onSubmit = async () => {
    try {
      await patchBook(formData)
      setOpen(false)
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
        onClick={() => setSelectedBook(book)}
      >
        <Image
          src="/placeholder.svg"
          alt={book.title}
          width={500}
          height={700}
          className="object-cover w-full h-80"
          style={{ aspectRatio: "500/700", objectFit: "cover" }}
        />
        <div className="p-4 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-muted/40"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <FilePenIcon className="w-4 h-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <TagGroup tags={book.tags} />
          </div>
          <Rating rating={book.rating} />
        </div>
      </div>
      <Dialog onOpenChange={() => setOpen(false)} open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <BookForm formData={formData} setFormData={setFormData} editMode />
          <DialogFooter>
            <Button type="submit" onClick={onSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
