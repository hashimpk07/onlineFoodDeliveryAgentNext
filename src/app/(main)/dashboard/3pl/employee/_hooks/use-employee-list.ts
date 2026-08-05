"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getEmployeesApi } from "../_api/employee";

import { useEmployeeParams } from "./use-employee-params";

import type { EmployeeListResponse } from "../_types/employee-type";

export function useEmployeeLists() {
  const { filters, page, pageSize, setPage, setPageSize } = useEmployeeParams();

  const orderQuery = useQuery<EmployeeListResponse["data"]>({
    queryKey: ["employees", filters, page, pageSize],
    queryFn: async () => {
      const res = await getEmployeesApi({
        search: filters.search,
        page,
        per_page: pageSize,
      });
      if (res.status === "error") {
        throw new Error(res.message);
      }

      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return {
    order: orderQuery.data?.order ?? [],
    pagination: orderQuery.data?.pagination ?? null,
    isLoading: orderQuery.isFetching || orderQuery.isLoading,
    loading: orderQuery.isLoading || orderQuery.isFetching,
    page,
    pageSize,
    setPage,
    setPageSize,
  };
}
