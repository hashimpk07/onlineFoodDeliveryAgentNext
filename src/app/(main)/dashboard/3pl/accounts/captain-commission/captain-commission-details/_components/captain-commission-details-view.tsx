/* eslint-disable complexity */
"use client";
"use no memo";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useCaptainCommissionDetailsCountList } from "../_hooks/use-captain-commission-details-count-list";
import { useCaptainCommissionDetailsList } from "../_hooks/use-captain-commission-details-list";
import { useCaptainCommissionDetailsParams } from "../_hooks/use-captain-commission-details-params";

import { CaptainCommissionDetailsCard } from "./captain-commission-details-cards";
import { columns } from "./captain-commission-details-column";
import { CaptainCommissionDetailsFilters } from "./captain-commission-details-filters";

interface CaptainCommissionDetailsViewProps {
  id: string;
  paymentStatus?: string;
  captainName?: string;
}

export default function CaptainCommissionDetailsView({
  id,
  paymentStatus,
  captainName,
}: CaptainCommissionDetailsViewProps) {
  const {
    capatian_commission,
    pagination,
    isLoading,
    refetch,
    page,
    pageSize,
  } = useCaptainCommissionDetailsList(id);

  const { setPage, setPageSize } = useCaptainCommissionDetailsParams();

  const { counts, loading: loadingCounts } =
    useCaptainCommissionDetailsCountList(id);

  const table = useDataTableInstance({
    data: capatian_commission,
    columns: columns,
    pageCount: Math.max(1, pagination?.last_page ?? 1),
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    getRowId: (row, index) => `${row.awb}-${index}`,
  });

  if (isLoading && loadingCounts) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
        <CaptainCommissionDetailsFilters captainId={id} />
        <DataTableSkeleton
          columnCount={columns.length}
          rowCount={10}
          searchableColumnCount={0}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">
          {captainName ?? "Captain Commission Details"}
        </h2>
        {paymentStatus && (
          <p className="text-sm text-muted-foreground">
            Payment Status:{" "}
            <span className="font-semibold text-foreground">
              {paymentStatus}
            </span>
          </p>
        )}
      </div> */}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CaptainCommissionDetailsCard
          title="ATTENDED ORDERS"
          imageSrc="/accounts/captains-commission/attended-orders.png"
          count={counts?.attended_orders ?? 0}
        />
        <CaptainCommissionDetailsCard
          title="AVERAGE COMMISSION / ORDER"
          imageSrc="/accounts/captains-commission/commission-order.png"
          count={counts?.total_avg_commission ?? "0.00"}
        />
        <CaptainCommissionDetailsCard
          title="TOTAL COMMISSION"
          imageSrc="/accounts/captains-commission/total-commission.png"
          count={counts?.total_commission ?? "0.00"}
        />
        <CaptainCommissionDetailsCard
          title="PAID COMMISSION"
          imageSrc="/accounts/captains-commission/paid-commission.png"
          count={counts?.total_payed_amount ?? "0.00"}
        />
        <CaptainCommissionDetailsCard
          title="PAYABLE COMMISSION"
          imageSrc="/accounts/captains-commission/payable-commission.png"
          count={counts?.total_payable_commission ?? "0.00"}
        />
      </div>

      {/* FILTERS */}
      <CaptainCommissionDetailsFilters
        table={table}
        payment={counts?.payment_status ?? paymentStatus}
        onReset={refetch}
        captainId={id}
        counts={counts}
      />

      {/* TABLE */}
      <div className="relative rounded-md border bg-card shadow-sm w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur">
            <span className="animate-pulse text-muted-foreground">
              Loading...
            </span>
          </div>
        )}

        <ScrollArea className="w-full">
          <DataTable table={table} columns={columns} key={page} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <DataTablePagination
          table={table}
          totalCount={pagination?.total ?? 0}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
