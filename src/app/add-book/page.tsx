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

interface Book {
  authors: string[];
  title: string;
  publisher: string;
  thumbnail: string;
  isbn: string;
}

const AddBook = () => {
  const [data, setData] = useState<Book[]>();

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value.length < 3) return;
    const { data } = await axios.get(`/api/books?keyword=${value}`);
    setData(
      data.documents.map((d: Book) => ({ ...d, authors: d.authors.join(" ") }))
    );
  };

  const handleClick = (book: Book) => {
    console.log(book);
  };

  return (
    <div className="w-full md:w-3/4 lg:w-1/2">
      <Input
        type="search"
        placeholder="Search books..."
        className="flex-1 bg-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={handleChange}
      />
      <ul className="mt-5">
        {data &&
          data.map((d) => (
            <li
              key={d.isbn}
              className="flex items-center gap-5 p-5 bg-white border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleClick(d)}
            >
              <Image src={d.thumbnail} alt={d.title} width={100} height={100} />
              <div>
                <div>title: {d.title}</div>
                <div>authors: {d.authors}</div>
                <div>publisher: {d.publisher}</div>
                <div>isbn: {d.isbn}</div>
              </div>
              <Button>Add</Button>
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

export default AddBook;
