/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import { useCallback, useState } from "react";

import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { CaptainCommissionPaymentModal } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/captain-commission-details/_components/captain-commission-payment-modal";
import { STATUS_OPTIONS } from "@/app/[locale]/(main)/dashboard/3pl/accounts/company-earning/_constants/company-earning_constants";
import { useCompanyEarningClientList } from "@/app/[locale]/(main)/dashboard/3pl/accounts/company-earning/_hooks/use-company-earning-client-list";
import { useCompanyEarningShopList } from "@/app/[locale]/(main)/dashboard/3pl/accounts/company-earning/_hooks/use-company-earning-shop-list";
import { DataTableFilterBox } from "@/components/data-table/data-table-filter-box";
import { DataTableResetFilter } from "@/components/data-table/data-table-reset-filter";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { QuickDateSelect } from "@/components/data-table/quick-date-select";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUser } from "@/hooks/use-user";
import { fromApiDate, toApiDate } from "@/lib/date";
import { useExportStore } from "@/providers/export-store-provider";

import { useCaptainCommissionDetailsParams } from "../_hooks/use-captain-commission-details-params";

import type {
  CaptainCommissionDetails,
  CaptainCommissionDetailsCounts,
} from "../_types/captain-commission-details-type";

interface CaptainCommissionDetailsFiltersProps {
  onReset?: () => void;
  payment?: string;
  captainId?: string;
  counts?: CaptainCommissionDetailsCounts | null;
  table?: Table<CaptainCommissionDetails>;
}

export function CaptainCommissionDetailsFilters({
  onReset,
  payment,
  captainId,
  counts,
  table,
}: CaptainCommissionDetailsFiltersProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const {
    fromDate,
    toDate,
    search,
    status,
    shop,
    client,
    setFromDate,
    setToDate,
    setSearch,
    setClient,
    setShop,
    setStatus,
    resetFilters,
    setPage,
    isAnyFilterActive,
  } = useCaptainCommissionDetailsParams();

  const handleReset = useCallback(() => {
    resetFilters();
    if (onReset) onReset();
  }, [resetFilters, onReset]);

  const { data: clientOptions = [] } = useCompanyEarningClientList();

  const openExportModal = useExportStore((s) => s.openModal);

  const { data: shopOptions = [] } = useCompanyEarningShopList();

  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

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

        <DataTableSearch
          label="Client Order ID"
          searchKey="Search Client Order ID..."
          searchQuery={search}
          setSearchQuery={setSearch}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-end">
        <DataTableFilterBox
          label="By Client"
          title="select Client"
          options={clientOptions}
          filterValue={client ?? null}
          setFilterValue={(values) =>
            setClient(values && values.length > 0 ? values[0] : null)
          }
        />

        <DataTableFilterBox
          label="By Shop"
          title="Select Shop"
          options={shopOptions}
          filterValue={shop ?? null}
          setFilterValue={(values) =>
            setShop(values && values.length > 0 ? values[0] : null)
          }
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
      </div>

      <QuickDateSelect
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
      <div className="flex flex-wrap justify-end gap-1">
        {payment !== "Tally" && (
          <Button
            className="flex items-center gap-2"
            onClick={() => setShowPaymentModal(true)}
          >
            Make Payment
          </Button>
        )}
        <CaptainCommissionPaymentModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          counts={counts}
          captainId={captainId}
          initialFromDate={fromDate}
          initialToDate={toDate}
        />
        {companyId && (
          <Button
            variant="outline"
            onClick={() =>
              openExportModal({
                reportType: "3pl_captain_commission_details_report",
                exportUrl: "/public/export",
                method: "POST",
                payload: {
                  from_date: fromDate ?? undefined,
                  to_date: toDate ?? undefined,
                  status: status ?? undefined,
                  client: client ?? undefined,
                  shop: shop ?? undefined,
                  q: search ?? undefined,
                  captain_id: captainId ?? undefined,
                  company_id_3pl: companyId ?? undefined,
                },
              })
            }
            className="flex items-center gap-2"
          >
            <Download className="size-4" />
            Export
          </Button>
        )}
        <div className="flex items-center gap-2">
          <DataTableResetFilter
            onReset={handleReset}
            isFilterActive={isAnyFilterActive}
          />
        </div>
      </div>
    </div>
  );
}
