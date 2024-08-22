"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComboboxDemo } from "../ui/combobox";
import { postBook } from "@/lib/actions";
import { AddBook } from "@/lib/types";
import { useState } from "react";
import BookForm from "./book-form";

export default function AddBookModal() {
  const [book, setBook] = useState<AddBook>({
    title: "",
    isbn: "",
    tagIds: [],
    rating: 1,
  });

  const changeValue = (e) => {
    setBook({ ...book, [e.target.id]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await postBook(book);
      alert("추가되었습니다.");
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center justify-center h-full">
            <Button
              size="lg"
              variant="ghost"
              className="transition-transform duration-300 text-gray-700 hover:bg-primary/10 group-hover:scale-125 group-hover:text-gray-800"
            >
              <PlusIcon className="w-6 h-6" />
              Add Book
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <BookForm />
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
