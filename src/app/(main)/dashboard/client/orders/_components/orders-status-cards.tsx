"use client";

import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/client/orders/_hooks/use-orders-params";
import { OrdersSummaryCardsProps } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { Skeleton } from "@/components/ui/skeleton";

import { OrdersCard } from "./orders-cards/orders-cards";

function StatusCardSkeleton() {
  return (
    <div className="h-[72px] rounded-lg border border-border p-3">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-8" />
      </div>
    </div>
  );
}

export function OrdersStatusCards({
  statusCard,
  isLoading = false,
}: {
  statusCard?: OrdersSummaryCardsProps;
  isLoading?: boolean;
}) {
  const { status, setStatus } = useOrdersUrlParams();

  const isSameStatus = (values: string[]) =>
    values.length === status.length &&
    values.every((value) => status.includes(value));

  if (isLoading) {
    return (
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {Array.from({ length: 8 }, (_, i) => (
          <StatusCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  if (!statusCard) {
    return null;
  }

  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      <OrdersCard
        variant="all"
        title="All"
        value={statusCard.total_orders}
        isSelected={isSameStatus([])}
        onClick={() => setStatus([])}
      />
      <OrdersCard
        variant="new"
        title="New Orders"
        value={statusCard.new_orders_count}
        isSelected={isSameStatus(["1"])}
        onClick={() => setStatus(["1"])}
      />
      <OrdersCard
        variant="ongoing"
        title="On Going "
        value={statusCard.on_going_orders_count}
        isSelected={isSameStatus(["3", "4", "5", "6", "7", "8", "9", "22"])}
        onClick={() => setStatus(["3", "4", "5", "6", "7", "8", "9", "22"])}
      />
      <OrdersCard
        variant="tickets"
        title="Tickets"
        value={statusCard.ticket_raised_orders_count}
        isSelected={isSameStatus(["21"])}
        onClick={() => setStatus(["21"])}
      />
      <OrdersCard
        variant="pending"
        title="Pending"
        value={statusCard.pending_orders_count}
        isSelected={isSameStatus(["18"])}
        onClick={() => setStatus(["18"])}
      />

      <OrdersCard
        variant="return-acceptance"
        title="Return Acceptance"
        value={statusCard.client_return_orders_count}
        isSelected={isSameStatus(["14", "16", "25"])}
        onClick={() => setStatus(["14", "16", "25"])}
      />
      <OrdersCard
        variant="cancellation"
        title="Cancellation"
        value={statusCard.client_cancel_orders_count}
        isSelected={isSameStatus(["19", "12", "11"])}
        onClick={() => {
          setStatus(["19", "12", "11"]);
        }}
      />
      <OrdersCard
        variant="delivered"
        title="Delivered"
        value={statusCard.delivered_orders}
        isSelected={isSameStatus(["10"])}
        onClick={() => setStatus(["10"])}
      />
    </div>
  );
}
