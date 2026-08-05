/* eslint-disable complexity */
import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useCaptainCommissionParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [employee, setEmployee] = useQueryState(
    "employee_id",
    parseAsString.withDefault(""),
  );

  const [captain, setCaptain] = useQueryState(
    "captain",
    parseAsString.withDefault(""),
  );

  const [name, setName] = useQueryState("name", parseAsString.withDefault(""));
  const [iqama, setIqama] = useQueryState(
    "iqama",
    parseAsString.withDefault(""),
  );
  const [onDutyFrom, setOnDutyFrom] = useQueryState(
    "on_duty_from",
    parseAsString.withDefault(""),
  );

  const [region, setRegion] = useQueryState(
    "region",
    parseAsString.withDefault(""),
  );

  const [area, setArea] = useQueryState("area", parseAsString.withDefault(""));

  const [country, setCountry] = useQueryState(
    "nationality",
    parseAsString.withDefault(""),
  );

  const [workStatus, setWorkStatus] = useQueryState(
    "work_status",
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
    setEmployee(null);
    setCaptain(null);
    setName(null);
    setIqama(null);
    setArea(null);
    setRegion(null);
    setCountry(null);
    setWorkStatus(null);
    setPaymentStatus(null);
    setOnDutyFrom(null);
    setPage(DEFAULT_PAGE);
  }, [
    setEmployee,
    setCaptain,
    setIqama,
    setName,
    setOnDutyFrom,
    setArea,
    setRegion,
    setCountry,
    setWorkStatus,
    setPaymentStatus,
    setPage,
    DEFAULT_PAGE,
  ]);

  const isAnyFilterActive = useMemo(
    () =>
      employee !== "" ||
      captain !== "" ||
      name !== "" ||
      iqama !== "" ||
      onDutyFrom !== "" ||
      region !== "" ||
      area !== "" ||
      country !== "" ||
      workStatus !== "" ||
      paymentStatus !== "" ||
      page !== DEFAULT_PAGE ||
      per_page !== DEFAULT_PAGE_SIZE,
    [
      employee,
      captain,
      name,
      iqama,
      onDutyFrom,
      region,
      area,
      country,
      workStatus,
      paymentStatus,
      page,
      per_page,
    ],
  );

  const filters = useMemo(
    () => ({
      employee: employee || undefined,
      captain: captain || undefined,
      name: name || undefined,
      iqama: iqama || undefined,
      onDutyFrom: onDutyFrom || undefined,
      region: region || undefined,
      area: area || undefined,
      nationality: country || undefined,
      workStatus: workStatus || undefined,
      paymentStatus: paymentStatus || undefined,
    }),
    [
      employee,
      captain,
      name,
      iqama,
      onDutyFrom,
      region,
      area,
      country,
      workStatus,
      paymentStatus,
    ],
  );

  return {
    employee,
    captain,
    name,
    iqama,
    onDutyFrom,
    region,
    area,
    nationality: country,
    workStatus,
    paymentStatus,
    page,
    pageSize: per_page,
    filters,
    setEmployee,
    setCaptain,
    setName,
    setIqama,
    setOnDutyFrom,
    setRegion,
    setArea,
    setNationality: setCountry,
    setWorkStatus,
    setPaymentStatus,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}
