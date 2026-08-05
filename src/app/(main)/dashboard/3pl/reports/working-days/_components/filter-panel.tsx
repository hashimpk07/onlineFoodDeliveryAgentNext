/* eslint-disable */
"use client";
"use no memo";

import { Table } from "@tanstack/react-table";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";

import {
  getCaptainWorkStatusOptions,
  mapToSelectOptions,
} from "@/app/[locale]/(main)/dashboard/3pl/reports/performance/_types/filters";
import { useWorkingDaysParams } from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_hooks/use-params";
import useWorkingDaysFilters from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_hooks/use-working-days-filter";
import { QuickDateSelect } from "@/components/data-table/quick-date-select";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUser } from "@/hooks/use-user";
import { fromApiDate, toApiDate } from "@/lib/date";
import { useExportStore } from "@/providers/export-store-provider";
import { Download } from "lucide-react";

type FilterPanelProps = {
  table?: Table<any>;
};

export function WorkingDaysFilter({ table }: FilterPanelProps) {
  const { filter_captains, filter_areas, filter_regions } =
    useWorkingDaysFilters();
  const openExportModal = useExportStore((s) => s.openModal);

  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    captainId,
    setCaptainId,
    regionId,
    setRegionId,
    areaId,
    setAreaId,

    workStatus,
    setWorkStatus,

    resetFilters,
    isAnyFilterActive,
    setPage,
  } = useWorkingDaysParams();

  const WORK_STATUS_OPTIONS = getCaptainWorkStatusOptions();

  const FILTER_CAPTAIN_OPTIONS = mapToSelectOptions(
    filter_captains,
    (c) => c.firstname,
  );

  const FILTER_AREA_OPTIONS = mapToSelectOptions(filter_areas, (a) => a.name);
  const FILTER_REGION_OPTIONS = mapToSelectOptions(
    filter_regions,
    (r) => r.name,
  );

  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Captain */}
        <DataTableFilterBox
          label="Captain"
          title="captain"
          options={FILTER_CAPTAIN_OPTIONS}
          filterValue={captainId.length ? captainId : null}
          setFilterValue={(value) => {
            setCaptainId(value ?? []);
            setPage(1);
          }}
          multiple
        />

        <DateRangePicker
          label="Date Range"
          from={fromApiDate(fromDate)}
          to={fromApiDate(toDate)}
          onChange={(from, to) => {
            setFromDate(from ? toApiDate(from) : null);
            setToDate(to ? toApiDate(to) : null);
            void setPage(1);
          }}
          disableFutureDates
        />

        {/* Region */}
        <DataTableFilterBox
          label="Region"
          title="region"
          options={FILTER_REGION_OPTIONS}
          filterValue={regionId.length ? regionId : null}
          setFilterValue={(value) => {
            setRegionId(value ?? []);
            setPage(1);
          }}
          multiple
        />

        {/* Area */}
        <DataTableFilterBox
          label="Area"
          title="area"
          options={FILTER_AREA_OPTIONS}
          filterValue={areaId.length ? areaId : null}
          setFilterValue={(value) => {
            setAreaId(value ?? []);
            setPage(1);
          }}
          multiple
        />

        {/* Work Status */}
        <DataTableFilterBox
          label="Work Status"
          title="work status"
          options={WORK_STATUS_OPTIONS}
          filterValue={workStatus ? [workStatus] : null}
          setFilterValue={(value) => {
            setWorkStatus(value?.[0] ?? null);
            setPage(1);
          }}
        />
      </div>

      <QuickDateSelect
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />

      <div className="flex justify-end gap-2">
        {companyId && (
          <Button
            variant="outline"
            onClick={() =>
              openExportModal({
                reportType: "3pl_captain_working_days_report",
                exportUrl: "/public/export",
                method: "POST",
                payload: {
                  from_date: fromDate,
                  to_date: toDate,
                  captain_id: captainId,
                  regions: regionId,
                  areas_id: areaId,
                  status: workStatus,
                  company_id_3pl: companyId,
                  companies: companyId,
                },
              })
            }
            className="flex items-center gap-2"
          >
            <Download className="size-4" />
            Export
          </Button>
        )}

        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
    </div>
  );
}
