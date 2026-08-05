"use client";
"use no memo";
import { useClientDashboardParams } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_hooks/use-dashboard-params";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { QuickDateSelect } from "@/components/data-table/quick-date-select";
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function ClientDashboardFilterPanel() {
  const {
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    resetFilters,
    isAnyFilterActive,
  } = useClientDashboardParams();

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <DateRangePicker
          label="Date Range"
          from={fromDate}
          to={toDate}
          onChange={(from, to) => {
            setFromDate(from ? from.toISOString().split("T")[0] : null);
            setToDate(to ? to.toISOString().split("T")[0] : null);
          }}
          disableFutureDates
        />

        <div className="ml-auto flex items-end">
          <DataTableResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </div>

      <QuickDateSelect
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
    </div>
  );
}
