import { useCallback, useMemo } from "react";

import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

const toISO = (d: Date) => d.toISOString().slice(0, 10);

const getDefaultDates = () => {
  const today = new Date();

  const from = new Date();
  from.setDate(today.getDate() - 6);

  const to = new Date();
  to.setDate(today.getDate() + 1);

  return {
    fromDate: toISO(from),
    toDate: toISO(to),
  };
};

/** Default filters mirroring what useOrderReportsUrlParams returns on first load.
 *  Safe to call outside hooks — no React state involved. */
export function getOrderReportDefaultFilters() {
  const { fromDate, toDate } = getDefaultDates();
  return {
    // These match the filters memo in useOrderReportsUrlParams:
    // empty/default optional params are omitted, just like the hook does.
    from_date: fromDate,
    to_date: toDate,
  } as const;
}

export function useOrderReportsUrlParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const defaults = getDefaultDates();

  const [clientOrder, setClientOrderRaw] = useQueryState(
    "client_order_id",
    parseAsString.withDefault(""),
  );

  const [fromDate, setFromDateRaw] = useQueryState(
    "from_date",
    parseAsString.withDefault(defaults.fromDate),
  );

  const [toDate, setToDateRaw] = useQueryState(
    "to_date",
    parseAsString.withDefault(defaults.toDate),
  );

  const [timeFrom, setTimeFromRaw] = useQueryState(
    "order_time_from",
    parseAsString.withDefault(""),
  );

  const [timeTo, setTimeToRaw] = useQueryState(
    "order_time_to",
    parseAsString.withDefault(""),
  );

  const [captain, setCaptainRaw] = useQueryState(
    "captain",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [status, setStatusRaw] = useQueryState(
    "status_id",
    parseAsString.withDefault(""),
  );

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(DEFAULT_PAGE),
  );

  const [pageSize, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );

  const setClientOrder = useCallback(
    (v: string) => {
      setPage(DEFAULT_PAGE);
      setClientOrderRaw(v);
    },
    [setPage, setClientOrderRaw],
  );

  const setFromDate = useCallback(
    (v: string) => {
      setPage(DEFAULT_PAGE);
      setFromDateRaw(v);
    },
    [setPage, setFromDateRaw],
  );

  const setToDate = useCallback(
    (v: string) => {
      setPage(DEFAULT_PAGE);
      setToDateRaw(v);
    },
    [setPage, setToDateRaw],
  );

  const setTimeFrom = useCallback(
    (v: string) => {
      setPage(DEFAULT_PAGE);
      setTimeFromRaw(v);
    },
    [setPage, setTimeFromRaw],
  );

  const setTimeTo = useCallback(
    (v: string) => {
      setPage(DEFAULT_PAGE);
      setTimeToRaw(v);
    },
    [setPage, setTimeToRaw],
  );

  const setCaptain = useCallback(
    (v: string[]) => {
      setPage(DEFAULT_PAGE);
      setCaptainRaw(v);
    },
    [setPage, setCaptainRaw],
  );

  const setStatus = useCallback(
    (v: string) => {
      setPage(DEFAULT_PAGE);
      setStatusRaw(v);
    },
    [setPage, setStatusRaw],
  );

  const resetFilters = useCallback(() => {
    setClientOrderRaw("");
    setFromDateRaw(defaults.fromDate);
    setToDateRaw(defaults.toDate);
    setTimeFromRaw("");
    setTimeToRaw("");
    setCaptainRaw([]);
    setStatusRaw("");
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
  }, [
    defaults.fromDate,
    defaults.toDate,
    setClientOrderRaw,
    setFromDateRaw,
    setToDateRaw,
    setTimeFromRaw,
    setTimeToRaw,
    setCaptainRaw,
    setStatusRaw,
    setPage,
    setPageSize,
  ]);

  const isAnyFilterActive = useMemo(
    () =>
      clientOrder !== "" ||
      fromDate !== defaults.fromDate ||
      toDate !== defaults.toDate ||
      timeFrom !== "" ||
      timeTo !== "" ||
      captain.length > 0 ||
      status !== "" ||
      page !== DEFAULT_PAGE ||
      pageSize !== DEFAULT_PAGE_SIZE,
    [
      clientOrder,
      fromDate,
      toDate,
      timeFrom,
      timeTo,
      captain,
      status,
      page,
      pageSize,
      defaults,
    ],
  );

  const filters = useMemo(
    () => ({
      ...(clientOrder && { client_order_id: clientOrder }),
      ...(fromDate && { from_date: fromDate }),
      ...(toDate && { to_date: toDate }),
      ...(timeFrom && { order_time_from: timeFrom }),
      ...(timeTo && { order_time_to: timeTo }),
      ...(captain.length > 0 && { captain }),
      ...(status && { status_id: status }),
      ...(page !== DEFAULT_PAGE && { page }),
      ...(pageSize !== DEFAULT_PAGE_SIZE && { per_page: pageSize }),
    }),
    [
      clientOrder,
      fromDate,
      toDate,
      timeFrom,
      timeTo,
      captain,
      status,
      page,
      pageSize,
    ],
  );

  return {
    clientOrder,
    fromDate,
    toDate,
    timeFrom,
    timeTo,
    captain,
    status,
    page,
    pageSize,
    filters,
    setClientOrder,
    setFromDate,
    setToDate,
    setTimeFrom,
    setTimeTo,
    setCaptain,
    setStatus,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}
