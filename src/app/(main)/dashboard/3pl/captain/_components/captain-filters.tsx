/* eslint-disable */
"use client";
"use no memo";

import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";

import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { useExportStore } from "@/providers/export-store-provider";

import useCaptainFilters from "@/app/[locale]/(main)/dashboard/3pl/captain/_hooks/use-captain-filters";
import { useCaptainUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/captain/_hooks/use-captain-params";
import {
  getCaptainShiftStatusOptions,
  getCaptainWorkStatusOptions,
  mapToSelectOptions,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/filters";
import { useRouter } from "next/navigation";

type CaptainFilterPanelProps = {
  table?: Table<any>;
};

export function CaptainFilterPanel({ table }: CaptainFilterPanelProps) {
  const openExportModal = useExportStore((s) => s.openModal);
  const router = useRouter();

  const {
    filter_countries,
    filter_captains,
    filter_vehicle_types,
    filter_areas,
    filter_regions,
  } = useCaptainFilters();

  const {
    name,
    setName,
    mobile,
    setMobile,
    vehicleNo,
    setVehicleNo,

    captainId,
    setCaptainId,
    regionId,
    setRegionId,
    areaId,
    setAreaId,
    vehicleTypeId,
    setVehicleTypeId,
    shiftStatusId,
    setShiftStatusId,
    nationalityId,
    setNationalityId,
    workStatus,
    setWorkStatus,

    resetFilters,
    isAnyFilterActive,
    setPage,
  } = useCaptainUrlParams();

  const handleCreate = () => {
    router.push(`/dashboard/3pl/captain/create`);
  };

  const WORK_STATUS_OPTIONS = getCaptainWorkStatusOptions();
  const SHIFT_STATUS_OPTIONS = getCaptainShiftStatusOptions();
  const FILTER_COUNTRY_OPTIONS = mapToSelectOptions(
    filter_countries,
    (c) => c.name,
  );
  const FILTER_CAPTAIN_OPTIONS = mapToSelectOptions(
    filter_captains,
    (c) => c.firstname,
  );
  const FILTER_VEHICLE_TYPE_OPTIONS = mapToSelectOptions(
    filter_vehicle_types,
    (v) => v.name,
  );
  const FILTER_AREA_OPTIONS = mapToSelectOptions(filter_areas, (a) => a.name);
  const FILTER_REGION_OPTIONS = mapToSelectOptions(
    filter_regions,
    (r) => r.name,
  );

  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const canCreateCaptain = true; // TODO check permission here

  return (
    <div className="rounded-xl bg-card p-1 sm:p-6 shadow-sm border space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Captain */}
        <DataTableFilterBox
          label="Captain"
          title="Captain"
          options={FILTER_CAPTAIN_OPTIONS}
          filterValue={captainId ? [captainId] : null}
          setFilterValue={(value) => {
            setCaptainId(value?.[0] ?? null);
            setPage(1);
          }}
        />

        {/* Name */}
        <DataTableSearch
          label="Name"
          searchKey="Captain Name"
          searchQuery={name}
          setSearchQuery={async (v, opts) => {
            const result = await setName(v, opts);
            await setPage(1);
            return result;
          }}
        />

        {/* Mobile */}
        <DataTableSearch
          label="Mobile Number"
          searchKey="Captain Mobile"
          searchQuery={mobile}
          setSearchQuery={async (v, opts) => {
            const result = await setMobile(v, opts);
            await setPage(1);
            return result;
          }}
        />

        {/* Region */}
        <DataTableFilterBox
          label="Region"
          title="Region"
          options={FILTER_REGION_OPTIONS}
          filterValue={regionId ? [regionId] : null}
          setFilterValue={(value) => {
            setRegionId(value?.[0] ?? null);
            setPage(1);
          }}
        />

        {/* Area */}
        <DataTableFilterBox
          label="Area"
          title="Area"
          options={FILTER_AREA_OPTIONS}
          filterValue={areaId ? [areaId] : null}
          setFilterValue={(value) => {
            setAreaId(value?.[0] ?? null);
            setPage(1);
          }}
        />

        {/* Vehicle Type */}
        <DataTableFilterBox
          label="Vehicle Type"
          title="vehicle type"
          options={FILTER_VEHICLE_TYPE_OPTIONS}
          filterValue={vehicleTypeId ? [vehicleTypeId] : null}
          setFilterValue={(value) => {
            setVehicleTypeId(value?.[0] ?? null);
            setPage(1);
          }}
        />

        {/* Vehicle Number */}
        <DataTableSearch
          label="Vehicle No"
          searchKey="Vehicle No"
          searchQuery={vehicleNo}
          setSearchQuery={async (v, opts) => {
            const result = await setVehicleNo(v, opts);
            await setPage(1);
            return result;
          }}
        />

        {/* Work Status */}
        {/* <DataTableFilterBox
          label="Work Status"
          title="work status"
          options={WORK_STATUS_OPTIONS}
          filterValue={workStatus ? [workStatus] : null}
          setFilterValue={(value) => {
            setWorkStatus(value?.[0] ?? null);
            setPage(1);
          }}
        /> */}

        {/* Shift Status */}
        <DataTableFilterBox
          label="Shift Status"
          title="shift status"
          options={SHIFT_STATUS_OPTIONS}
          filterValue={shiftStatusId ? [shiftStatusId] : null}
          setFilterValue={(value) => {
            setShiftStatusId(value?.[0] ?? null);
            setPage(1);
          }}
        />

        {/* Nationality */}
        <DataTableFilterBox
          label="Nationality"
          title="nationality"
          options={FILTER_COUNTRY_OPTIONS}
          filterValue={nationalityId ? [nationalityId] : null}
          setFilterValue={(value) => {
            setNationalityId(value?.[0] ?? null);
            setPage(1);
          }}
        />
      </div>

      <div className="flex justify-end gap-2">
        {/* {canCreateCaptain && (
          <Button variant="outline" onClick={handleCreate}>
            CREATE CAPTAIN
          </Button>
        )} */}

        {companyId && (
          <Button
            variant="outline"
            onClick={() =>
              openExportModal({
                reportType: "3pl_captain_report",
                exportUrl: "/public/export",
                method: "POST",
                payload: {
                  name: name || undefined,
                  mobile_no: mobile || undefined,
                  vehicle_number: vehicleNo || undefined,
                  captain_id: captainId || undefined,
                  region_id: regionId || undefined,
                  area_id: areaId || undefined,
                  vehicle_type_id: vehicleTypeId || undefined,
                  work_status: workStatus || undefined,
                  shift_status_id: shiftStatusId || undefined,
                  nationality_id: nationalityId || undefined,
                  company_id_3pl: companyId,
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
