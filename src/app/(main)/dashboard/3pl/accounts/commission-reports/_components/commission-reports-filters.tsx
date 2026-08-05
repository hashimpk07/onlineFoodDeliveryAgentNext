"use client";

import { useState } from "react";

import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCommissionReportCompanyList } from "../_hooks/use-commission-report-company-list";
import { useCommissionReportRegionList } from "../_hooks/use-commission-report-region-list";
import { useCommissionReportParams } from "../_hooks/use-commission-reports-params";

// Hardcoded for now. In a real scenario, these might come from an API.
const PAYMENT_STATUS_OPTIONS = [
  { value: "Payable", label: "Payable" },
  { value: "Tally", label: "Tally" },
];

interface CommissionReportsFiltersProps {
  loading?: boolean;
  table?: Table<any>;
}

export function CommissionReportsFilters() {
  const {
    companyId,
    crNumber,
    region,
    paymentStatus,
    setCompanyId,
    setCrNumber,
    setRegion,
    setPaymentStatus,
    resetFilters,
    isAnyFilterActive,
    setPage,
  } = useCommissionReportParams();

  const { data: regionOptions = [] } = useCommissionReportRegionList();
  const { data: companyOptions = [] } = useCommissionReportCompanyList();

  const [localCompanyId, setLocalCompanyId] = useState(companyId);
  const [localCrNumber, setLocalCrNumber] = useState(crNumber);

  const handleSearch = () => {
    setCompanyId(localCompanyId);
    setCrNumber(localCrNumber);
    setPage(1);
  };

  const handleReset = () => {
    setLocalCompanyId("");
    setLocalCrNumber("");
    resetFilters();
  };

  return (
    <div className="rounded-xl bg-card p-4 sm:p-6 shadow-sm border space-y-6">
      <div className="flex justify-between items-center pb-2 border-b">
        <h2 className="text-sm font-semibold uppercase text-red-500">Search</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
        <DataTableFilterBox
          label="Company Name"
          title="Select Company"
          options={companyOptions}
          filterValue={localCompanyId ? [localCompanyId] : []}
          setFilterValue={(value) => {
            setLocalCompanyId(value?.[0] ?? "");
          }}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            CR Number
          </label>
          <Input
            placeholder="Search CR Number..."
            value={localCrNumber}
            onChange={(e) => setLocalCrNumber(e.target.value)}
            className="w-full"
          />
        </div>

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
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSearch} className="flex items-center gap-2">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
        <DataTableResetFilter
          onReset={handleReset}
          isFilterActive={isAnyFilterActive}
        />
      </div>
    </div>
  );
}
