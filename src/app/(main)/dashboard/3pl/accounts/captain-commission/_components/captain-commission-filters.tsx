/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";

import { Table } from "@tanstack/react-table";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { useUser } from "@/hooks/use-user";
import { useExportStore } from "@/providers/export-store-provider";

import {
  PAYMENT_STATUS_OPTIONS,
  WORK_STATUS_OPTIONS,
} from "../_constants/captain-commission_constants";
import { useCaptainCommissionAreaList } from "../_hooks/use-captain-commission-area-list";
import { useCaptainCommissionCaptainList } from "../_hooks/use-captain-commission-captain-list";
import { useCaptainCommissionCountryList } from "../_hooks/use-captain-commission-country-list";
import { useCaptainCommissionParams } from "../_hooks/use-captain-commission-params";
import { useCaptainCommissionRegionList } from "../_hooks/use-captain-commission-region-list";

interface CaptainCommissionFiltersProps {
  loading?: boolean;
  table?: Table<any>;
  onReset?: () => void;
}

export function CaptainCommissionFilters({
  loading = false,
  table,
  onReset,
}: CaptainCommissionFiltersProps) {
  const router = useRouter();
  const {
    employee,
    captain,
    name,
    iqama,
    region,
    area,
    nationality,
    onDutyFrom,
    workStatus,
    paymentStatus,
    setEmployee,
    setCaptain,
    setName,
    setIqama,
    setRegion,
    setArea,
    setNationality,
    setOnDutyFrom,
    setWorkStatus,
    setPaymentStatus,
    resetFilters,
    isAnyFilterActive,
    setPage,
  } = useCaptainCommissionParams();

  const { data: captainOptions = [], isLoading: isCaptainLoading } =
    useCaptainCommissionCaptainList();

  const openExportModal = useExportStore((s) => s.openModal);

  const { data: regionOptions = [], isLoading: isRegionLoading } =
    useCaptainCommissionRegionList();

  const { data: areaOptions = [], isLoading: isAreaLoading } =
    useCaptainCommissionAreaList();

  const { data: countryOptions = [], isLoading: isCountryLoading } =
    useCaptainCommissionCountryList();

  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  return (
    <div className="rounded-xl bg-card p-1 sm:p-6 shadow-sm border space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-4 items-end">
        <DataTableSearch
          label="Employee ID"
          searchKey="Search Captain Employee ID..."
          searchQuery={employee}
          setSearchQuery={setEmployee}
        />

        {/* <DataTableSearch
          label="Employee Name"
          searchKey="Search Employee Name..."
          searchQuery={name}
          setSearchQuery={setName}
        /> */}

        {/* <DataTableSearch
          label="Iqama Number"
          searchKey="Search Iqama Number..."
          searchQuery={iqama}
          setSearchQuery={setIqama}
        /> */}

        {/* <DatePicker
          label="On Duty From"
          date={fromApiDate(onDutyFrom)}
          onChange={(date) => setOnDutyFrom(date ? toApiDate(date) : null)}
        /> */}

        <DataTableFilterBox
          label="Work Status "
          title="Select Work Status"
          options={WORK_STATUS_OPTIONS}
          filterValue={workStatus ? [workStatus] : []}
          setFilterValue={(value) => {
            setWorkStatus(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Payment Status"
          title="Select Payment Status"
          options={PAYMENT_STATUS_OPTIONS}
          filterValue={paymentStatus ? [paymentStatus] : []}
          setFilterValue={(value) => {
            setPaymentStatus(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Work Area"
          title="Select Work Area"
          options={areaOptions}
          filterValue={area ? [area] : []}
          setFilterValue={(value) => {
            setArea(value?.[0] ?? "");
            setPage(1);
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-end">
        <DataTableFilterBox
          label="Nationality "
          title="Select Nationality"
          options={countryOptions}
          filterValue={nationality ? [nationality] : []}
          setFilterValue={(value) => {
            setNationality(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Select Captain"
          title="Choose Captain"
          options={captainOptions}
          filterValue={captain ? [captain] : []}
          setFilterValue={(value) => {
            setCaptain(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Regions"
          title="Select Region"
          options={regionOptions}
          filterValue={region ? [region] : []}
          setFilterValue={(value) => {
            setRegion(value?.[0] ?? "");
            setPage(1);
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-1">
        {/* Code command as requested by the tester */}
        {/* <Button
          onClick={() =>
            router.push(
              "/dashboard/3pl/accounts/captain-commission/captain-commission-payment",
            )
          }
          className="flex items-center gap-2"
        >
          Payment
        </Button> */}
        {/* View / Reset  and  Export */}
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
