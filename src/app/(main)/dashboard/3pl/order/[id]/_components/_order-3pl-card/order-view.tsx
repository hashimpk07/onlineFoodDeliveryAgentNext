"use client";

import { useState } from "react";

// import { declineReturnOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_api/order-return";
import { useParams, useRouter } from "next/navigation";

import OrderChat from "@/app/[locale]/(main)/dashboard/client/_modal/_components/order-chat";
import ReturnOrderModal from "@/app/[locale]/(main)/dashboard/client/_modal/_components/order-return-view";
import { useCancelOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_hooks/use-cancellation-reasons";
import { columns } from "@/app/[locale]/(main)/dashboard/client/order-report/_components/order-report-column";
import { OrdersStatusCards } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-status-cards";
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
  const { id } = useParams<{ id: string }>();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancelPending, setIsCancelPending] = useState(false);
  const [isReturnOpen, setIsReturnOpen] = useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);

  const [returnReason, setReturnReason] = useState<string>("");

  const { declineReturn, decliningReturn } = useReturnOrder();
  const router = useRouter();
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const {
    order,
    shops,
    status,
    statusCard,
    pagination,
    clientshopQuery,
    ordersError,
    isLoading,
    loadingStatusCards,
  } = useOrdersLists();
  const [cancelOptions, setCancelOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const { cancelOrder, cancellingOrder } = useCancelOrder(id);

  const shopsData = clientshopQuery?.shops;
  const clientsDetails = clientshopQuery?.clients as
    ClientDetails[] | undefined;

  const { page, pageSize } = useOrdersUrlParams();
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
        <OrdersFilterPanel
          shops={shops}
          orderStatus={status}
          clientsDetails={clientsDetails}
          shopsData={shopsData}
        />
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
      <h1 className="text-xl font-semibold">Orders</h1>
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
      <DataTable table={table} columns={columns} />
      <DataTablePagination
        table={table}
        totalCount={pagination?.total ?? 0}
        page={page}
        pageSize={pageSize}
        setPage={function (page: number, options?: any): void {
          throw new Error("Function not implemented.");
        }}
        setPageSize={function (pageSize: number, options?: any): void {
          throw new Error("Function not implemented.");
        }}
      />
      {currentOrderId && (
        <OrderChat
          orderId={currentOrderId}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          client_order_id={""}
        />
      )}
      RETURN MODAL
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
      {/* <DeclineReasonModal
        isOpen={isDeclineOpen}
        closeModal={() => setIsDeclineOpen(false)}
        onSubmit={handleDeclineSubmit}
      /> */}
    </div>
  );
}
