"use client";

import { useCallback, useState } from "react";

import { Table } from "@tanstack/react-table";
import { toast } from "sonner";

import {
  PAYMENT_STATUS_OPTIONS,
  WORK_STATUS_OPTIONS,
} from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/_constants/captain-commission_constants";
import { useCaptainList } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/captain-commission-payment/captain-commission-confirm-payment/_hooks/use-captain-list";
import { useVehicleTypeList } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/captain-commission-payment/captain-commission-confirm-payment/_hooks/use-vehicle-type-list";
import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import { fromApiDate, toApiDate } from "@/lib/date";

import { useCaptainCommissionDetailsParams } from "../_hooks/use-captain-commission-confirm-payment-params";

import { CaptainCommissionPaymentModal } from "./captain-commission-confirm-payment-modal";

import type {
  CaptainCommissionCount,
  CaptainCommissionPayment,
} from "../_types/captain-commission-confirm-payment-type";

interface CaptainCommissionDetailsFiltersProps {
  loading?: boolean;
  table?: Table<CaptainCommissionPayment>;
  tableData?: CaptainCommissionPayment[];
  onReset?: () => void;
  counts?: CaptainCommissionCount | null;
}

export function CaptainCommissionDetailsFilters({
  loading = false,
  table,
  tableData = [],
  onReset,
  counts,
}: CaptainCommissionDetailsFiltersProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedRowsData, setSelectedRowsData] = useState<
    CaptainCommissionPayment[]
  >([]);
  const {
    fromDate,
    toDate,
    paymentStatus,
    vehicleType,
    captain,
    status,
    removed_zero_captain,
    setFromDate,
    setToDate,
    setPaymentStatus,
    setCaptain,
    setVehicleType,
    setStatus,
    setRemovedZeroCaptain,
    resetFilters,
    setPage,
    isAnyFilterActive,
  } = useCaptainCommissionDetailsParams();

  const handleReset = useCallback(() => {
    resetFilters();
    if (onReset) onReset();
  }, [resetFilters, onReset]);

  const { data: captainList = [] } = useCaptainList();
  const { data: vehicleTypeList = [] } = useVehicleTypeList();

  const handleConfirmPayment = () => {
    const selectedRows = table?.getSelectedRowModel().rows ?? [];
    if (selectedRows.length === 0) {
      toast.error("Please select at least one captain to confirm payment.");
      return;
    }

    // Get the selected row indices and map them to the current table data (with edits)
    const selectedData = selectedRows
      .map((row) => {
        const rowIndex = row.index;
        // eslint-disable-next-line security/detect-object-injection
        return tableData[rowIndex];
      })
      .filter(Boolean)
      .filter((row) => Number(row.paying_amount || 0) > 0); // Only include rows with paying amount > 0

    if (selectedData.length === 0) {
      toast.error(
        "No valid payments selected. Please ensure selected rows have a paying amount greater than zero.",
      );
      return;
    }

    console.log("=== CONFIRM PAYMENT DEBUG ===");
    console.log("Selected Rows Count:", selectedRows.length);
    console.log("Table Data Length:", tableData.length);
    console.log("Valid Payments (> 0):", selectedData.length);
    console.log("Selected Data:", selectedData);
    console.log("============================");

    setSelectedRowsData(selectedData);
    setShowPaymentModal(true);
  };

  return (
    <div className="rounded-xl bg-card p-1 sm:p-6 shadow-sm border space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-end">
        <DateRangePicker
          label="Date Range"
          from={fromApiDate(fromDate)}
          to={fromApiDate(toDate)}
          onChange={(from, to) => {
            setFromDate(toApiDate(from));
            setToDate(toApiDate(to));
          }}
        />

        <DataTableFilterBox
          label="Captain Name"
          title="select Captain Name"
          options={captainList}
          filterValue={captain ? [captain] : []}
          setFilterValue={(values) => {
            setCaptain(values && values.length > 0 ? values[0] : "");
            setPage(1);
          }}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-end">
        <DataTableFilterBox
          label="Work Status"
          title="Select Work Status"
          options={WORK_STATUS_OPTIONS}
          filterValue={status ? [status] : []}
          setFilterValue={(values) => {
            setStatus(values && values.length > 0 ? values[0] : "");
            setPage(1);
          }}
        />

        <DataTableFilterBox
          label="Vehicle Type"
          title="Select Vehicle Type"
          options={vehicleTypeList}
          filterValue={vehicleType ? [vehicleType] : []}
          setFilterValue={(values) => {
            setVehicleType(values && values.length > 0 ? values[0] : "");
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="removed_zero_captain"
          checked={removed_zero_captain === 1}
          onCheckedChange={(checked) => {
            setRemovedZeroCaptain(checked ? 1 : 0);
            setPage(1);
          }}
        />
        <Label
          htmlFor="removed_zero_captain"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Removed Non Payable Captains
        </Label>
      </div>

      <div className="flex flex-wrap justify-end gap-1">
        <Button
          className="flex items-center gap-2"
          onClick={handleConfirmPayment}
        >
          Confirm Payment
        </Button>
        <div className="flex items-center gap-2">
          <DataTableResetFilter
            onReset={handleReset}
            isFilterActive={isAnyFilterActive}
          />
        </div>
      </div>

      <CaptainCommissionPaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedRows={selectedRowsData}
        counts={counts}
        fromDate={fromDate}
        toDate={toDate}
      />
    </div>
  );
}
