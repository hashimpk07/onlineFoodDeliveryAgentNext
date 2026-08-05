"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type OrderInfoField = {
  label: string;
  value: string | null | undefined;
  isStatus?: boolean;
};

export type OrderInfoBannerProps = {
  avatar?: React.ReactNode;
  fields: OrderInfoField[];
  onClose?: () => void;
  className?: string;
  isOpen: boolean;
};

export function OrderInfoBanner({
  avatar,
  fields,
  onClose,
  className,
  isOpen,
}: OrderInfoBannerProps) {
  const handleClose = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute top-[4.5rem] left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[95vw] overflow-x-auto",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-[#192218] rounded-3xl shadow-lg">
        {/* Avatar */}
        {avatar && (
          <div className="flex-none flex items-center justify-center h-8 w-8 rounded-full overflow-hidden">
            {avatar}
          </div>
        )}

        {/* Fields */}
        <div className="flex items-center gap-x-4 flex-wrap">
          {fields.map((field, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-xs whitespace-nowrap"
            >
              <span className="text-gray-400 font-medium">{field.label}:</span>
              {field.isStatus && field.value ? (
                <Badge>{field.value}</Badge>
              ) : (
                <span className="text-white font-bold">
                  {field.value ?? "—"}
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-none ml-1 flex items-center justify-center h-6 w-6 rounded-full bg-zinc-700 hover:bg-zinc-600 text-gray-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
