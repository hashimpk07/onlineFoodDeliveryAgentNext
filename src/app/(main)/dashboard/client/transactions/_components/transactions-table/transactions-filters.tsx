"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

interface TransactionReportFiltersProps {
  loading?: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function TransactionReportFilters({
  loading = false,
  searchQuery,
  setSearchQuery,
}: TransactionReportFiltersProps) {
  const [value, setValue] = useState(searchQuery);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div className="space-y-6 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Input
          placeholder=" Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
