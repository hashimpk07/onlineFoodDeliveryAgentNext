import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useReconciliationParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [search, setSearch] = useQueryState(
    "invoice_number",
    parseAsString.withDefault(""),
  );

  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(""),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(""),
  );

  const [captain, setCaptain] = useQueryState(
    "captain",
    parseAsString.withDefault(""),
  );

  const [paidBy, setPaidBy] = useQueryState(
    "paid_by",
    parseAsString.withDefault(""),
  );

  const [paymentType, setPaymentType] = useQueryState(
    "payment_type",
    parseAsString.withDefault(""),
  );

  const [region, setRegion] = useQueryState(
    "region",
    parseAsString.withDefault(""),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [per_page, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(20),
  );

  const resetFilters = useCallback(() => {
    setSearch(null);
    setFromDate(null);
    setToDate(null);
    setCaptain(null);
    setPaidBy(null);
    setRegion(null);
    setPaymentType(null);
    setPage(DEFAULT_PAGE);
  }, [
    setSearch,
    setFromDate,
    setToDate,
    setCaptain,
    setPaidBy,
    setRegion,
    setPaymentType,
    setPage,
    DEFAULT_PAGE,
  ]);

  const isAnyFilterActive = useMemo(
    () =>
      search !== "" ||
      fromDate !== "" ||
      toDate !== "" ||
      captain !== "" ||
      paidBy !== "" ||
      region !== "" ||
      paymentType !== "" ||
      page !== DEFAULT_PAGE ||
      per_page !== DEFAULT_PAGE_SIZE,
    [
      search,
      fromDate,
      toDate,
      captain,
      paidBy,
      paymentType,
      region,
      page,
      per_page,
    ],
  );

  const filters = useMemo(
    () => ({
      search: search || undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      captain: captain || undefined,
      paidBy: paidBy || undefined,
      paymentType: paymentType || undefined,
      region: region || undefined,
    }),
    [search, fromDate, toDate, captain, paidBy, paymentType, region],
  );

  return {
    search,
    fromDate,
    toDate,
    captain,
    paidBy,
    paymentType,
    page,
    region,
    pageSize: per_page,
    filters,
    setSearch,
    setFromDate,
    setToDate,
    setCaptain,
    setPaidBy,
    setPaymentType,
    setRegion,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}
