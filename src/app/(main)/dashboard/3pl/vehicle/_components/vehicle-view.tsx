/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complexity */
"use client";

import { VehicleCard } from "@/app/[locale]/(main)/dashboard/3pl/vehicle/_components/vehicle-cards";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useVehicleLists } from "../_hooks/use-vehicle-list";

import { columns } from "./vehicle-column";
import { VehicleFilters } from "./vehicle-filters";
import { VehicleTable } from "./vehicle-table";

export default function VehicleView() {
  const {
    vehicle,
    pagination,
    loading,
    counts,
    page,
    pageSize,
    setPage,
    setPageSize,
  } = useVehicleLists();

  const table = useDataTableInstance({
    data: vehicle ?? [],
    columns,
    pageCount: pagination?.total ?? 1,
    manualPagination: true,
    pagination: {
      pageIndex: Number(page) - 1,
      pageSize: Number(pageSize),
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* InfoCards here */}
        </div>
        <VehicleFilters loading={loading} />
        <DataTableSkeleton
          columnCount={columns.length}
          rowCount={10}
          searchableColumnCount={1}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <VehicleCard
          imageSrc="/vehicles/total.png"
          count={counts?.all_vehicle ?? 0}
          title="Total Vehicles"
        />

        <VehicleCard
          imageSrc="/vehicles/assigned.png"
          count={counts?.no_of_vehicle_assigned ?? 0}
          title="Assigned Vehicles"
        />

        <VehicleCard
          imageSrc="/vehicles/free.png"
          count={counts?.no_of_vehicle_free ?? 0}
          title="Free Vehicles"
        />
      </div>

      <div className="flex flex-col gap-4 w-full min-w-0">
        <VehicleFilters loading={false} table={table} />
        <VehicleTable
          table={table}
          isLoading={loading}
          total={pagination?.total ?? 0}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
