"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/axios";
import { Tag } from "@/lib/types";

interface TagOption {
  value: string;
  label: string;
}

export function TagCombobox({ ...props }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const fetchTags = async (): Promise<TagOption[]> => {
    const { data } = await axiosClient.get<Tag[]>("/tags");
    return data.map((d) => ({ value: d.id + "", label: d.name }));
  };

  const { data: tags } = useQuery({
    queryKey: ["getTags"],
    queryFn: fetchTags,
  });

  if (!tags || !tags.length) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          {...props}
        >
          {value
            ? tags.find((tag) => tag.value === value)?.label
            : "Select tags..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" {...props}>
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  onSelect={(currentValue) => {
                    props.changeTag(currentValue);
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === tag.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tag.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
