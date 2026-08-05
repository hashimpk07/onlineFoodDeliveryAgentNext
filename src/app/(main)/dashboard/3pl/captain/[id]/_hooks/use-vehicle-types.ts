import { useQuery } from "@tanstack/react-query";

import { getVehicles } from "@/app/[locale]/(main)/dashboard/3pl/captain/[id]/_api/get-dropdowns";
import { useUser } from "@/hooks/use-user";

interface UseVehicleListProps {
  vehicle_type: string | null | undefined;
  isEdit: boolean;
}

export function useVehicleList({ vehicle_type, isEdit }: UseVehicleListProps) {
  const { user } = useUser();
  const companyId = user?.third_party_logistic_company_id;

  return useQuery({
    queryKey: ["vehicles", "by-vehicle-type", companyId, vehicle_type, isEdit],
    queryFn: async () => {
      // Return empty array if no vehicle type selected
      if (!vehicle_type || vehicle_type === "") {
        return [];
      }

      // Return empty array if no company ID
      if (!companyId) {
        return [];
      }

      // Fetch vehicles for the selected type
      return getVehicles(companyId, Number(vehicle_type), isEdit);
    },
    enabled: Boolean(vehicle_type && vehicle_type !== "" && companyId),
    retry: 2,
  });
}
