import { useQuery } from "@tanstack/react-query";

import { getRegionsFilters } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_api/get-regions";
import { AreaFilter } from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/api";

export default function useDashboardFilter() {
  const regions = useQuery<AreaFilter[]>({
    queryKey: ["dashboard-regions"],
    queryFn: getRegionsFilters,
  });

  return {
    regions: regions.data,
  };
}
