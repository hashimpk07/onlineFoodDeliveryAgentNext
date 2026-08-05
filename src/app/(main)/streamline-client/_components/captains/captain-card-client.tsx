import { MapPin, Phone } from "lucide-react";

import { useOrdersStreamlineParams } from "@/app/[locale]/(main)/streamline-client/_hooks/use-streamline-params";
import { StreamlineCaptain } from "@/app/[locale]/(main)/streamline-client/_lib/types";
import CopyWrapper from "@/components/map/shared/copy-wrapper";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";

export type CaptainStatus = "Free" | "Busy" | "Offline";

const avatarStyles: Record<CaptainStatus, string> = {
  Free: "bg-teal-100 text-teal-700",
  Busy: "bg-rose-100 text-rose-700",
  Offline: "bg-slate-100 text-slate-500",
};

const borderStyles: Record<CaptainStatus, string> = {
  Free: "border-teal-400 shadow-teal-100/50",
  Busy: "border-rose-400 shadow-rose-100/50",
  Offline: "border-slate-300 shadow-slate-100/50",
};

interface CaptainCardProps {
  captain: StreamlineCaptain;
  onView?: (captain: StreamlineCaptain) => void;
}

export const CaptainCardClient = ({ captain, onView }: CaptainCardProps) => {
  const initials = getInitials(captain.name);
  const { order } = useOrdersStreamlineParams();

  const showAssigned = captain.current_order?.some(
    (o: any) => o.id === Number(order),
  );

  const regionLabel =
    captain.regions.length > 1
      ? `${captain.regions[0]} +${captain.regions.length - 1}`
      : (captain.regions[0] ?? "");

  const status = (captain.online_state as CaptainStatus) ?? "Offline";

  return (
    <div
      className={`bg-white border-2 rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/70 max-w-sm mx-auto dark:bg-zinc-900 ${borderStyles[status]}`}
      onClick={() => onView?.(captain)}
    >
      <div className="px-[18px] py-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className={`w-[52px] h-[52px] rounded-2xl flex-shrink-0 flex items-center justify-center text-[15px] font-bold dark:text-white dark:bg-zinc-600 tracking-wide ${avatarStyles[status]}`}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <CopyWrapper containerClassName="w-full">
              <p className="text-[14px] font-bold text-gray-900 truncate dark:text-white">
                {captain.name}
              </p>
            </CopyWrapper>
            {/* <p className="text-[12px] text-gray-400 mt-0.5 truncate">
              {captain.role ?? "Captain"} · {captain.location ?? ""}
            </p> */}
          </div>

          {showAssigned ? (
            <Badge className="bg-emerald-50 text-amber-700 border border-amber-200 text-[11px] font-bold rounded-full px-2.5 py-0.5 shrink-0">
              Assigned
            </Badge>
          ) : (
            <div
              className={`w-3 h-3 rounded-full shrink-0 ${
                status === "Free"
                  ? "bg-emerald-400"
                  : status === "Busy"
                    ? "bg-red-400"
                    : "bg-slate-300"
              }`}
            />
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Footer pills */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-2.5 py-1.5 flex-1 min-w-0 dark:bg-zinc-600">
            <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <CopyWrapper containerClassName="flex-1 min-w-0">
              <span className="text-[12px] font-bold text-gray-700 truncate dark:text-white">
                {captain.phone_number}
              </span>
            </CopyWrapper>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-2.5 py-1.5 flex-1 min-w-0 dark:bg-zinc-600">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="text-[12px] font-bold text-gray-700 truncate dark:text-white">
              {regionLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
