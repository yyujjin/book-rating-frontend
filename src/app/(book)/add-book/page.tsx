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

interface Book {
  authors: string[];
  title: string;
  publisher: string;
  thumbnail: string;
  isbn: string;
  contents: string;
}

const AddBook = () => {
  const [data, setData] = useState<Book[]>([
    {
      authors: ["기시미 이치로", "고가 후미타케"],
      contents:
        "51주 연속 역대 최장기간 베스트셀러 1위를 기록하며 대한민국 베스트셀러 역사를 새롭게 쓴 《미움받을 용기》가 보다 현실적인 문제에 대한 답을 안고 돌아왔다. 《미움받을 용기 2》는 아들러 심리학을 대중적으로 명쾌히 정리한 ‘용기 2부작’의 완결편으로, ‘행복으로 가는 길’을 제시한 전작에 이어 ‘행복으로 가는 구체적인 방법’에 대해 다룬다.  자유롭고 행복한 삶에 대한 가르침을 받고 부푼 기대를 안고 변화를 결심했지만, 수년 후 ‘중대한 고민’이",
      isbn: "1168340780 9791168340787",
      publisher: "인플루엔셜",
      thumbnail:
        "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6252918%3Ftimestamp%3D20240518160512",
      title: "미움받을 용기 2(200만 부 기념 스페셜 에디션)",
    },
  ]);

  const [open, setOpen] = useState(false);

  const onSubmit = async (book: Book) => {
    if (!confirm("책을 추가하시겠습니까?")) return;
    try {
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

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value.length < 3) return;
    const { data } = await axios.get(`/api/books?keyword=${value}`);
    setData(data.documents.map((d: Book) => ({ ...d, authors: d.authors })));
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
