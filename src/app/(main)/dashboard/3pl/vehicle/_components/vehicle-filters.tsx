/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";

import { Table } from "@tanstack/react-table";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { Button } from "@/components/ui/button";

import { STATUS_OPTIONS } from "../_constant/vehicle";
import { useAreaList } from "../_hooks/use-area-list";
import { useOwnersList } from "../_hooks/use-owner-list";
import { useVehicleParams } from "../_hooks/use-vehicle-params";
import { useVehicleTypeList } from "../_hooks/use-vehicle-type-list";

interface VehicleFiltersProps {
  loading?: boolean;
  table?: Table<any>;
}

export function VehicleFilters({
  loading = false,
  table,
}: VehicleFiltersProps) {
  const {
    vehicleNo,
    setVehicleNo,
    captain,
    setCaptain,
    status,
    setStatus,
    type,
    setType,
    regionId,
    setRegionId,
    ownerId,
    setOwnerId,
    resetFilters,
    isAnyFilterActive,
    setPage,
  } = useVehicleParams();

  const { data: areaOptions = [], isLoading: isAreaLoading } = useAreaList();
  const { data: ownerOptions = [], isLoading: isOwnerLoading } =
    useOwnersList();
  const { data: typeOptions = [], isLoading: isTypeLoading } =
    useVehicleTypeList();
  return (
    <div className="rounded-xl bg-card p-1 sm:p-6 shadow-sm border space-y-6">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5 items-end">
        {/* Search */}
        <DataTableSearch
          label="Captain"
          searchKey="Search Captain"
          searchQuery={captain}
          setSearchQuery={setCaptain}
        />

        <DataTableSearch
          label="Vehicle Number"
          searchKey="Vehicle Number"
          searchQuery={vehicleNo}
          setSearchQuery={setVehicleNo}
        />
        <DataTableFilterBox
          label="Status"
          title="Status"
          options={STATUS_OPTIONS}
          filterValue={status ? [status] : []}
          setFilterValue={(value) => {
            setStatus(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Vehicle Type"
          title="Vehicle Type"
          options={typeOptions}
          filterValue={type ? [type] : []}
          setFilterValue={(value) => {
            setType(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Owner"
          title="Owner"
          options={ownerOptions}
          filterValue={ownerId ? [ownerId] : []}
          setFilterValue={(value) => {
            setOwnerId(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Region"
          title="Region"
          options={areaOptions}
          filterValue={regionId ? [regionId] : []}
          setFilterValue={(value) => {
            setRegionId(value?.[0] ?? "");
            setPage(1);
          }}
        />
      </div>
      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-1">
        {/* View / Reset  and  Export */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-white text-black dark:bg-muted dark:text-white"
          >
            <Link href="/dashboard/3pl/vehicle/create">Create Vehicle</Link>
          </Button>
          <DataTableResetFilter
            onReset={resetFilters}
            isFilterActive={isAnyFilterActive}
          />
        </div>
      </div>
    </div>
  );
}
