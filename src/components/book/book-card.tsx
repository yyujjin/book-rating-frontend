"use client";
import { Book } from "@/lib/types";
import Rating from "../star-group";
import Image from "next/image";
import TagGroup from "../tag-group";
import { Button } from "../ui/button";

import { useState } from "react";
import BookForm from "./book-form";
import { deleteBook, patchBook } from "@/lib/actions/book";
import BookEditModal from "./book-edit-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BookModal from "./detail/view-book-modal";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import TrashIcon from "../icons/trash";

import { AlertDialog } from "@/components/ui/alert-dialog";
import { validateSrc } from "@/lib/utils";
import { toast } from "@/lib/hooks/use-toast";

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
    try {
      // TODO: 관리자만 삭제할 수 있도록 개선
      mutationDelete.mutate(book.id, {
        onSuccess: () => {
          toast({ title: "정상적으로 삭제되었습니다." });
        },
        onError: (err: Error) => {
          toast({
            title: err.message,
            variant: "destructive",
          });
        },
      });
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
          src={validateSrc(book.thumbnail)}
          alt={book.title}
          width={150}
          height={150}
          className="p-1 max-h-52 object-contain w-full bg-gradient-to-b from-gray-50 to-gray-100"
        />
        <div className="flex-1 p-4 pr-2 bg-white space-y-1">
          <h3 className="text-sm font-bold truncate">{book.title}</h3>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <TagGroup tags={book.tags} />
          </div>
          <div className="flex justify-between items-center">
            <Rating rating={book.averageRating} />
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:bg-muted/40 px-2"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </div>
      {/* <BookEditModal
        onSave={onSubmit}
        open={open}
        onOpenChange={() => setOpen(false)}
      >
        <BookForm formData={formData} setFormData={setFormData} editMode />
      </BookEditModal> */}
      <AlertDialog
        open={open}
        handleOpen={(state) => setOpen(state)}
        handleAction={onDelete}
        title="정말 책을 삭제하시겠습니까?"
        description={
          <>
            <span className="font-bold italic px-1">{book.title}</span>이(가)
            삭제됩니다.
          </>
        }
      />
      {/* 책 상세보기 팝업 */}
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
