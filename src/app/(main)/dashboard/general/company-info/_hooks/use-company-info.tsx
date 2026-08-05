import { useQuery } from "@tanstack/react-query";

import { useOrdersUrlParams } from "@/app/[locale]/(main)/dashboard/3pl/order/_hooks/use-orders-parms";
import { getCompanyInfoData } from "@/app/[locale]/(main)/dashboard/general/company-info/_api/get-company-info";

export default function useCompanyInfoList() {
  const { page, pageSize } = useOrdersUrlParams();
  const companyInfoData = useQuery({
    queryKey: ["company-info-list", page, pageSize],
    queryFn: () => getCompanyInfoData({ page, per_page: pageSize }),
  });

  return {
    data: companyInfoData.data ?? [],
    isLoading: companyInfoData.isLoading,
  };
}
