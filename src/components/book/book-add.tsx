"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { postBook } from "@/lib/actions/book";
import { AddBook } from "@/lib/types";
import { useState } from "react";
import BookForm from "./book-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function BookAdd() {
  const [open, setOpen] = useState(false);

  const [book, setBook] = useState<AddBook>({
    title: "",
    isbn: "",
    tagIds: [],
    average: 1,
  });

  const onSubmit = async () => {
    try {
      if (!book.title || !book.isbn) {
        alert("값을 입력하세요");
        return;
      }

      mutation.mutate(book);
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postBook,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
  return (
    <>
      <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
        <div className="flex items-center justify-center h-full">
          <Link href="/add-book">
            <Button
              size="lg"
              variant="ghost"
              className="transition-transform duration-300 text-gray-700 hover:bg-primary/10 group-hover:scale-125 group-hover:text-gray-800"
            >
              <PlusIcon className="w-6 h-6" />
              Add Book
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
