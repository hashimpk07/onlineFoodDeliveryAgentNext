"use client";

import { Badge } from "@/components/ui/badge";
import { getOrderStatusColor } from "@/lib/order-status";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status?: string | null;
  statusId?: number | null;
  className?: string;
};

/**
 * Colors are keyed by status_id (mirroring App\OrderStatus::getBadgeClass()
 * on the backend) so a given status renders with the same color everywhere.
 */
export function StatusBadge({ status, statusId, className }: StatusBadgeProps) {
  if (!status) return <span>-</span>;

  const { badge } = getOrderStatusColor(statusId);

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        badge,
        className,
      )}
    >
      {status}
    </Badge>
  );
}
