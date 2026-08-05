import { useQueries, useQuery } from "@tanstack/react-query";

import { getAssetsByCategory } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_api/create-captain";

export function useAssetsByCategory(categoryId: string | null | undefined) {
  return useQuery({
    queryKey: ["assets", "by-category", categoryId],
    queryFn: () => getAssetsByCategory(categoryId),
    enabled: !!categoryId, // Only fetch when categoryId is truthy
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
}

// New hook for multiple categories
export function useMultipleAssetsByCategory(categoryIds: string[]) {
  return useQueries({
    queries: categoryIds.map((categoryId) => ({
      queryKey: ["assets", "by-category", categoryId],
      queryFn: () => getAssetsByCategory(categoryId),
      enabled: !!categoryId,
      staleTime: 5 * 60 * 1000,
      retry: 2,
    })),
  });
}
