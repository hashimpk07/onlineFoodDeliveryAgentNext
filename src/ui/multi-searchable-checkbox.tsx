"use client";

import { ChevronsUpDown, X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
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

type Option = {
  id: string;
  label: string;
};

interface MultiSearchableSelectProps {
  label?: string;
  values?: string[];
  placeholder?: string;
  loading?: boolean;
  options: Option[];
  onChange: (values: string[]) => void;
}

export function MultiSearchableSelect({
  label,
  values = [],
  placeholder = "Select...",
  loading = false,
  options,
  onChange,
}: MultiSearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOptions = options.filter((o) => values.includes(o.id));

  const VISIBLE_LIMIT = 8;
  const visibleOptions = selectedOptions.slice(0, VISIBLE_LIMIT);
  const hiddenCount = selectedOptions.length - visibleOptions.length;

  // ✅ Select All logic
  const isAllSelected = options.length > 0 && values.length === options.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange(options.map((o) => o.id));
    }
  };

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
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen} modal={true}>
        {/* Trigger */}
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-auto min-h-10 w-full justify-between py-2"
          >
            <div className="flex flex-1 flex-wrap items-center gap-1.5 text-left">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : isAllSelected ? (
                <span className="text-sm font-medium">
                  All selected ({selectedOptions.length})
                </span>
              ) : (
                <>
                  {visibleOptions.map((o) => (
                    <Badge
                      key={o.id}
                      variant="secondary"
                      className="flex items-center gap-1 text-xs"
                    >
                      {o.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={(e) => remove(e, o.id)}
                      />
                    </Badge>
                  ))}
                  {hiddenCount > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs font-medium text-muted-foreground"
                    >
                      +{hiddenCount} more
                    </Badge>
                  )}
                </>
              )}
            </div>

            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        {/* Dropdown */}
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command shouldFilter>
            {/* Search */}
            <CommandInput
              placeholder={`Search ${label?.toLowerCase() || ""}...`}
            />

            <CommandList>
              {/* Empty / Loading */}
              <CommandEmpty>
                {loading ? "Loading..." : "No results found"}
              </CommandEmpty>

              {/* Options */}
              <CommandGroup>
                {/* Select All */}
                {options.length > 0 && (
                  <>
                    <CommandItem
                      value="__all__"
                      onSelect={toggleSelectAll}
                      className="flex items-center gap-2 font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(el) => {
                          if (el) {
                            el.indeterminate =
                              values.length > 0 &&
                              values.length < options.length;
                          }
                        }}
                        readOnly
                      />
                      Select All
                    </CommandItem>

                    <div className="border-t my-1" />
                  </>
                )}

                {/* Items */}
                {options.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.label} ${item.id}`} // ✅ search fix
                    onSelect={() => toggle(item.id)}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={values.includes(item.id)}
                      readOnly
                    />
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
