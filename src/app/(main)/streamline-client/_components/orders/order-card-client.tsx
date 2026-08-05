/* eslint-disable */

import { use3plOrdersStreamlineParams } from "@/app/[locale]/(main)/streamline-3pl/_hooks/use-streamline-params";
import { useCountdownTimer } from "@/app/[locale]/(main)/streamline-client/_hooks/use-count-down-timer";
import { OrderListItem } from "@/app/[locale]/(main)/streamline-client/_lib/types";
import CopyWrapper from "@/components/map/shared/copy-wrapper";
import TimerBadge from "@/components/map/shared/timer-badge";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { Eye, MessageCircleMore } from "lucide-react";

interface OrderCardProps {
  order: OrderListItem;
  onView?: (id: string) => void;
  onFocus?: (id: string) => void;
  onChat?: (id: string) => void;
  showChat?: boolean;
  showView?: boolean;
}

export const OrderCardClient = ({
  order,
  onView,
  onFocus,
  onChat,
  showChat = true,
  showView = true,
}: OrderCardProps) => {
  const initials = getInitials(order.client_name ?? null);
  const { elapsed, totalSecondsDelayed, progressPercent } = useCountdownTimer({
    time: order.time_left,
  });
  const { order: activeOrder } = use3plOrdersStreamlineParams();

  const isWarning = progressPercent >= 75;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-l-[5px]
    ${isWarning || elapsed ? "border-l-red-500" : "border-l-green-500"}
    ${elapsed ? "animate-blink-fast" : isWarning ? "animate-blink-slow" : ""}
    ${
      activeOrder === order.id.toString()
        ? "bg-sky-50 dark:bg-sky-900/30"
        : "bg-[#ffffff] dark:bg-zinc-900/80"
    }
    p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-white/5
    ${
      isWarning || elapsed
        ? "dark:hover:border-red-900"
        : "dark:hover:border-green-900"
    }
    cursor-pointer`}
      onClick={() => onFocus?.(order.id.toString() ?? "")}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-gray-800 dark:bg-zinc-800 dark:text-gray-100">
            {initials}
          </div>
          <CopyWrapper>
            <span className="truncate text-[12px] font-bold uppercase tracking-widest dark:text-gray-100">
              {order.client_name}
            </span>
          </CopyWrapper>
        </div>
        <TimerBadge
          time={order.time_left}
          reducing={true}
          tooltipText="Time left for delivery"
        />
      </div>
      <hr className="mt-2"></hr>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-3">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
            Store Name
          </span>
          <CopyWrapper className="w-full">
            <span className="text-[13px] font-bold text-foreground truncate block">
              {order.shop_name}
            </span>
          </CopyWrapper>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
            Order ID
          </span>
          <CopyWrapper className="w-full">
            <span className="text-[13px] font-bold text-foreground truncate block">
              {order.client_order_id}
            </span>
          </CopyWrapper>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
            Region
          </span>
          <CopyWrapper className="w-full">
            <span className="text-[13px] font-semibold text-foreground/90 truncate block">
              {order.shop_region || "N/A"}
            </span>
          </CopyWrapper>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
            Zone
          </span>
          <CopyWrapper className="w-full">
            <span className="text-[13px] font-semibold text-foreground/90 truncate block">
              {order.shop_area || "N/A"}
            </span>
          </CopyWrapper>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
            Date & Time
          </span>
          <span className="text-[12px] font-medium text-foreground/80 truncate">
            {order.created_formatted_at}
          </span>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">
            Status
          </span>
          <span className="text-[12px] font-bold text-sky-600 dark:text-sky-400 truncate">
            {order.status}
          </span>
        </div>
      </div>

      {/* Footer / Actions */}
      {(showChat || showView) && (
        <div className="flex items-center justify-end gap-1 border-t border-gray-100 pt-2 dark:border-zinc-800">
          {showChat && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-foreground bg-neutral-300 dark:bg-zinc-700 hover:text-gray-900 dark:hover:text-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                onChat?.(order.id.toString());
              }}
              title="Chat"
            >
              <MessageCircleMore size={14} />
            </Button>
          )}

          {showView && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-foreground bg-neutral-300 dark:bg-zinc-700 hover:text-gray-900 dark:hover:text-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                onView?.(order.id.toString());
              }}
              title="View Details"
            >
              <Eye size={14} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
