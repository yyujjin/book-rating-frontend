import React, { ChangeEvent } from "react";
import { Input } from "./input";
import { useDebounce } from "@frontend-opensource/use-react-hooks";

const DebounceInput = ({
  changeCallback,
}: {
  changeCallback: (text: string) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    debounceSearchText(newValue);
  };

  const debounceSearchText = useDebounce((text: string) => {
    changeCallback(text);
  }, 200);

  return (
    <Input
      type="search"
      placeholder="Search books..."
      className="flex-1 bg-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 "
      onChange={handleChange}
      autoFocus
    />
  );
};

export default DebounceInput;
