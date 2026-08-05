import { useQuery } from "@tanstack/react-query";

import {
  getAreasFilters,
  getCaptainCountries,
  getCaptainFilters,
  getCaptainVehicleTypes,
  getRegionsFilters,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_api/get-filters";
import {
  AreaFilter,
  Country,
  FilterCaptain,
  FilterVehicleType,
  RegionsFilter,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { useUser } from "@/hooks/use-user";

export default function useCaptainFilters() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const filter_countries = useQuery<Country[]>({
    queryKey: ["captain-countries"],
    queryFn: getCaptainCountries,
  });

  const filter_captains = useQuery({
    queryKey: ["filter-captains", companyId],
    queryFn: () => getCaptainFilters(companyId),
    enabled: !!companyId, // 👈 prevents firing with undefined
  });

  const filter_vehicle_types = useQuery<FilterVehicleType[]>({
    queryKey: ["filter-vehicle-types"],
    queryFn: getCaptainVehicleTypes,
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
    filter_countries: filter_countries.data ?? [],
    filter_captains: filter_captains.data ?? [],
    filter_vehicle_types: filter_vehicle_types.data ?? [],
    filter_areas: filter_areas.data ?? [],
    filter_regions: filter_regions.data ?? [],
  };
}
