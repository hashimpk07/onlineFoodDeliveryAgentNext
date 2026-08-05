/* eslint-disable */
"use client";

import { format } from "date-fns";
import { Search } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import ErrorDisplay from "@/components/ui/error-display";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useTickets } from "../_hooks/use-tickets";
import { useTicketsParams } from "../_hooks/use-tickets-params";

import { ticketColumns } from "./tickets-columns";

/* eslint-disable complexity, @typescript-eslint/no-explicit-any */

export default function TicketsView() {
  const [params, setParams] = useTicketsParams();
  const { page, per_page, from_date, to_date } = params;

  const { data, isError, error, isFetching } = useTickets({
    page,
    per_page,
    from_date,
    to_date,
  });

  const resData = data as any;

  // Robust array extraction
  const findArray = (obj: any): any[] | null => {
    if (!obj || typeof obj !== "object") return null;
    if (Array.isArray(obj)) return obj;
    if (Array.isArray(obj.tickets)) return obj.tickets;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.items)) return obj.items;

    for (const [key, value] of Object.entries(obj)) {
      if (["pagination", "links", "meta"].includes(key)) continue;
      if (Array.isArray(value)) return value;
      if (typeof value === "object" && value !== null) {
        const nested = findArray(value);
        if (nested) return nested;
      }
    }
    return null;
  };

  const tickets = findArray(resData) ?? [];

  // Debug log to inspect API response payload keys in the browser console
  if (typeof window !== "undefined" && tickets.length > 0) {
    console.log("Debug Ticket Row payload:", tickets[0]);
  }

  const pagination = resData?.pagination ?? resData?.data?.pagination;

  const table = useDataTableInstance({
    data: tickets,
    columns: ticketColumns,
    pageCount: pagination?.last_page ?? 1,
    manualPagination: true,
    getRowId: (row, index) => `${String(row.id ?? index)}`,
  });

  if (isError || resData?.status === "error") {
    return (
      <ErrorDisplay
        title="Failed to load tickets"
        message={resData?.message ?? error?.message ?? "Unknown error"}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      {/* Date Filter Section */}
      <div className="flex flex-wrap items-end gap-4 p-4 rounded-lg border bg-card shadow-sm">
        <div className="w-[320px]">
          <DateRangePicker
            label="Date Range"
            from={from_date}
            to={to_date}
            onChange={(from, to) =>
              setParams({
                from_date: from ? format(from, "yyyy-MM-dd") : "",
                to_date: to ? format(to, "yyyy-MM-dd") : "",
              })
            }
          />
        </div>
        <Button
          variant="secondary"
          disabled={!from_date || !to_date || isFetching}
          className="gap-2"
        >
          <Search className="h-4 w-4" />
          {isFetching ? "Loading..." : "Filter Results"}
        </Button>
      </div>

      {!from_date || !to_date ? (
        <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-xl bg-muted/30 text-muted-foreground">
          <Search className="h-10 w-10 mb-4 opacity-20" />
          <h3 className="text-lg font-medium">No Dates Selected</h3>
          <p className="text-sm">
            Please select a From and To date to view the ticket report.
          </p>
        </div>
      ) : (
        <div className="flex-1 rounded-xl border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
          {isFetching && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
              <span className="text-muted-foreground animate-pulse font-medium">
                Fetching Tickets...
              </span>
            </div>
          )}

          <DataTable table={table} columns={ticketColumns} />

          <DataTablePagination
            table={table}
            totalCount={pagination?.total ?? tickets.length}
            page={page}
            pageSize={per_page}
            setPage={(p) => setParams({ page: p })}
            setPageSize={(ps) => setParams({ per_page: ps })}
          />
        </div>
      )}
    </div>
  );
}
