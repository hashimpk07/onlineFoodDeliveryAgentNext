"use client";
import { useQuery } from "@tanstack/react-query";

import { CaptainShiftLogs } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_api/get-captain-logs";
import { useCaptainDetailUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details-params";
import { CaptainShiftHistoryResponse } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";

/* ───────────── Data fetching ───────────── */

export function useCaptainLogs() {
  const {
    captain_id,
    shiftPageSize,
    shift_page,
    setShiftPage,
    setShiftPageSize,
  } = useCaptainDetailUrlParams();

  const { data, isLoading, isFetching, isError, error } =
    useQuery<CaptainShiftHistoryResponse>({
      queryKey: ["captain-shift-logs", captain_id, shift_page, shiftPageSize],
      queryFn: () =>
        CaptainShiftLogs({
          captain_id: Number(captain_id),
          shift_page: shift_page,
          shift_page_size: shiftPageSize,
        }),
      enabled: !!captain_id,
    });

  return {
    shifts: data?.shifts,
    pagination: data?.pagination,
    shiftPageSize,
    shift_page,
    isLoading,
    isFetching,
    isError,
    error,

    // ADD THESE SETTERS
    setShiftPage,
    setShiftPageSize,
  };
}
