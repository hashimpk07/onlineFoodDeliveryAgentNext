import { CheckCircle, ClipboardList } from "lucide-react";

import { OrdersSummaryCard } from "@/app/[locale]/(main)/dashboard/client/orders/_components/orders-cards/top-summary-card";
import { OrdersSummaryCardsProps } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";

export function OrdersSummaryCards({
  statusCard,
}: {
  statusCard: OrdersSummaryCardsProps;
}) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-[auto_auto] gap-2">
      <OrdersSummaryCard
        label="Total Orders"
        value={statusCard?.total_orders || ""}
        icon={<ClipboardList className="h-8 w-8" />}
      />

      <OrdersSummaryCard
        label="Delivered"
        value={statusCard?.delivered_orders || ""}
        icon={<CheckCircle className="h-8 w-8 text-green-600" />}
      />
    </div>
  );
}
