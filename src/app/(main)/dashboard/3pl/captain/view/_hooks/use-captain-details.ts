"use client";
import { useQuery } from "@tanstack/react-query";

import {
  BaseCaptainDetails,
  CaptainDetailStats,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_api/get-captain-base-details";
import { useCaptainDetailUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_hooks/use-captain-details-params";
import {
  CaptainDetails,
  CaptainDetailsStats,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/view/_types/api";

/* ───────────── Data fetching ───────────── */

export function useCaptainDetails() {
  const { captain_id, fromDate, toDate, filters } = useCaptainDetailUrlParams();
  const { data, isLoading, isFetching, isError, error } =
    useQuery<CaptainDetails>({
      queryKey: [
        "captain-details",
        captain_id, // IMPORTANT
      ],
      queryFn: () => BaseCaptainDetails(Number(captain_id)),
      enabled: !!captain_id, // prevents firing before ID exists
    });

  const captain_stats = useQuery<CaptainDetailsStats>({
    queryKey: [
      "captain-details-stats",
      captain_id, // IMPORTANT
      fromDate,
      toDate,
    ],
    queryFn: () =>
      CaptainDetailStats({
        captain_id: Number(captain_id),
        fromDate,
        toDate,
      }),
    enabled: !!captain_id, // prevents firing before ID exists
  });

  return {
    captain: data,
    isLoading,
    isFetching,
    isError,
    error,
    captain_stats: captain_stats.data,
    stats_loading: captain_stats.isLoading,
  };
}
