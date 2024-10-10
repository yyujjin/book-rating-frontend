"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Cross, X } from "lucide-react";

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
  const [tagIds, setTagIds] = React.useState<string[]>([]);

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
          <div className="overflow-hidden text-ellipsis">
            {tagIds.length
              ? tags
                  .filter((tag) => tagIds.includes(tag.value))
                  .map((t) => t.label)
                  .join(", ")
              : "Select tags..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" {...props}>
        <Command>
          <CommandInput
            placeholder="Search tags..."
            onInput={(e) => console.log(e)}
          />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  keywords={[tag.label]}
                  onSelect={(currentValue) => {
                    const newTags = tagIds.includes(currentValue)
                      ? tagIds.filter((v) => v !== currentValue)
                      : tagIds.concat(currentValue);

                    props.changeTag(newTags);
                    setTagIds(newTags);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      tagIds.includes(tag.value) ? "opacity-100" : "opacity-0"
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
