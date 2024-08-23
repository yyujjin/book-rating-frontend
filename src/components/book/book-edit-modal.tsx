import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { Fn } from "@/lib/types";

export default function BookEditModal({
  open,
  onOpenChange,
  onSave,
  onDelete,
  children,
}: {
  open: boolean;
  onOpenChange: Fn;
  onSave: Fn;
  onDelete: Fn;
  children: ReactNode;
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button onClick={onDelete} variant={"destructive"}>
            Delete
          </Button>
          <Button type="submit" onClick={onSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
