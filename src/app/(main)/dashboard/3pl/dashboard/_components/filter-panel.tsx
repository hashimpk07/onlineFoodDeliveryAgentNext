"use client";
"use no memo";
import { useDashboardParams } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-dashboard-params";
import useDashboardFilter from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_hooks/use-regions";
import { mapToSelectOptions } from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_types/filters";
import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { QuickDateSelect } from "@/components/data-table/quick-date-select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { fromApiDate, toApiDate } from "@/lib/date";

export function DashboardFilterPanel() {
  const { regions } = useDashboardFilter();
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    regionId,
    setRegionId,
    resetFilters,
    isAnyFilterActive,
  } = useDashboardParams();

  const FILTER_REGION_OPTIONS = mapToSelectOptions(regions, (r) => r.name);

  return (
    <div className="rounded-xl bg-card border p-4 sm:p-6 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Region */}
        <DataTableFilterBox
          label="Region"
          title="Region"
          options={FILTER_REGION_OPTIONS}
          filterValue={regionId ? [regionId] : null}
          setFilterValue={(value) => {
            setRegionId(value?.[0] ?? null);
          }}
        />

        <DateRangePicker
          label="Date Range"
          from={fromApiDate(fromDate)}
          to={fromApiDate(toDate)}
          onChange={(from, to) => {
            setFromDate(from ? toApiDate(from) : null);
            setToDate(to ? toApiDate(to) : null);
          }}
          disableFutureDates
        />
      </div>

      {/* Quick Date Presets */}
      <QuickDateSelect
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />

      <div className="flex justify-end gap-2">
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
    </div>
  );
}
