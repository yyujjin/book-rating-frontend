"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ComboboxDemo } from "../ui/combobox";

export default function AddBookModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
          <div className="flex items-center justify-center h-full">
            <Button
              size="lg"
              variant="ghost"
              className="transition-transform duration-300 text-gray-700 hover:bg-primary/10 group-hover:scale-125 group-hover:text-gray-800"
            >
              <PlusIcon className="w-6 h-6" />
              Add Book
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isbn" className="text-right">
              ISBN
            </Label>
            <Input id="isbn" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Tags
            </Label>
            <ComboboxDemo className="col-span-3 justify-between" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <Input id="rating" type="number" className="col-span-3" value={1} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => alert("addBook")}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
