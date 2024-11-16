"use client";
import { Book } from "@/lib/types";
import Rating from "../star-group";
import Image from "next/image";
import TagGroup from "../tag-group";
import { Button } from "../ui/button";
import FilePenIcon from "../icons/file-pen";

import { useState } from "react";
import BookForm from "./book-form";
import { deleteBook, patchBook } from "@/lib/actions/book";
import BookEditModal from "./book-edit-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BookModal from "./view-book-modal";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import TrashIcon from "../icons/trash";

export default function BookCard({ book }: { book: Book }) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState(book);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: patchBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const onSubmit = async () => {
    try {
      mutation.mutate(formData);
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const onDelete = async () => {
    if (!confirm(`정말 [${book.title}] 책을 삭제하시겠습니까?`)) return;
    try {
      // TODO: 관리자만 삭제할 수 있도록 개선
      mutationDelete.mutate(book.id);
      setOpen(false);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <>
      <div
        className="flex flex-col overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer"
        onClick={() => setSelectedBook(book)}
      >
        <Image
          src="/placeholder.svg" // TODO:
          alt={book.title}
          width={500}
          height={700}
          className="object-cover w-full h-80"
          style={{ aspectRatio: "500/700", objectFit: "cover" }}
        />
        <div className="flex-1 p-4 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{book.title}</h3>
            {/* <Button TODO: 리뷰 팝업에서 태그 수정하도록 변경
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:bg-muted/40 px-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
              >
                <FilePenIcon className="w-4 h-4" />
                <span className="sr-only">Edit</span>
              </Button> */}
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-muted/40 px-1"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <TagGroup tags={book.tags} />
          </div>
          <Rating rating={book.average} />
        </div>
      </div>
      <BookEditModal
        onSave={onSubmit}
        open={open}
        onOpenChange={() => setOpen(false)}
      >
        <BookForm formData={formData} setFormData={setFormData} editMode />
      </BookEditModal>

      {selectedBook && (
        <Dialog
          open={!!selectedBook}
          onOpenChange={() => setSelectedBook(null)}
        >
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="max-w-4xl lg:max-w-7xl bg-white">
            <BookModal
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
