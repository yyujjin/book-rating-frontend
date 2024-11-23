import { useState } from "react";
import { KakaoResponseBook } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBook } from "../actions/book";
import { getIsbn } from "../utils";
import { toast } from "./use-toast";
import axios from "axios";

export const useAddBook = () => {
  const [data, setData] = useState<KakaoResponseBook[]>();
  const [selectedBook, setSelectedBook] = useState<KakaoResponseBook | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postBook,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const onSubmit = async () => {
    if (!selectedBook) return;
    try {
      const {
        isbn,
        title,
        thumbnail,
        contents,
        datetime,
        url,
        authors,
        publisher,
      } = selectedBook;
      mutation.mutate(
        {
          isbn: getIsbn(isbn),
          title,
          thumbnail,
          tags: [],
          contents,
          datetime,
          url,
          authors: authors.join(", "),
          publisher,
        },
        {
          onSuccess: () => {
            toast({
              description: "책이 추가되었습니다.",
            });
          },
          onError: () => {
            toast({
              description: "이미 등록된 책입니다.",
              variant: "destructive",
            });
          },
        }
      );

      setOpen(false);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleChange = async (keyword: string) => {
    if (!keyword) {
      setData([]);
      return;
    }

    const { data } = await axios.get(`/api/kakao/books?keyword=${keyword}`);
    setData(
      data.documents.map((d: KakaoResponseBook) => ({
        ...d,
        authors: d.authors,
      }))
    );
  };

  return { onSubmit, handleChange, data, selectedBook, setSelectedBook };
};
