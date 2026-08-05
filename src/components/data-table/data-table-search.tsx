"use client";

import React, { useTransition } from "react";

import { Options } from "nuqs";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DataTableSearchProps {
  label?: string;
  searchKey: string;
  searchQuery: string;
  setSearchQuery: (
    value: string | ((old: string) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  // setPage: (
  //   value: number | ((old: number) => number | null) | null,
  //   options?: Options,
  // ) => Promise<URLSearchParams>;
}

export function DataTableSearch({
  label,
  searchKey,
  searchQuery,
  setSearchQuery,
}: DataTableSearchProps) {
  const [isLoading, startTransition] = useTransition();
  const [value, setValue] = React.useState(searchQuery);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(searchQuery);
  }, [searchQuery]);

  <input
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
    placeholder="Search..."
  />;

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value !== searchQuery) {
        startTransition(() => {
          setSearchQuery(value);
        });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, searchQuery, setSearchQuery]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-muted-foreground">
          {label}
        </label>
      )}

      <Input
        type="search"
        placeholder={`${searchKey}...`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn("w-full", isLoading && "animate-pulse")}
      />
    </div>
  );
}
