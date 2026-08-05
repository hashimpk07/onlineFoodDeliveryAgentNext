"use client";
import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { QuickDateSelect } from "@/components/data-table/quick-date-select";
import { BusinessDateRangeInfo } from "@/components/ui/business-date-range-info";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { MultiSearchableSelect } from "@/components/ui/multi-searchable-select";
import { useExportStore } from "@/providers/export-store-provider";

import { useOrderReportsUrlParams } from "../_hooks/use-order-report-params";
import { Captain, Order, Status } from "../_types/order-report-type";

interface OrderReportFiltersProps {
  captains: Captain[];
  statuses: Status[];
  loading: boolean;
  table?: Table<Order>;
}

// ---------- UI helpers ----------
const SearchFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor="client-order-search"
      className="text-sm font-medium text-muted-foreground"
    >
      Search
    </label>
    <Input
      id="client-order-search"
      placeholder="Client Order ID"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const DateFilters = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: {
  fromDate: string;
  toDate: string;
  setFromDate: (d: string) => void;
  setToDate: (d: string) => void;
}) => (
  <DateRangePicker
    label="Date Range"
    from={fromDate ? new Date(`${fromDate}T00:00:00`) : null}
    to={toDate ? new Date(`${toDate}T00:00:00`) : null}
    onChange={(from, to) => {
      setFromDate(from ? from.toLocaleDateString("en-CA") : "");
      setToDate(to ? to.toLocaleDateString("en-CA") : "");
    }}
  />
);
// ---------------------------------

export function OrderReportFilters({
  captains,
  statuses,
  loading,
  table,
}: OrderReportFiltersProps) {
  const {
    clientOrder,
    setClientOrder,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    captain,
    setCaptain,
    status,
    setStatus,
    resetFilters,
    isAnyFilterActive,
  } = useOrderReportsUrlParams();

  const openExportModal = useExportStore((s) => s.openModal);

  return (
    <div className="rounded-xl bg-card p-4 sm:p-6 shadow-sm border space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3 items-end">
        <SearchFilter value={clientOrder} onChange={setClientOrder} />
        <DataTableFilterBox
          label="Order Status"
          title="Order Status"
          options={statuses.map((s) => ({
            value: String(s.id),
            label: s.name,
          }))}
          filterValue={status}
          setFilterValue={(v) => setStatus(v ?? "")}
        />
        <MultiSearchableSelect
          label="Captain"
          values={captain}
          placeholder="All captains"
          loading={loading}
          options={captains.map((c) => ({
            id: String(c.captain_id),
            label: c.captain_name,
          }))}
          onChange={(v) => setCaptain(v)}
        />
        <DateFilters
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </div>

      {/* Quick date shortcuts */}
      <QuickDateSelect
        fromDate={fromDate || null}
        toDate={toDate || null}
        setFromDate={(d) => setFromDate(d ?? "")}
        setToDate={(d) => setToDate(d ?? "")}
      />

      {/* Action bar */}
      <div className="flex justify-end gap-2">
        <DataTableResetFilter
          onReset={resetFilters}
          isFilterActive={isAnyFilterActive}
        />
        <Button
          variant="outline"
          disabled={!table}
          onClick={() => {
            const selected_fields =
              table
                ?.getAllColumns()
                .filter(
                  (col) =>
                    col.getIsVisible() && typeof col.accessorFn !== "undefined",
                )
                .map((col) => col.id) ?? [];

            openExportModal({
              reportType: "client_high_level_report",
              exportUrl: "/public/export",
              method: "POST",
              payload: {
                from_date: fromDate,
                to_date: toDate,
                "captain[]": captain,
                client_order_id: clientOrder,
                status,
                selected_fields,
              },
            });
          }}
          className="flex items-center gap-2"
        >
          <Download className="size-4" />
          Export
        </Button>
      </div>

      {/* Date range display */}
      <div className="w-full">
        <BusinessDateRangeInfo fromDate={fromDate} toDate={toDate} />
      </div>
    </div>
  );
}
