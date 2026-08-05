/* eslint-disable */

"use client";
"use no memo";
import { useCallback, useEffect, useMemo, useState } from "react";

import { createOrderColumns } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/order-logs/column";
import UpdatePaymentModal from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_components/order-logs/update-payment-modal";
import { useCaptainOrderLogs } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-order-logs";
import { useOrderPayment } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-order-payment";
import { useUpdatePayment } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-update-payment";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { TablePagination } from "@/components/data-table/table-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { toast } from "sonner";

export function ShiftOrderLogsTable() {
  const {
    orders,
    pagination,
    isError,
    isLoading,
    isFetching,
    order_page,
    orderPageSize,
    setOrderPage,
    setOrderPageSize,
    refetch,
  } = useCaptainOrderLogs();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const { data: orderPayment, isLoading: isLoadingPayment } =
    useOrderPayment(selectedOrderId);

  const updatePaymentMutation = useUpdatePayment();

  // Prepare payment data for modal
  const paymentData = orderPayment
    ? {
        payment_id: orderPayment.payment?.id?.toString() || "",
        amount: orderPayment.amount,
        order_amount: orderPayment.amount,
      }
    : null;

  // Open modal once payment data is loaded
  useEffect(() => {
    if (selectedOrderId && orderPayment && !isLoadingPayment) {
      setIsPaymentModalOpen(true);
    }
  }, [selectedOrderId, orderPayment, isLoadingPayment]);

  const handleEditPayment = useCallback((row: any) => {
    setSelectedOrderId(row.id);
  }, []);

  const handlePaymentSubmit = async (data: any) => {
    if (!paymentData?.payment_id) {
      toast.error("Order ID is missing");
      return;
    }

    try {
      await updatePaymentMutation.mutateAsync({
        order_id: paymentData?.payment_id,
        data: data,
      });
      setIsPaymentModalOpen(false);
      setSelectedOrderId(null); // Reset after success
      await refetch();
    } catch (error) {
      console.error("Error updating payment:", error);
      // Error is already handled by mutation's onError
    }
  };

  const handleCloseModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedOrderId(null);
  };

  const columns = useMemo(
    () => createOrderColumns(handleEditPayment),
    [handleEditPayment],
  );

  const table = useDataTableInstance({
    data: orders ?? [],
    columns,
    manualPagination: true,
    pagination: {
      pageIndex: order_page - 1,
      pageSize: orderPageSize,
    },
    pageCount: Math.ceil((pagination?.total ?? 0) / orderPageSize),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 m">
        <DataTableSkeleton
          columnCount={7}
          rowCount={10}
          searchableColumnCount={0}
          filterableColumnCount={0}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <>
      <Card className="max-w-7xl mx-auto mt-5">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Order Logs</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <DataTable table={table} columns={columns} />
          <TablePagination
            totalCount={pagination?.total ?? 0}
            page={order_page}
            pageSize={orderPageSize}
            onPageChange={setOrderPage}
            onPageSizeChange={setOrderPageSize}
          />
        </CardContent>
      </Card>

      <UpdatePaymentModal
        isOpen={isPaymentModalOpen}
        closeModal={handleCloseModal}
        onSubmit={handlePaymentSubmit}
        isLoading={updatePaymentMutation.isPending || isLoadingPayment}
        paymentData={paymentData}
      />
    </>
  );
}
