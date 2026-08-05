import { useCallback, useMemo } from "react";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export function useVehicleParams() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [captain, setCaptain] = useQueryState(
    "captain",
    parseAsString.withDefault(""),
  );

  const [vehicleNo, setVehicleNo] = useQueryState(
    "vehicle_no",
    parseAsString.withDefault(""),
  );

  const [code, setCode] = useQueryState("code", parseAsString.withDefault(""));

  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(""),
  );

  const [type, setType] = useQueryState(
    "vehicle_type",
    parseAsString.withDefault(""),
  );

  const [regionId, setRegionId] = useQueryState(
    "region_id",
    parseAsString.withDefault(""),
  );

  const [ownerId, setOwnerId] = useQueryState(
    "owner",
    parseAsString.withDefault(""),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [per_page, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(20),
  );

  const resetFilters = useCallback(() => {
    setVehicleNo(null);
    setCaptain(null);
    setCode(null);
    setStatus(null);
    setType(null);
    setRegionId(null);
    setOwnerId(null);
    setPage(DEFAULT_PAGE);
  }, [
    setVehicleNo,
    setCaptain,
    setCode,
    setStatus,
    setType,
    setRegionId,
    setOwnerId,
    setPage,
    DEFAULT_PAGE,
  ]);

  const isAnyFilterActive = useMemo(
    () =>
      vehicleNo !== "" ||
      captain !== "" ||
      code !== "" ||
      status !== "" ||
      type !== "" ||
      regionId !== "" ||
      ownerId !== "" ||
      page !== DEFAULT_PAGE ||
      per_page !== DEFAULT_PAGE_SIZE,
    [vehicleNo, captain, code, status, type, regionId, ownerId, page, per_page],
  );

  const filters = useMemo(
    () => ({
      vehicleNo: vehicleNo || undefined,
      captain: captain || undefined,
      code: code || undefined,
      status: status || undefined,
      type: type || undefined,
      regionId: regionId || undefined,
      ownerId: ownerId || undefined,
    }),
    [vehicleNo, captain, code, status, type, regionId, ownerId],
  );

  return {
    vehicleNo,
    captain,
    code,
    status,
    type,
    regionId,
    ownerId,
    page,
    pageSize: per_page,
    filters,
    setVehicleNo,
    setCaptain,
    setCode,
    setStatus,
    setType,
    setRegionId,
    setOwnerId,
    setPage,
    setPageSize,
    resetFilters,
    isAnyFilterActive,
  };
}
