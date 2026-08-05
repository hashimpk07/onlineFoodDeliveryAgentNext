/* eslint-disable complexity */
"use client";

import React from "react";

import { Check, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

interface DataTableFilterBoxProps {
  label?: string;
  title: string;
  options: FilterOption[];
  filterValue: string | string[] | null;
  setFilterValue: (value: string[] | null) => void;

  multiple?: boolean;
  error?: boolean;
}

export function DataTableFilterBox({
  label,
  title,
  options,
  filterValue,
  setFilterValue,
  multiple = false,
  error = false,
}: DataTableFilterBoxProps) {
  const [open, setOpen] = React.useState(false);
  const selectedValues = React.useMemo(() => {
    return new Set(filterValue ?? []);
  }, [filterValue]);

  const handleSelect = (value: string) => {
    if (!multiple) {
      setFilterValue(filterValue?.[0] === value ? null : [value]);
      setOpen(false);
      return;
    }

    const current = filterValue ?? [];
    const next = new Set(current);

    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }

    setFilterValue(next.size > 0 ? Array.from(next) : null);
  };

  const clearFilters = () => {
    setFilterValue(null);
    if (!multiple) {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className={cn(
            "text-sm font-semibold text-muted-foreground",
            error && "text-red-500",
          )}
        >
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between border-2 font-normal",
              selectedValues.size === 0 && "text-muted-foreground",
              error && "border-destructive",
            )}
          >
            <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate">
              {selectedValues.size === 0 && (
                <span className="capitalize">{title}</span>
              )}

              {selectedValues.size > 0 &&
                (multiple ? (
                  selectedValues.size > 2 ? (
                    <Badge variant="secondary">
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    Array.from(selectedValues).map((value) => (
                      <Badge
                        key={value}
                        variant="secondary"
                        className="rounded-sm px-1"
                      >
                        {options.find((o) => o.value === value)?.label ?? value}
                      </Badge>
                    ))
                  )
                ) : (
                  <span className="truncate text-foreground">
                    {options.find((o) => o.value === filterValue?.[0])?.label}
                  </span>
                ))}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[220px] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${title}...`} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                {options.map((option) => {
                  const selected = selectedValues.has(option.value);

                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={clearFilters}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
