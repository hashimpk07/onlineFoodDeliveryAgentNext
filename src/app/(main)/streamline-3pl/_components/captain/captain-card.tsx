import { Local, PhoneOutgoing } from "@icon-park/react";
import { Building2, ShoppingBag, Truck } from "lucide-react";

import { use3plOrdersStreamlineParams } from "@/app/[locale]/(main)/streamline-3pl/_hooks/use-streamline-params";
import { StreamlineCaptain } from "@/app/[locale]/(main)/streamline-3pl/_lib/types";
import CopyWrapper from "@/components/map/shared/copy-wrapper";
import TimerBadge from "@/components/map/shared/timer-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

export type CaptainStatus = "Free" | "Busy" | "Offline";

const borderStyles: Record<CaptainStatus, string> = {
  Free: "border-green-500 shadow-green-100/50",
  Busy: "border-red-300 shadow-red-100/50",
  Offline: "border-red-500 shadow-red-100/50",
};

interface CaptainCardProps {
  captain: StreamlineCaptain;
  onView?: (captain: StreamlineCaptain) => void;
  onFocus?: (captain: StreamlineCaptain) => void;
}

export const CaptainCard3pl = ({
  captain,
  onView,
  onFocus,
}: CaptainCardProps) => {
  const initials = getInitials(captain.name);
  const { order } = use3plOrdersStreamlineParams();
  const showAssigned = captain.current_order.some(
    (o) => o.id === Number(order),
  );

  const regionLabel =
    captain.regions.length > 1
      ? `${captain.regions[0]} +${captain.regions.length - 1}`
      : (captain.regions[0] ?? "");

  const handleViewCaptain = (
    e: React.MouseEvent,
    captain: StreamlineCaptain,
  ) => {
    e.stopPropagation();
    onView?.(captain);
  };

  const handleFocusCaptain = (
    e: React.MouseEvent,
    captain: StreamlineCaptain,
  ) => {
    e.stopPropagation();
    onFocus?.(captain);
  };

  const status = (captain.online_state as CaptainStatus) ?? "Offline";

  return (
    <div
      className={`
       max-w-sm mx-auto p-0 bg-transparent rounded-[20px] font-sans cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/70 border-2 ${borderStyles[status] || "border-gray-200"}
      `}
      onClick={(e) => handleFocusCaptain(e, captain)}
    >
      <div className="grid grid-cols-4 gap-4 bg-white rounded-[20px] p-4 pb-0 shadow-sm">
        {/* Name Row */}
        <div className="col-span-4">
          <div className="flex items-center justify-between min-w-0">
            {/* Left Side (Avatar + Name) */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-gray-800 dark:bg-zinc-800 dark:text-gray-100">
                {initials}
              </div>

              <CopyWrapper containerClassName="flex-1 min-w-0">
                <span className="truncate text-[13px] font-bold uppercase tracking-widest dark:text-gray-100">
                  {captain.name}
                </span>
              </CopyWrapper>
            </div>

            {/* Right Side (Badge) */}
            {showAssigned && <Badge>Assigned</Badge>}
          </div>
        </div>

        {/* Phone */}
        <div className="col-span-2">
          <div className="flex items-center gap-1">
            <PhoneOutgoing className="h-5 w-5 text-green-600" />
            <CopyWrapper containerClassName="flex-1 min-w-0">
              <span className="text-[11px] font-bold tracking-widest text-gray-700 truncate dark:text-gray-300">
                {captain.phone_number}
              </span>
            </CopyWrapper>
          </div>
        </div>

        {/* Region */}
        <div className="col-span-2">
          <div className="flex items-center gap-1">
            <Local className="h-5 w-5 text-red-600" />
            <span className="text-[11px] font-bold tracking-widest uppercase text-gray-700 truncate dark:text-gray-300">
              {regionLabel}
            </span>
          </div>
        </div>

        {/* Employment Type */}
        {captain.nationality && (
          <div className="col-span-2">
            <div className="flex items-center gap-1">
              <img src="/assets/earth.png" className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[11px] truncate">
                {captain.nationality}
              </span>
            </div>
          </div>
        )}

        {/* Third Party Company */}
        <div className="col-span-2">
          <div className="flex items-center gap-1">
            <Building2 className="h-5 w-5 text-purple-600" />
            <CopyWrapper containerClassName="flex-1 min-w-0">
              <span className="text-[11px] font-bold tracking-widest uppercase text-gray-700 truncate dark:text-gray-300">
                {captain.third_party_company}
              </span>
            </CopyWrapper>
          </div>
        </div>

        <div className="col-span-2">
          {captain.current_shift_started_at && (
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold tracking-widest uppercase text-[11px] truncate">
                <TimerBadge
                  time={captain.current_shift_started_at}
                  reducing={true}
                  tooltipText="Time left for delivery"
                />
              </span>
            </div>
          )}
        </div>
        <div className="col-span-2" />

        {/* Total Orders */}
        <div className="col-span-2 mb-2">
          <div className="flex items-center gap-1">
            <Button
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation(); // ← add this
                handleViewCaptain(e, captain);
              }}
            >
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              <span className="text-xs font-semibold tracking-widest text-[11px] truncate">
                C.Orders: {captain.current_order_count}
              </span>
            </Button>
          </div>
        </div>

        {/* Assigned Orders */}
        <div className="col-span-2 mb-2">
          <div className="flex items-center gap-1">
            <Button
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation(); // ← add this
                handleViewCaptain(e, captain);
              }}
            >
              <Truck className="h-5 w-5 text-teal-500" />
              <span className="text-xs font-semibold tracking-widest text-[11px] truncate">
                A.Orders: {captain.delivered_orders_count}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
