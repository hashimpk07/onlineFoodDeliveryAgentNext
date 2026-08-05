/* eslint-disable complexity */
"use client";

import * as React from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface BranchCheckboxDropdownProps {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: Array<{ label: string; value: string }>;
  value: string | null;
  onChange: (value: string | null) => void;
  error?: string;
  autoSelectFirst?: boolean;
  autoClose?: boolean;
  disabled?: boolean;
}

interface OptionListProps {
  filteredOptions: Array<{ label: string; value: string }>;
  value: string | null;
  onToggle: (val: string) => void;
}

function OptionList({ filteredOptions, value, onToggle }: OptionListProps) {
  if (filteredOptions.length === 0) {
    return <p className="px-2 text-sm text-muted-foreground">No results</p>;
  }

  return (
    <>
      {filteredOptions.map((option) => (
        <label
          key={option.value}
          className="
            flex
            items-center
            gap-2
            px-2
            py-1
            rounded-md
            cursor-pointer
            hover:bg-muted
          "
        >
          <Checkbox
            checked={option.value === value}
            onCheckedChange={() => onToggle(option.value)}
          />
          <span className="text-sm truncate">{option.label}</span>
        </label>
      ))}
    </>
  );
}

export function BranchCheckboxDropdown({
  label,
  placeholder = "Select branch",
  searchPlaceholder = "Search branches...",
  options,
  value,
  onChange,
  error,
  autoSelectFirst = false,
  autoClose = false,
  disabled = false,
}: BranchCheckboxDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const selectedOption = options.find((o) => o.value === value);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (val: string) => {
    onChange(val === value ? null : val);
    if (autoClose) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (autoSelectFirst && !value && options.length > 0) {
      onChange(options[0].value);
    }
  }, [autoSelectFirst, value, options, onChange]);

  return (
    <div className="space-y-2">
      {label && (
        <label className="flex items-center text-sm leading-none font-semibold text-foreground">
          {label}
        </label>
      )}
      <Popover
        open={open && !disabled}
        onOpenChange={(next) => setOpen(disabled ? false : next)}
        modal={false}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between border-2 border-input bg-background font-medium shadow-sm hover:border-primary/50 hover:bg-background",
              !value && "font-normal text-muted-foreground",
              error && "border-destructive focus-visible:ring-destructive",
            )}
          >
            <span className="truncate">
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-[260px] p-2">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 h-9"
          />
          <div
            className="
              max-h-56
              overflow-y-auto
              overflow-x-hidden
              overscroll-contain
              space-y-1
            "
            onWheelCapture={(e) => e.stopPropagation()}
          >
            <OptionList
              filteredOptions={filteredOptions}
              value={value}
              onToggle={toggle}
            />
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-destructive">{error}</p>}{" "}
    </div>
  );
}
