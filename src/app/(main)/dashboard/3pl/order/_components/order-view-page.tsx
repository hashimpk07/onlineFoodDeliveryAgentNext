"use client";
"use no memo";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { OrderFilterPanel } from "@/app/[locale]/(main)/dashboard/3pl/order/_components/order-filter";
import { createOrdersColumns } from "@/app/[locale]/(main)/dashboard/3pl/order/_components/table-column";
import { useOrdersList } from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-orders-list";
import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-orders-parms";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

export default function OrderViewPage() {
  // ALL HOOKS MUST BE CALLED FIRST, BEFORE ANY CONDITIONAL RETURNS
  const { page, pageSize, setPage, setPageSize } = useOrdersUrlParams();
  const router = useRouter();

  // eslint-disable-next-line react-hooks/purity
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const { orders, isLoading, isFetching, isError, pagination, error } =
    useOrdersList();

  const handleView = (id: string | number) => {
    router.push(`/dashboard/3pl/order/${id}`);
  };

  const handleEdit = (id: string | number) => {
    router.push(`/dashboard/3pl/orders/${id}`);
  };

  const columns = useMemo(
    () => createOrdersColumns(handleView, handleEdit, now),
    [handleView, handleEdit],
  );

  const table = useDataTableInstance({
    data: orders ?? [],
    columns,
    manualPagination: true,
    getRowId: (row, index) => `${String(row.order_id)}-${index}`,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    pageCount: Math.ceil((pagination?.total ?? 0) / pageSize),
  });

  // NOW you can have conditional rendering AFTER all hooks
  if (isLoading || isFetching) {
    return (
      <>
        <OrderFilterPanel />
        <DataTableSkeleton
          columnCount={12}
          rowCount={10}
          searchableColumnCount={3}
          filterableColumnCount={6}
          showViewOptions={false}
        />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <OrderFilterPanel />
        <div className="p-4 text-red-500">
          Failed to load orders
          <div className="text-sm mt-1">
            {error instanceof Error ? error.message : "Unknown error"}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <OrderFilterPanel table={table} />

      <div className="flex-1 rounded-md border relative bg-card shadow-sm w-full min-w-0 overflow-hidden">
        <DataTable table={table} columns={columns} />
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
