"use client";

import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isValid,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { enGB as enGBFns, enUS as enUSFns } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { enGB, enUS } from "react-day-picker/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  label?: string;
  from?: Date | string | null;
  to?: Date | string | null;
  onChange?: (from: Date | null, to: Date | null) => void;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  yearRange?: number;
  className?: string;
  showPresets?: boolean;
  align?: "start" | "center" | "end";
  locale?: "en-US" | "en-GB";
}

const FNS_LOCALES = { "en-US": enUSFns, "en-GB": enGBFns };
const CALENDAR_LOCALES = { "en-US": enUS, "en-GB": enGB };

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

const PRESETS: { label: string; getRange: () => DateRange }[] = [
  { label: "Today", getRange: () => ({ from: today(), to: today() }) },
  {
    label: "Yesterday",
    getRange: () => {
      const d = subDays(today(), 1);
      return { from: d, to: d };
    },
  },
  {
    label: "Last 7 Days",
    getRange: () => ({ from: subDays(today(), 6), to: today() }),
  },
  {
    label: "Last 14 Days",
    getRange: () => ({ from: subDays(today(), 13), to: today() }),
  },
  {
    label: "Last 30 Days",
    getRange: () => ({ from: subDays(today(), 29), to: today() }),
  },
  {
    label: "This Week",
    getRange: () => ({
      from: startOfWeek(today()),
      to: endOfWeek(today()),
    }),
  },
  {
    label: "This Month",
    getRange: () => ({
      from: startOfMonth(today()),
      to: endOfMonth(today()),
    }),
  },
  {
    label: "Last Month",
    getRange: () => {
      const lastMonth = subMonths(today(), 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    },
  },
  {
    label: "This Year",
    getRange: () => ({ from: startOfYear(today()), to: endOfYear(today()) }),
  },
  {
    label: "Last Year",
    getRange: () => {
      const lastYear = subYears(today(), 1);
      return { from: startOfYear(lastYear), to: endOfYear(lastYear) };
    },
  },
];

function parseDate(d: Date | string | null | undefined): Date | null {
  if (!d) return null;
  if (d instanceof Date) return isValid(d) ? d : null;
  const parsed = parseISO(d);
  return isValid(parsed) ? parsed : null;
}

export function DateRangePicker({
  label,
  from,
  to,
  onChange,
  disableFutureDates,
  disablePastDates,
  yearRange = 0,
  className,
  showPresets = true,
  align = "start",
  locale = "en-US",
}: DateRangePickerProps) {
  const fromDate = React.useMemo(() => parseDate(from), [from]);
  const toDate = React.useMemo(() => parseDate(to), [to]);
  const dateFnsLocale = FNS_LOCALES[locale];
  const calendarLocale = CALENDAR_LOCALES[locale];

  const [isOpen, setIsOpen] = React.useState(false);

  const currentYear = new Date().getFullYear();

  const startMonth = React.useMemo(() => {
    if (disablePastDates) return new Date();
    const start = yearRange ? currentYear - yearRange : 2000;
    return new Date(start, 0, 1);
  }, [disablePastDates, yearRange, currentYear]);

  const endMonth = React.useMemo(() => {
    if (disableFutureDates) return new Date();
    const end = yearRange ? currentYear + yearRange : currentYear + 10;
    return new Date(end, 11, 31);
  }, [disableFutureDates, yearRange, currentYear]);

  const computedDisabled = React.useMemo(() => {
    const cutoff = today();
    if (disableFutureDates && disablePastDates) {
      return (day: Date) => {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        return d.getTime() !== cutoff.getTime();
      };
    }
    if (disableFutureDates) {
      return (day: Date) => {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        return d > cutoff;
      };
    }
    if (disablePastDates) {
      return (day: Date) => {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        return d < cutoff;
      };
    }
    return undefined;
  }, [disableFutureDates, disablePastDates]);

  const range: DateRange | undefined =
    fromDate || toDate
      ? { from: fromDate ?? undefined, to: toDate ?? undefined }
      : undefined;

  const handleSelect = (selected: DateRange | undefined) => {
    onChange?.(selected?.from ?? null, selected?.to ?? null);
    if (selected?.from && selected?.to) setIsOpen(false);
  };

  const applyPreset = (getRange: () => DateRange) => {
    const preset = getRange();
    onChange?.(preset.from ?? null, preset.to ?? null);
    setIsOpen(false);
  };

  const displayText = React.useMemo(() => {
    if (fromDate && toDate)
      return `${format(fromDate, "MMM d, yyyy", { locale: dateFnsLocale })} - ${format(toDate, "MMM d, yyyy", { locale: dateFnsLocale })}`;
    if (fromDate)
      return `${format(fromDate, "MMM d, yyyy", { locale: dateFnsLocale })} -`;
    return "Select date range";
  }, [fromDate, toDate, dateFnsLocale]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !range && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <div className="flex flex-col sm:flex-row">
            {showPresets && (
              <div className="flex flex-col gap-1 border-b p-2 sm:border-b-0 sm:border-r sm:p-3">
                {PRESETS.map((preset) => (
                  <Button
                    key={preset.label}
                    size="sm"
                    variant="ghost"
                    className="justify-start px-2 text-xs font-medium"
                    onClick={() => applyPreset(preset.getRange)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            )}
            <Calendar
              mode="range"
              selected={range}
              defaultMonth={fromDate ?? new Date()}
              onSelect={handleSelect}
              numberOfMonths={2}
              captionLayout="dropdown"
              startMonth={startMonth}
              endMonth={endMonth}
              disabled={computedDisabled}
              locale={calendarLocale}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
