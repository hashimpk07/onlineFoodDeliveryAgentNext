import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getCaptainCommissionApi } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/_api/captain-commission";
import { useCaptainCommissionParams } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/_hooks/use-captain-commission-params";
import { CaptainCommissionResponse } from "@/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/_types/captain-commission-type";

export function useCaptainCommissionList() {
  const { filters, page, pageSize } = useCaptainCommissionParams();

  const commissionQuery = useQuery<CaptainCommissionResponse["data"]>({
    queryKey: ["captain-commission", filters, page, pageSize],
    queryFn: async ({ queryKey }) => {
      const [_key, _filters, _page, _pageSize] = queryKey as [
        string,
        any,
        number,
        number,
      ];
      const res = await getCaptainCommissionApi({
        employee_id: _filters.employee,
        captain: _filters.captain,
        name: _filters.name,
        iqama: _filters.iqama,
        onDutyFrom: _filters.onDutyFrom,
        region: _filters.region,
        area: _filters.area,
        nationality: _filters.nationality,
        workStatus: _filters.workStatus,
        paymentStatus: _filters.paymentStatus,
        page: _page,
        pageSize: _pageSize,
      });
      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data;
    },
  });

  return {
    capatian_commission: commissionQuery.data?.capatian_commission ?? [],
    pagination: commissionQuery.data?.pagination ?? null,
    counts: commissionQuery.data?.counts ?? null,
    isLoading: commissionQuery.isFetching || commissionQuery.isLoading,
    loading: commissionQuery.isLoading || commissionQuery.isFetching,
    isRefetching: commissionQuery.isRefetching,
    page,
    pageSize,
    refetch: commissionQuery.refetch,
  };
}
