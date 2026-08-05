"use client";

import { format, isValid, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DayPickerProps } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  date?: Date | string | null;
  onChange?: (date: Date | null) => void;
  disabled?: DayPickerProps["disabled"];
  preventOpen?: boolean;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  yearRange?: number;
}

export function DatePicker({
  label,
  placeholder,
  date,
  onChange,
  disabled,
  preventOpen,
  disableFutureDates,
  disablePastDates,
  yearRange = 0,
}: DatePickerProps) {
  const normalizedDate = React.useMemo<Date | null>(() => {
    if (!date) return null;
    if (date instanceof Date) return isValid(date) ? date : null;
    const parsed = parseISO(date);
    return isValid(parsed) ? parsed : null;
  }, [date]);

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

  const computedDisabled = React.useMemo<DayPickerProps["disabled"]>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (disableFutureDates && disablePastDates) {
      return (day: Date) => {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        return d.getTime() !== today.getTime();
      };
    }
    if (disableFutureDates) {
      return (day: Date) => {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        return d > today;
      };
    }
    if (disablePastDates) {
      return (day: Date) => {
        const d = new Date(day);
        d.setHours(0, 0, 0, 0);
        return d < today;
      };
    }
    return disabled;
  }, [disableFutureDates, disablePastDates, disabled]);

  const handleDateSelect = (selected?: Date) => {
    onChange?.(selected ?? null);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm leading-none font-medium text-muted-foreground">
          {label}
        </label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild disabled={preventOpen}>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !normalizedDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {normalizedDate
              ? format(normalizedDate, "yyyy-MM-dd")
              : (placeholder ?? label ?? "Select date")}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={normalizedDate ?? undefined}
            defaultMonth={normalizedDate ?? new Date()}
            onSelect={handleDateSelect}
            captionLayout="dropdown"
            startMonth={startMonth}
            endMonth={endMonth}
            disabled={computedDisabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
