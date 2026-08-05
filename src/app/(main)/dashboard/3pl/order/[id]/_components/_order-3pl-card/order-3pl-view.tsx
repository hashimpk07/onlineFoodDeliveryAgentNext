"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import OrderItemsSummaryCard from "@/app/[locale]/(main)/dashboard/3pl/order/[id]/_components/_order-3pl-card/order-items-summary-card";
import OrderLogsCard from "@/app/[locale]/(main)/dashboard/3pl/order/[id]/_components/_order-3pl-card/order-logs-card";
import { useOrders3plView } from "@/app/[locale]/(main)/dashboard/3pl/order/[id]/_hooks/use-3pl-view";
import CancelOrderModal from "@/app/[locale]/(main)/dashboard/client/_modal/_components/order-cancellation-view";
import { useCancelOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_hooks/use-cancellation-reasons";
import { InfoCard } from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_components/_order-client-cards/info-card";
import { Spinner } from "@/components/ui/spinner";

const OrderMap = dynamic(
  () =>
    import("@/app/[locale]/(main)/dashboard/3pl/order/[id]/_components/delivery-map/map").then(
      (mod) => mod.OrderMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full items-center justify-center">
        <Spinner className="h-6 w-6" />
      </div>
    ),
  },
);

// eslint-disable-next-line complexity
export default function OrderClientViewPage() {
  const { id } = useParams<{ id: string }>();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isCancelPending, setIsCancelPending] = useState(false);
  const { cancelOrder, cancellingOrder } = useCancelOrder(id);
  const [cancelOptions, setCancelOptions] = useState<
    { label: string; value: number }[]
  >([]);

  const { viewData, viewError, viewLoading } = useOrders3plView(id);
  const handleOpenCancel = () => {
    setIsCancelOpen(true);
    setIsCancelPending(true);
  };

  if (viewLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
        <Spinner className="h-8 w-8 text-muted-foreground animate-spin" />
        <p className="text-sm text-muted-foreground">
          Loading data, please wait...
        </p>
      </div>
    );
  }

  if (viewError) {
    console.error("React Query error:");
    return <div>Failed to load order {id}</div>;
  }

  const order = viewData?.shipping_information;
  const billingInfo = viewData?.billing_information;
  const deliveryInfo = viewData?.delivery_info;
  const logInfo = viewData?.log_info;
  const payableAmount = viewData?.payable_amount;
  const deliveryCharge = viewData?.delivery_charges;

  if (!order) return <div className="">No order found</div>;

  const itemsForCard =
    viewData?.item_order?.map((item) => ({
      name: item.name ?? "",
      quantity: item.quantity ?? 0,
      price: item.price ?? 0,
      amount: (item.quantity ?? 0) * (item.price ?? 0),
    })) ?? [];

  return (
    <div className="space-y-8 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          title="SHIPPING INFORMATION"
          variant="shipping"
          items={[
            { label: "Client Name :", value: order.client_name ?? "-" },
            { label: "Shop :", value: order.shop ?? "-" },
            { label: "Client Order ID :", value: order.client_order_id ?? "-" },
            {
              label: "Created Date :",

              value: order.order_date ?? "-",
            },
            { label: "Delivery Type :", value: order.delivery_type ?? "-" },
          ]}
        />

        <InfoCard
          title="BILLING INFORMATION"
          variant="billing"
          items={[
            {
              label: "Customer Name :",
              value: billingInfo?.customer_name ?? "-",
            },
            {
              label: "Customer Number :",
              value: billingInfo?.customer_number ?? "-",
            },
            {
              label: "Customer Email :",
              value: billingInfo?.customer_email ?? "-",
            },
            { label: "Address :", value: billingInfo?.customer_address ?? "-" },
          ]}
        />

        <InfoCard
          title="DELIVERY INFO"
          variant="delivery"
          items={[
            { label: "Order ID :", value: deliveryInfo?.order_id ?? "-" },
            {
              label: "Payment Mode :",
              value: deliveryInfo?.payment_mode ?? "-",
            },
            {
              label: "Status :",
              value: deliveryInfo?.status ?? "-",
            },
            {
              label: "Captain Name :",
              value: deliveryInfo?.captain_name ?? "Not Assigned",
            },
          ]}
        />
      </div>

      <OrderLogsCard
        orderId={order.client_order_id ?? ""}
        logs={logInfo?.logs ?? []}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch auto-rows-fr">
        <div className="h-full flex">
          <OrderItemsSummaryCard
            orderId={order.client_order_id ?? ""}
            items={itemsForCard}
            deliveryCharges={deliveryCharge ?? 0}
            payableAmount={payableAmount ?? 0}
            className="flex-1"
          />
        </div>

        <div className="h-full flex">
          <OrderMap id={id} />
        </div>
      </div>

      <CancelOrderModal
        isOpen={isCancelOpen}
        closeModal={() => {
          setIsCancelOpen(false);
          setIsCancelPending(false);
        }}
        orderId={id}
        cancelOrder={cancelOrder}
        cancellingOrder={cancellingOrder}
        title="Cancel Order"
        subtitle="Please select a reason for cancellation"
        button_name="Update"
        options={cancelOptions}
      />
    </div>
  );
}
