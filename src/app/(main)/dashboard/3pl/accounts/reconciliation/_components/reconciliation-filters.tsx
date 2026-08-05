/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Table } from "@tanstack/react-table";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUser } from "@/hooks/use-user";
import { fromApiDate, toApiDate } from "@/lib/date";

import { useReconciliationList } from "../_hooks/use-reconciliation-captain-list";
import { usePaymentByList } from "../_hooks/use-reconciliation-paid-by-list";
import { useReconciliationParams } from "../_hooks/use-reconciliation-params";
import { usePaymentTypeList } from "../_hooks/use-reconciliation-payment-type-list";
import { useRegionList } from "../_hooks/use-reconciliation-region-list";

interface ReconciliationFiltersProps {
  loading?: boolean;
  table?: Table<any>;
}

export function ReconciliationFilters({
  loading = false,
  table,
}: ReconciliationFiltersProps) {
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    captain,
    setCaptain,
    paidBy,
    setPaidBy,
    paymentType,
    setPaymentType,
    search,
    setSearch,
    resetFilters,
    region,
    setRegion,
    isAnyFilterActive,
    setPage,
  } = useReconciliationParams();

  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const { data: captainOptions = [], isLoading: isCaptainLoading } =
    useReconciliationList();

  const { data: paymentTypeOptions = [], isLoading: isPaymentTypeLoading } =
    usePaymentTypeList();

  const { data: paymentByOptions = [], isLoading: isPaymentBYLoading } =
    usePaymentByList();

  const { data: regionOptions = [], isLoading: isRegionLoading } =
    useRegionList();

  return (
    <div className="rounded-xl bg-card p-1 sm:p-6 shadow-sm border space-y-6">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 items-end">
        <DataTableSearch
          label="Invoice Number"
          searchKey="Invoice Number..."
          searchQuery={search}
          setSearchQuery={setSearch}
        />
        <DateRangePicker
          label="Date Range"
          from={fromApiDate(fromDate)}
          to={fromApiDate(toDate)}
          onChange={(from, to) => {
            setFromDate(from ? toApiDate(from) : null);
            setToDate(to ? toApiDate(to) : null);
          }}
        />

        <DataTableFilterBox
          label="Payment Type "
          title="Select Payment Type"
          options={paymentTypeOptions}
          filterValue={paymentType ? [paymentType] : []}
          setFilterValue={(value) => {
            setPaymentType(value?.[0] ?? "");
            setPage(1);
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 items-end">
        <DataTableFilterBox
          label="Captain"
          title="Select Captain"
          options={captainOptions}
          filterValue={captain ? [captain] : []}
          setFilterValue={(value) => {
            setCaptain(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Regions "
          title="Select Regions"
          options={regionOptions}
          filterValue={region ? [region] : []}
          setFilterValue={(value) => {
            setRegion(value?.[0] ?? "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Paid By"
          title="Select Paid By"
          options={paymentByOptions}
          filterValue={paidBy ? [paidBy] : []}
          setFilterValue={(value) => {
            setPaidBy(value?.[0] ?? "");
            setPage(1);
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-1">
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
