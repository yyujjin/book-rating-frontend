"use client";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBook } from "@/lib/actions/book";
import { KakaoResponseBook } from "@/lib/types";
import { getIsbn } from "@/lib/utils";

const AddBook = () => {
  const [data, setData] = useState<KakaoResponseBook[]>();

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postBook,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const onSubmit = async (book: KakaoResponseBook) => {
    if (!confirm("책을 추가하시겠습니까?")) return;
    try {
      const { isbn, title, thumbnail } = book;
      mutation.mutate({
        isbn: getIsbn(isbn),
        title,
        bookCoverUrl: thumbnail,
        tagIds: [],
      });

      setOpen(false);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value.length < 3) return;
    const { data } = await axios.get(`/api/books?keyword=${value}`);
    setData(
      data.documents.map((d: KakaoResponseBook) => ({
        ...d,
        authors: d.authors,
      }))
    );
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2">
      <Input
        type="search"
        placeholder="Search books..."
        className="flex-1 bg-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={handleChange}
      />
      <ul className="mt-5 flex flex-col gap-2">
        {data &&
          data.map((d) => (
            <li
              key={d.isbn}
              className="rounded-lg flex items-center gap-5 p-5 bg-white border-b cursor-pointer hover:bg-gray-100 shadow-sm"
            >
              <Image src={d.thumbnail} alt={d.title} width={100} height={100} />
              <div className="flex-1">
                <Row label="title" value={d.title} />
                <Row label="Authors" value={d.authors.join(", ")} />
                <Row label="publisher" value={d.publisher} />
                <Row label="isbn" value={d.isbn} />
              </div>
              <Button onClick={() => onSubmit(d)}>Add</Button>
            </li>
          ))}
      </ul>
      {/* <Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger asChild></DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>Add New Book</DialogTitle>
  </DialogHeader>
  <BookForm formData={book} setFormData={setBook} />
  <DialogFooter>
    <Button type="submit" onClick={onSubmit}>
      Save
    </Button>
  </DialogFooter>
</DialogContent>
</Dialog> */}
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <span className="capitalize font-bold text-gray-500">{label}</span>:{" "}
      {value}
    </div>
  );
};

export default AddBook;
