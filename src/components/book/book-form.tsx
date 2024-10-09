import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddBook, Book } from "@/lib/types";
import { ChangeEvent } from "react";
import { TagCombobox } from "../ui/combobox";

export default function BookForm<T extends Book | AddBook>({
  formData,
  setFormData,
  editMode = false,
}: {
  formData: T;
  setFormData: (data: T) => void;
  editMode?: boolean;
}) {
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const changeTag = (id: string) => {
    setFormData({
      ...formData,
      tagIds: [Number(id)],
    });
  };
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          value={formData.title}
          className="col-span-3"
          onChange={changeValue}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="isbn" className="text-right">
          ISBN
        </Label>
        <Input
          id="isbn"
          value={formData.isbn}
          className="col-span-3"
          onChange={changeValue}
          disabled={editMode}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Tags
        </Label>
        <TagCombobox
          className="col-span-3 justify-between"
          changeTag={changeTag}
        />
      </div>
    </div>
  );
}
