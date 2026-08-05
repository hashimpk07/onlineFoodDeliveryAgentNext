"use client";
"use no memo";

import { useCaptainDetailUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details-params";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { fromApiDate, toApiDate } from "@/lib/date";

export function CaptainViewFilterPanel() {
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    resetFilters,
    isAnyFilterActive,
  } = useCaptainDetailUrlParams();

  return (
    <div className="rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DateRangePicker
          label="Date Range"
          from={fromApiDate(fromDate)}
          to={fromApiDate(toDate)}
          onChange={(from, to) => {
            setFromDate(from ? toApiDate(from) : null);
            setToDate(to ? toApiDate(to) : null);
          }}
        />
      </div>

      <div className="flex justify-end gap-2">
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
    </div>
  );
}
