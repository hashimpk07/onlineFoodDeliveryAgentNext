import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useCaptainCommissionDetailsParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [fromDate, setFromDate] = useQueryState(
    "from_date",
    parseAsString.withDefault(""),
  );

  const [toDate, setToDate] = useQueryState(
    "to_date",
    parseAsString.withDefault(""),
  );

  const [paymentStatus, setPaymentStatus] = useQueryState(
    "payment_status",
    parseAsString.withDefault(""),
  );

  const [captain, setCaptain] = useQueryState(
    "captain",
    parseAsString.withDefault(""),
  );

  const [vehicleType, setVehicleType] = useQueryState(
    "vehicle_type",
    parseAsString.withDefault(""),
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(""),
  );
  const [removed_zero_captain, setRemovedZeroCaptain] = useQueryState(
    "removed_zero_captain",
    parseAsInteger.withDefault(1),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [per_page, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(10),
  );

  const resetFilters = useCallback(() => {
    setFromDate(null);
    setToDate(null);
    setPaymentStatus(null);
    setCaptain(null);
    setVehicleType(null);
    setStatus(null);
    setRemovedZeroCaptain(1);
    setPage(DEFAULT_PAGE);
  }, [
    setFromDate,
    setToDate,
    setPaymentStatus,
    setCaptain,
    setPage,
    setVehicleType,
    setStatus,
    setRemovedZeroCaptain,
    DEFAULT_PAGE,
  ]);

  const isAnyFilterActive = useMemo(
    () =>
      fromDate !== "" ||
      toDate !== "" ||
      paymentStatus !== "" ||
      captain !== "" ||
      vehicleType !== "" ||
      status !== "" ||
      removed_zero_captain !== 1 ||
      page !== DEFAULT_PAGE ||
      per_page !== DEFAULT_PAGE_SIZE,
    [
      fromDate,
      toDate,
      paymentStatus,
      captain,
      vehicleType,
      status,
      removed_zero_captain,
      page,
      per_page,
    ],
  );

  const filters = useMemo(
    () => ({
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      paymentStatus: paymentStatus || undefined,
      captain: captain || undefined,
      vehicleType: vehicleType || undefined,
      status: status || undefined,
      removed_zero_captain: removed_zero_captain ?? undefined,
    }),
    [
      fromDate,
      toDate,
      paymentStatus,
      captain,
      vehicleType,
      status,
      removed_zero_captain,
    ],
  );

  return {
    fromDate,
    toDate,
    paymentStatus,
    captain,
    vehicleType,
    status,
    removed_zero_captain,
    page,
    pageSize: per_page,
    filters,
    setFromDate,
    setToDate,
    setPaymentStatus,
    setCaptain,
    setVehicleType,
    setStatus,
    setRemovedZeroCaptain,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}
