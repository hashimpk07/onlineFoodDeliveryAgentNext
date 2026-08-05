"use client";
import { Table } from "@tanstack/react-table";

import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";

import { useEmployeeParams } from "../_hooks/use-employee-params";

interface EmployeeFiltersProps {
  loading?: boolean;
  table?: Table<any>;
}

export function EmployeeFilters({
  loading = false,
  table,
}: EmployeeFiltersProps) {
  const { search, setSearch, resetFilters, isAnyFilterActive } =
    useEmployeeParams();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-card shadow-sm border">
      <div className="w-full sm:w-80">
        <DataTableSearch
          label="Search"
          searchKey="Enter name or email"
          searchQuery={search}
          setSearchQuery={setSearch}
        />
      </div>
      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <DataTableResetFilter
            onReset={resetFilters}
            isFilterActive={isAnyFilterActive}
          />
        </div>
      </div>
    </div>
  );
}
