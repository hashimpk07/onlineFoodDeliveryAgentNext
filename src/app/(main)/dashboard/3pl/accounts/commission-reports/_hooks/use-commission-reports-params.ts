import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useCommissionReportParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [companyId, setCompanyId] = useQueryState(
    "company_id",
    parseAsString.withDefault(""),
  );

  const [crNumber, setCrNumber] = useQueryState(
    "cr_number",
    parseAsString.withDefault(""),
  );

  const [region, setRegion] = useQueryState(
    "region",
    parseAsString.withDefault(""),
  );

  const [paymentStatus, setPaymentStatus] = useQueryState(
    "payment_status",
    parseAsString.withDefault(""),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [per_page, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(20),
  );

  const resetFilters = useCallback(() => {
    setCompanyId(null);
    setCrNumber(null);
    setRegion(null);
    setPaymentStatus(null);
    setPage(DEFAULT_PAGE);
  }, [setCompanyId, setCrNumber, setRegion, setPaymentStatus, setPage]);

  const isAnyFilterActive = useMemo(
    () =>
      companyId !== "" ||
      crNumber !== "" ||
      region !== "" ||
      paymentStatus !== "" ||
      page !== DEFAULT_PAGE ||
      per_page !== DEFAULT_PAGE_SIZE,
    [companyId, crNumber, region, paymentStatus, page, per_page],
  );

  const filters = useMemo(
    () => ({
      company_id: companyId || undefined,
      cr_number: crNumber || undefined,
      region: region || undefined,
      payment_status: paymentStatus || undefined,
    }),
    [companyId, crNumber, region, paymentStatus],
  );

  return {
    companyId,
    crNumber,
    region,
    paymentStatus,
    page,
    pageSize: per_page,
    filters,
    setCompanyId,
    setCrNumber,
    setRegion,
    setPaymentStatus,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}
