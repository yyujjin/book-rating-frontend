import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddBook } from "@/lib/types";
import { useState } from "react";
import { ComboboxDemo } from "../ui/combobox";

export default function BookForm() {
  const [book, setBook] = useState<AddBook>({
    title: "",
    isbn: "",
    tagIds: [],
    rating: 1,
  });

  const changeValue = (e) => {
    setBook({ ...book, [e.target.id]: e.target.value });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          value={book.title}
          className="col-span-3"
          onChange={changeValue}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isbn" className="text-right">
          ISBN
        </Label>
        <Input
          id="isbn"
          value={book.isbn}
          className="col-span-3"
          onChange={changeValue}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Tags
        </Label>
        <ComboboxDemo className="col-span-3 justify-between" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="rating" className="text-right">
          Rating
        </Label>
        <Input
          id="rating"
          type="number"
          className="col-span-3"
          value={book.rating}
          onChange={changeValue}
        />
      </div>
    </div>
  );
}
