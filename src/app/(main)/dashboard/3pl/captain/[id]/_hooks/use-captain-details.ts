import { useQuery } from "@tanstack/react-query";

import { getCaptainById } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_api/create-captain";
import { CaptainDetails } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/api";
import { UseCaptainDetailsOptions } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/page";

export function useCaptainDetails(
  id?: string | null,
  options?: UseCaptainDetailsOptions,
) {
  const {
    data: captainData,
    isLoading: isLoadingCaptain,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery<CaptainDetails>({
    queryKey: ["edit-captain-details", id],
    queryFn: () => getCaptainById(Number(id)),
    enabled: options?.enabled,
  });

  return {
    captainData,
    isLoadingCaptain,
    isFetching,
    isError,
    error,
    refetch,
  };
}
