"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  label: string;
  color?: string;
};

interface SearchableSelectProps {
  label: string;
  labelClassName?: string;
  value?: string;
  placeholder: string;
  loading?: boolean;
  options: Option[];
  onChange: (value: string) => void;
}

export function SearchableSelect({
  label,
  labelClassName,
  value,
  placeholder,
  loading,
  options,
  onChange,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selected = options.find((o) => o.id === value);

  return (
    <div className="flex flex-col gap-2">
      <label
        className={cn(
          "text-sm leading-none font-medium text-muted-foreground",
          labelClassName,
        )}
      >
        {label}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-9 w-full justify-between"
          >
            <span className="flex min-w-0 items-center gap-2 truncate">
              {selected?.color && (
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: selected.color }}
                />
              )}
              {selected ? selected.label : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>
              {loading ? "Loading..." : "No results found"}
            </CommandEmpty>

            <CommandGroup className="max-h-60 overflow-y-auto">
              {options.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.label}
                  onSelect={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.color && (
                    <span
                      className="mr-2 size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
