import { useState } from "react";
import { Book, KakaoResponseBook } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBook } from "../actions/book";
import axios from "axios";

interface Props {
  onSuccess: (book: Book) => void;
  onError: (err: Error) => void;
}
export const useAddBook = (mutateCallback: Props) => {
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
      mutation.mutate(selectedBook, mutateCallback);

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
