import { useQuery } from "@tanstack/react-query";

import {
  getAreas,
  getAssets,
  getAutoassignPriority,
  getCommissionRules,
  getCountries,
  getEmploymentType,
  getVehicles,
  getVehicleTypes,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_api/get-dropdowns";
import { BaseSelect } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_types/api";
import {
  AreaFilter,
  Country,
  FilterVehicleType,
} from "@/app/[locale]/(main)/dashboard/3pl/captain/_types/api";
import { useUser } from "@/hooks/use-user";

export default function useCreateCaptain() {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  const countries = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const vehicle_types = useQuery<FilterVehicleType[]>({
    queryKey: ["vehicle-types"],
    queryFn: getVehicleTypes,
  });

  const areas = useQuery<AreaFilter[]>({
    queryKey: ["areas"],
    queryFn: getAreas,
  });

  const commissionRule = useQuery<BaseSelect[]>({
    queryKey: ["commission-rules"],
    queryFn: getCommissionRules,
  });

  const autoAssignPriority = useQuery<BaseSelect[]>({
    queryKey: ["autoassign-priority"],
    queryFn: getAutoassignPriority,
  });

  const assets = useQuery<BaseSelect[]>({
    queryKey: ["assets"],
    queryFn: getAssets,
  });

  const vehicles = useQuery({
    queryKey: ["vehicles", companyId],
    queryFn: () => getVehicles(companyId),
    enabled: !!companyId, // 👈 prevents firing with undefined
  });

  const employementType = useQuery({
    queryKey: ["employement-type"],
    queryFn: getEmploymentType,
  });

  return {
    countries: countries.data,
    vehicleTypes: vehicle_types.data,
    areas: areas.data,
    commissionRule: commissionRule.data,
    autoAssignPriority: autoAssignPriority.data,
    assets: assets.data,
    vehicles: vehicles.data,
    employementType: employementType.data,
  };
}
