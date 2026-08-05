"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { Copy, CreditCard, MapPin, Package, Truck } from "lucide-react";

import CancelOrderModal from "@/app/[locale]/(main)/dashboard/client/_modal/_components/order-cancellation-view";
import { useCancelOrder } from "@/app/[locale]/(main)/dashboard/client/_modal/_hooks/use-cancellation-reasons";
import { ManifestInfoCard } from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_components/_order-client-cards/manifest-info-card";
import OrderActionsSection from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_components/_order-client-cards/order-actions-section";
import OrderItemsSummaryCard from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_components/_order-client-cards/order-items-summary-card";
import OrderLogsCard from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_components/_order-client-cards/order-logs-card";
import { OrderNotesCard } from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_components/_order-client-cards/order-notes-card";
import OrderProgressTracker from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_components/order-process-tracker";
import { useOrdersClientView } from "@/app/[locale]/(main)/dashboard/client/orders/[id]/_hook/use-client-view";
import { Spinner } from "@/components/ui/spinner";
import { formatDateTime } from "@/lib/date";
import { getOrderStatusColor } from "@/lib/order-status";

// eslint-disable-next-line complexity
export default function OrderClientViewPage() {
  const { id } = useParams<{ id: string }>();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const { cancelOrder, cancellingOrder } = useCancelOrder(id);
  const cancelOptions: { label: string; value: number }[] = [];

  const { notesUpdate, viewData, viewError, viewLoading } =
    useOrdersClientView(id);

  const handleOpenCancel = () => {
    setIsCancelOpen(true);
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
    return <div>Failed to load order {id}</div>;
  }

  const order = viewData;
  if (!order) return <div className="">No order found</div>;
  const progressId = order?.progress?.id;
  const disableId = progressId;
  const canCancel = order?.actions?.can_cancel ?? false;

  const itemsForCard =
    order.items?.map((item) => ({
      name: item.product_name ?? "",
      quantity: item.quantity ?? 0,
      price: item.amount ?? 0,
      amount: item.total ?? (item.quantity ?? 0) * (item.amount ?? 0),
    })) ?? [];

  const statusLabel =
    order.progress?.name ??
    (typeof order.status === "string" ? order.status : order.status?.name) ??
    "-";
  const statusColor = getOrderStatusColor(progressId);

  return (
    <div className="mt-5 space-y-6 pb-4">
      {/* Hero header */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div
          className="h-1.5 w-full"
          style={{
            background:
              "linear-gradient(90deg, var(--chart-1), var(--chart-2), var(--chart-3))",
          }}
        />
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Package className="h-6 w-6 text-primary" strokeWidth={2.25} />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Order
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <p className="font-mono text-3xl font-bold tracking-tight text-foreground">
                  #{order.client_order_id ?? id}
                </p>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      String(order.client_order_id ?? id),
                    )
                  }
                  title="Copy order ID"
                  className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${statusColor.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${statusColor.dot}`} />
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ManifestInfoCard
          title="Shipping"
          icon={Truck}
          accent="shipping"
          items={[
            {
              label: "Client order ID",
              value: order.client_order_id ?? "-",
              badge: true,
            },
            {
              label: "Created",
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              value: formatDateTime(order.created_at) ?? "-",
            },
            {
              label: "Delivery time",
              value: order.delivery_time ?? "-",
              badge: true,
            },
          ]}
        />

        <ManifestInfoCard
          title="Billing"
          icon={CreditCard}
          accent="billing"
          items={[
            { label: "Customer", value: order.customer_name ?? "-" },
            {
              label: "Phone",
              value: order.customer_number ?? "-",
              badge: true,
            },
            { label: "Email", value: order.email ?? "-" },
            { label: "Address", value: order.address ?? "-" },
          ]}
        />

        <ManifestInfoCard
          title="Delivery"
          icon={MapPin}
          accent="delivery"
          items={[
            { label: "Order ID", value: order.code ?? "-", badge: true },
            {
              label: "Payment mode",
              value: order.delivery_payment_mode ?? "-",
              badge: true,
            },
            {
              label: "Captain",
              value: order.captain?.name ?? "Not assigned",
              badge: true,
            },
          ]}
        />
      </div>

      <OrderProgressTracker logs={order.logs ?? []} />
      <OrderLogsCard
        orderId={order.client_order_id ?? ""}
        logs={order.logs ?? []}
      />
      <OrderItemsSummaryCard
        orderId={order.client_order_id ?? ""}
        items={itemsForCard}
        deliveryCharges={Number(order.delivery_charge ?? 0)}
        payableAmount={Number(order.amount ?? 0)}
      />
      <OrderNotesCard
        notes={(order.notes ?? []).map((note: any, index: number) => ({
          id: `${note.created_at}-${index}`,
          ...note,
        }))}
      />
      <OrderActionsSection
        orderId={order.id}
        onCancel={handleOpenCancel}
        // isCancelled={isCancelled}
        canCancel={canCancel}
        disableId={disableId ?? 0}
        onUpdate={notesUpdate}
      />

      <CancelOrderModal
        isOpen={isCancelOpen}
        closeModal={() => {
          setIsCancelOpen(false);
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
