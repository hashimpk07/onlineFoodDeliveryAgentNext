"use client";

import * as React from "react";

import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
};

interface MultiSearchableSelectProps {
  label: string;
  values?: string[];
  placeholder: string;
  loading?: boolean;
  options: Option[];
  onChange: (values: string[]) => void;
}

export function MultiSearchableSelect({
  label,
  values = [],
  placeholder,
  loading,
  options,
  onChange,
}: MultiSearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOptions = options.filter((o) => values.includes(o.id));

  const toggle = (id: string) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  const remove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onChange(values.filter((v) => v !== id));
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-muted-foreground">
        {label}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-auto min-h-10 w-full justify-between gap-2 px-3 py-1.5"
          >
            <div className="flex flex-wrap gap-1 flex-1 text-left">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground font-normal">
                  {placeholder}
                </span>
              ) : (
                selectedOptions.map((o) => (
                  <Badge
                    key={o.id}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1 text-xs"
                  >
                    {o.label}
                    <span
                      role="button"
                      tabIndex={0}
                      aria-label={`Remove ${o.label}`}
                      onClick={(e) => remove(e, o.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onChange(values.filter((v) => v !== o.id));
                        }
                      }}
                      className="cursor-pointer rounded-full hover:bg-destructive/20 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
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
              {options.map((item) => {
                const isSelected = values.includes(item.id);
                return (
                  <CommandItem
                    key={item.id}
                    value={item.label}
                    onSelect={() => toggle(item.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
