import { useQuery } from "@tanstack/react-query";

import {
  AreaFilter,
  RegionsFilter,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import {
  getAreasFilters,
  getCaptainFilters,
  getRegionsFilters,
} from "@/app/[locale]/(main)/dashboard/3pl/reports/working-days/_api/get-filters";
import { useUser } from "@/hooks/use-user";

export default function useWorkingDaysFilters() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const filter_captains = useQuery({
    queryKey: ["filter-captains", companyId],
    queryFn: () => getCaptainFilters(companyId),
    enabled: !!companyId, // prevents firing with undefined
  });

  const filter_areas = useQuery<AreaFilter[]>({
    queryKey: ["filter-areas"],
    queryFn: getAreasFilters,
  });

  const filter_regions = useQuery<RegionsFilter[]>({
    queryKey: ["filter-regions"],
    queryFn: getRegionsFilters,
  });

  return {
    filter_captains: filter_captains.data ?? [],
    filter_areas: filter_areas.data ?? [],
    filter_regions: filter_regions.data ?? [],
  };
}
