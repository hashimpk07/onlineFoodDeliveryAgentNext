/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";

import { Table } from "@tanstack/react-table";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUser } from "@/hooks/use-user";
import { fromApiDate, toApiDate } from "@/lib/date";

import { usePaymentByList } from "../_hooks/use-captain-commission-payment-paid-by-list";
import { useCompanyCommissionPaymentList } from "../_hooks/use-captain-commission-payments-captain-list";
import { useCaptainCommissionPaymentParams } from "../_hooks/use-captain-commission-payments-params";
import { usePaymentTypeList } from "../_hooks/use-captain-commission-payments-payment-type-list";

interface CaptainCommissionPaymentFiltersProps {
  loading?: boolean;
  table?: Table<any>;
}

export function CaptainCommissionPaymentFilters({
  loading = false,
  table,
}: CaptainCommissionPaymentFiltersProps) {
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
    isAnyFilterActive,
    setPage,
  } = useCaptainCommissionPaymentParams();

  const { data: captainOptions = [], isLoading: isCaptainLoading } =
    useCompanyCommissionPaymentList();

  const { data: paymentTypeOptions = [], isLoading: isPaymentTypeLoading } =
    usePaymentTypeList();

  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const { data: paymentByOptions = [], isLoading: isPaymentBYLoading } =
    usePaymentByList(companyId);

  const router = useRouter();

  return (
    <div className="rounded-xl bg-card p-1 sm:p-6 shadow-sm border space-y-6">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 items-end">
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
          label="Paid By"
          title="Select Paid By"
          options={paymentByOptions}
          filterValue={paidBy ? [paidBy] : []}
          setFilterValue={(value) => {
            setPaidBy(value?.[0] ?? "");
            setPage(1);
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

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-1">
        {/* <Button className="flex items-center gap-2">Make Payments</Button> */}
        <Button
          onClick={() =>
            router.push(
              "/dashboard/3pl/accounts/captain-commission/captain-commission-payment/captain-commission-confirm-payment",
            )
          }
          className="flex items-center gap-2"
        >
          Make Payments
        </Button>
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
