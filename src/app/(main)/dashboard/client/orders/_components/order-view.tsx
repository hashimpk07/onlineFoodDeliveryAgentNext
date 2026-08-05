"use client";
"use no memo";

import { useMemo, useState } from "react";

// import { declineReturnOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_api/order-return";
import { useRouter } from "next/navigation";

import DeclineReasonModal from "@/app/[locale]/(main)/dashboard/client/_modal/_components/decline-reason-modal";
import CancelOrderModal from "@/app/[locale]/(main)/dashboard/client/_modal/_components/order-cancellation-view";
import OrderChat from "@/app/[locale]/(main)/dashboard/client/_modal/_components/order-chat";
import ReturnOrderModal from "@/app/[locale]/(main)/dashboard/client/_modal/_components/order-return-view";
import { useCancelOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_hooks/use-cancellation-reasons";
import { OrdersStatusCards } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-status-cards";
import { createColumns } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-table/column";
import { OrdersFilterPanel } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-table/orders-filters";
import { StatusCardsSkeleton } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-table/status-card-skelton";
import { useOrdersLists } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-orders-list";
import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-orders-params";
import { useReturnOrder } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-return";
import { ClientDetails } from "@/components/create-order-modal/types";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

/*  eslint-disable complexity */
export default function OrdersViewPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);

  const [returnReason, setReturnReason] = useState<string>("");

  const { declineReturn, decliningReturn } = useReturnOrder();
  const router = useRouter();
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [currentClientOrderId, setCurrentClientOrderId] = useState<string>("");
  const { cancelOrder, cancellingOrder } = useCancelOrder(currentOrderId ?? "");
  const {
    order,
    shops,
    status,
    statusCard,
    pagination,
    clientshopQuery,
    isLoading,
    loadingStatusCards,
  } = useOrdersLists();

  // shops data
  const [cancelOptions, setCancelOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const shopsData = clientshopQuery?.shops;
  const clientsDetails = clientshopQuery?.clients as
    | ClientDetails[]
    | undefined;

  const { page, pageSize, setPage, setPageSize } = useOrdersUrlParams();
  const handleOpenChat = (orderId: string, clientOrderId: string) => {
    setCurrentOrderId(orderId);
    setCurrentClientOrderId(clientOrderId);
    setIsChatOpen(true);
  };

  const handleOpenCancel = (orderId: string) => {
    setCurrentOrderId(orderId);
    setIsCancelOpen(true);
  };

  const handleOpenReturn = (orderId: string, reason?: string) => {
    setCurrentOrderId(orderId);
    setReturnReason(reason ?? "");
    setIsReturnOpen(true);
  };

  const handleReturnDecline = () => {
    setIsReturnOpen(false);
    setIsDeclineOpen(true);
  };

  const handleDeclineSubmit = async (reason: string) => {
    if (!currentOrderId) return;

    try {
      const res = await declineReturn({
        orderId: currentOrderId,
        reason,
      });

      if (res.status === "success") {
        setIsDeclineOpen(false);
        setCurrentOrderId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (id: string | number) => {
    router.push(`/dashboard/client/orders/${id}`);
  };

  const columns = useMemo(
    () =>
      createColumns(
        handleOpenChat,
        handleOpenCancel,
        handleOpenReturn,
        handleView,
      ),
    [handleOpenChat, handleOpenCancel, handleOpenReturn, handleView],
  );

  const table = useDataTableInstance({
    data: order ?? [],
    columns,
    manualPagination: true,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    pageCount: Math.ceil((pagination?.total ?? 0) / pageSize),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <OrdersFilterPanel shops={shops} orderStatus={status} />
        <StatusCardsSkeleton />
        <DataTableSkeleton
          columnCount={12}
          rowCount={10}
          searchableColumnCount={3}
          filterableColumnCount={6}
          showViewOptions={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <OrdersFilterPanel
        shops={shops}
        orderStatus={status}
        clientsDetails={clientsDetails}
        shopsData={shopsData}
      />
      <OrdersStatusCards
        statusCard={statusCard}
        isLoading={loadingStatusCards}
      />

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

      {currentOrderId && (
        <OrderChat
          orderId={currentOrderId}
          client_order_id={currentClientOrderId}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {currentOrderId && (
        <CancelOrderModal
          isOpen={isCancelOpen}
          closeModal={() => setIsCancelOpen(false)}
          orderId={currentOrderId}
          title="Cancel Order"
          subtitle="Please select a reason for cancellation"
          button_name="Update"
          options={cancelOptions}
          cancelOrder={cancelOrder}
          cancellingOrder={cancellingOrder}
        />
      )}

      {/* RETURN MODAL */}
      {currentOrderId && (
        <ReturnOrderModal
          isOpen={isReturnOpen}
          closeModal={() => setIsReturnOpen(false)}
          title={currentOrderId}
          reason={returnReason}
          onAccept={() => {
            setIsReturnOpen(false);
            setCurrentOrderId(null);
          }}
          onDecline={() => {
            setIsReturnOpen(false);
            setIsDeclineOpen(true);
          }}
        />
      )}

      <DeclineReasonModal
        isOpen={isDeclineOpen}
        closeModal={() => setIsDeclineOpen(false)}
        onSubmit={handleDeclineSubmit}
      />
    </div>
  );
}
