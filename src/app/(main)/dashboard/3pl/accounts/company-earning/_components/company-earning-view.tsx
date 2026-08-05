/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complexity */
"use client";

import { CompanyEarningCard } from "@/app/[locale]/(main)/dashboard/3pl/accounts/company-earning/_components/company-earning-cards";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { useCompanyEarningList } from "../_hooks/use-company-earning-list";

import { columns } from "./company-earning-column";
import { CompanyEarningFilters } from "./company-earning-filters";
import { CompanyEarningTable } from "./company-earning-table";

export default function CompanyEarningView() {
  const { commissions, pagination, loading, counts } = useCompanyEarningList();

  const table = useDataTableInstance({
    data: commissions ?? [],
    columns,
    pageCount: pagination?.total ?? 1,
    manualPagination: true,
    getRowId: (row, index) => `${row.id}-${index}`,
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
        <CompanyEarningFilters loading={loading} />
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
    <div className="space-y-5 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        <CompanyEarningCard
          imageSrc="/accounts/captains-commission/attended-orders.png"
          count={counts?.attended_orders ?? 0}
          title="ATTENDED ORDERS"
        />

        <CompanyEarningCard
          imageSrc="/accounts/captains-commission/commission-order.png"
          count={counts?.avg_commission ?? "0.00"}
          title="AVERAGE COMMISSION/ORDER"
        />

        <CompanyEarningCard
          imageSrc="/accounts/captains-commission/total-commission.png"
          count={counts?.total_commission ?? "0.00"}
          title="TOTAL COMMISSION"
        />

        <CompanyEarningCard
          imageSrc="/accounts/captains-commission/paid-commission.png"
          count={counts?.total_payed_commission ?? "0.00"}
          title="PAID COMMISSION"
        />

        <CompanyEarningCard
          imageSrc="/accounts/captains-commission/payable-commission.png"
          count={counts?.payable_commission ?? "0.00"}
          title="PAYABLE COMMISSION"
        />
      </div>

      <div className="flex flex-col gap-4 w-full min-w-0">
        <CompanyEarningFilters loading={false} table={table} />
        <CompanyEarningTable
          table={table}
          isLoading={loading}
          total={pagination?.total ?? 0}
        />
      </div>
    </div>
  );
}
