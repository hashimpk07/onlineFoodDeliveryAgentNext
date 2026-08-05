"use client";

import { Button } from "@/components/ui/button";
import { toApiDate } from "@/lib/date";
import { cn } from "@/lib/utils";

export type QuickPreset =
  "today" | "yesterday" | "last7days" | "last30days" | "thisMonth";

interface QuickDateSelectProps {
  readonly fromDate: string | null;
  readonly toDate: string | null;
  readonly setFromDate: (date: string | null) => void;
  readonly setToDate: (date: string | null) => void;
  readonly className?: string;
}

export function QuickDateSelect({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  className,
}: QuickDateSelectProps) {
  const isPresetActive = (preset: QuickPreset) => {
    const today = new Date();
    const from = new Date();
    const to = new Date();

    switch (preset) {
      case "today":
        break;
      case "yesterday":
        from.setDate(today.getDate() - 1);
        to.setDate(today.getDate() - 1);
        break;
      case "last7days":
        from.setDate(today.getDate() - 7);
        break;
      case "last30days":
        from.setDate(today.getDate() - 30);
        break;
      case "thisMonth":
        from.setDate(1);
        break;
    }

    return fromDate === toApiDate(from) && toDate === toApiDate(to);
  };

  const applyPreset = (preset: QuickPreset) => {
    const today = new Date();
    const from = new Date();
    const to = new Date();

    switch (preset) {
      case "today":
        break;
      case "yesterday":
        from.setDate(today.getDate() - 1);
        to.setDate(today.getDate() - 1);
        break;
      case "last7days":
        from.setDate(today.getDate() - 7);
        break;
      case "last30days":
        from.setDate(today.getDate() - 30);
        break;
      case "thisMonth":
        from.setDate(1);
        break;
    }

    setFromDate(toApiDate(from));
    setToDate(toApiDate(to));
  };

  const getButtonClass = (preset: QuickPreset) => {
    const active = isPresetActive(preset);
    return cn(
      "h-8 rounded-full px-4 text-xs transition-colors font-medium",
      "dark:border dark:border-dotted dark:border-white",
      active
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-black text-white hover:bg-black/80",
    );
  };

  const presets: { label: string; value: QuickPreset }[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last 30 Days", value: "last30days" },
    { label: "This Month", value: "thisMonth" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-4 pt-4 border-t mt-4 items-center sm:items-start",
        className,
      )}
    >
      <span className="text-sm font-medium text-foreground py-1.5 min-w-[90px]">
        Quick Select
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.value}
            variant="default"
            size="sm"
            onClick={() => applyPreset(preset.value)}
            className={getButtonClass(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
