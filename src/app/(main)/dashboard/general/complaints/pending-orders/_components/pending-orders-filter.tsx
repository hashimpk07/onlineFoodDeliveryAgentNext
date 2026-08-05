/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { fromDDMMYYYY, toDDMMYYYY } from "@/lib/date";

import { useCaptains } from "../_hooks/use-captains";
import { usePendingOrdersParams } from "../_hooks/use-pending-orders-params";
import { useShops } from "../_hooks/use-shops";
import { useZones } from "../_hooks/use-zones";

export function PendingOrdersFilter() {
  const {
    zone,
    setZone,
    fromDate,
    toDate,
    captain,
    setCaptain,
    shop_name,
    setShopName,
    setFromDate,
    setToDate,
    q,
    setQ,
    resetFilters,
    isAnyFilterActive,
  } = usePendingOrdersParams();

  const { data: zones } = useZones();
  const { data: captains } = useCaptains();
  const { data: shops } = useShops();

  const zoneOptions =
    zones?.map((zone, index) => ({
      value: `${zone.id}-${index}`,
      label: zone.name,
    })) ?? [];

  const captainOptions =
    captains.map((item) => ({
      label: item.name,
      value: String(item.id),
    })) ?? [];

  const shopOptions =
    shops.map((shop) => ({
      label: shop.name,
      value: shop.name,
    })) ?? [];

  return (
    <div className="space-y-6 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DateRangePicker
          label="Date Range"
          from={fromDDMMYYYY(fromDate)}
          to={fromDDMMYYYY(toDate)}
          onChange={(from, to) => {
            setFromDate(from ? toDDMMYYYY(from) : "");
            setToDate(to ? toDDMMYYYY(to) : "");
          }}
          yearRange={50}
        />
        <DataTableFilterBox
          label="Zone"
          title="Zone"
          options={zoneOptions}
          filterValue={zone ? [zone] : null}
          setFilterValue={(value) => {
            setZone(value?.[0] ?? null);
          }}
        />
        <DataTableFilterBox
          label="Captain"
          title="Captain"
          options={captainOptions}
          filterValue={captain ? [captain] : null}
          setFilterValue={(value) => {
            setCaptain(value?.[0] ?? null);
          }}
        />
        <DataTableFilterBox
          label="Shop"
          title="Shop"
          options={shopOptions}
          filterValue={shop_name ? [shop_name] : null}
          setFilterValue={(value) => {
            setShopName(value?.[0] ?? null);
          }}
        />
        <DataTableSearch
          label="Client ID"
          searchKey="Search Client ID"
          searchQuery={q}
          setSearchQuery={setQ}
        />
      </div>
      <div className="flex justify-end">
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
