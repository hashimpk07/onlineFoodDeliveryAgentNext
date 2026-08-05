/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUser } from "@/hooks/use-user";
import { fromApiDate, toApiDate } from "@/lib/date";
import { useExportStore } from "@/providers/export-store-provider";

import { STATUS_OPTIONS } from "../_constants/company-earning_constants";
import { useCompanyEarningClientList } from "../_hooks/use-company-earning-client-list";
import { useCompanyEarningParams } from "../_hooks/use-company-earning-params";
import { useCompanyEarningShopList } from "../_hooks/use-company-earning-shop-list";

interface CompanyEarningFiltersProps {
  loading?: boolean;
  table?: Table<any>;
}

export function CompanyEarningFilters({
  loading = false,
  table,
}: CompanyEarningFiltersProps) {
  const {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    status,
    setStatus,
    clientId,
    setClientId,
    shopId,
    setShopId,
    search,
    setSearch,
    resetFilters,
    isAnyFilterActive,
    setPage,
  } = useCompanyEarningParams();

  const { data: clientOptions = [], isLoading: isClientLoading } =
    useCompanyEarningClientList();

  const openExportModal = useExportStore((s) => s.openModal);

  const { data: shopOptions = [], isLoading: isShopLoading } =
    useCompanyEarningShopList();

  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  return (
    <div className="rounded-xl bg-card p-1 sm:p-6 shadow-sm border space-y-6">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 items-end">
        {/* <DataTableSearch
          label="Client Order ID"
          searchKey="Client Order ID..."
          searchQuery={search}
          setSearchQuery={setSearch}
        /> */}
        <DateRangePicker
          label="Date Range"
          from={fromApiDate(fromDate)}
          to={fromApiDate(toDate)}
          onChange={(from, to) => {
            setFromDate(from ? toApiDate(from) : null);
            setToDate(to ? toApiDate(to) : null);
          }}
        />
        {/* <DataTableFilterBox
          label="By Client"
          title="Select Client"
          options={clientOptions}
          filterValue={clientId ? [clientId] : []}
          setFilterValue={(value) => {
            setClientId(value?.[0] ?? "");
            setPage(1);
          }}
        />
        <DataTableFilterBox
          label="By Shop"
          title="Choose Shop"
          options={shopOptions}
          filterValue={shopId ? [shopId] : []}
          setFilterValue={(value) => {
            setShopId(value?.[0] ?? "");
            setPage(1);
          }}
        /> */}
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
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-1">
        <Button
          variant="outline"
          onClick={() =>
            openExportModal({
              reportType: "company_earning_report",
              exportUrl: "/public/export",
              method: "POST",
              payload: {
                from_date: fromDate || undefined,
                to_date: toDate || undefined,
                status: status || undefined,
                client: clientId || undefined,
                shop: shopId || undefined,
                q: search || undefined,
                company_id_3pl: companyId ?? undefined,
              },
            })
          }
          className="flex items-center gap-2"
        >
          <Download className="size-4" />
          Export
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
