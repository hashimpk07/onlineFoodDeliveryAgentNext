/* eslint-disable */

"use client";
"use no memo";

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useCaptainUrlParams() {
  /* ───────────── Search ───────────── */
  const [name, setName] = useQueryState("name", parseAsString.withDefault(""));
  const [mobile, setMobile] = useQueryState(
    "mobile",
    parseAsString.withDefault(""),
  );
  const [vehicleNo, setVehicleNo] = useQueryState(
    "vehicle_no",
    parseAsString.withDefault(""),
  );

  /* ───────────── Single-value filters ───────────── */
  const [captainId, setCaptainId] = useQueryState(
    "captain_id",
    parseAsString.withDefault(""),
  );

  const [regionId, setRegionId] = useQueryState(
    "region_id",
    parseAsString.withDefault(""),
  );

  const [areaId, setAreaId] = useQueryState(
    "area_id",
    parseAsString.withDefault(""),
  );

  const [vehicleTypeId, setVehicleTypeId] = useQueryState(
    "vehicle_type_id",
    parseAsString.withDefault(""),
  );

  const [shiftStatusId, setShiftStatusId] = useQueryState(
    "shift_status_id",
    parseAsString.withDefault(""),
  );

  const [nationalityId, setNationalityId] = useQueryState(
    "nationality_id",
    parseAsString.withDefault(""),
  );

  const [workStatus, setWorkStatus] = useQueryState(
    "work_status",
    parseAsString.withDefault(""),
  );

  /* ───────────── Pagination ───────────── */
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 20;

  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(DEFAULT_PAGE),
  );

  const [pageSize, setPageSize] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  );

  /* ───────────── Reset ───────────── */
  const resetFilters = useCallback(() => {
    setName(null);
    setMobile(null);
    setVehicleNo(null);
    setCaptainId(null);
    setRegionId(null);
    setAreaId(null);
    setVehicleTypeId(null);
    setShiftStatusId(null);
    setNationalityId(null);
    setWorkStatus(null);
    setPage(DEFAULT_PAGE);
    setPageSize(DEFAULT_PAGE_SIZE);
  }, []);

  /* ───────────── Active check ───────────── */
  const isAnyFilterActive = useMemo(
    () =>
      !!(
        name ||
        mobile ||
        vehicleNo ||
        captainId ||
        regionId ||
        areaId ||
        vehicleTypeId ||
        shiftStatusId ||
        nationalityId ||
        workStatus ||
        page !== DEFAULT_PAGE ||
        pageSize !== DEFAULT_PAGE_SIZE
      ),
    [
      name,
      mobile,
      vehicleNo,
      captainId,
      regionId,
      areaId,
      vehicleTypeId,
      shiftStatusId,
      nationalityId,
      workStatus,
      page,
      pageSize,
    ],
  );

  /* ───────────── API-ready filters ───────────── */
  const filters = useMemo(
    () => ({
      name: name || undefined,
      mobile_no: mobile || undefined,
      vehicle_no: vehicleNo || undefined,

      captain: captainId || undefined,
      shift_status: shiftStatusId || undefined,
      nationality: nationalityId || undefined,
      vehicle_type: vehicleTypeId || undefined,
      quadrant_id: regionId || undefined,
      status: workStatus || undefined,
      region_id: areaId || undefined,
    }),
    [
      name,
      mobile,
      vehicleNo,
      captainId,
      shiftStatusId,
      nationalityId,
      vehicleTypeId,
      workStatus,
      regionId,
      areaId,
    ],
  );

  return {
    /* values */
    name,
    mobile,
    vehicleNo,
    captainId,
    regionId,
    areaId,
    vehicleTypeId,
    shiftStatusId,
    nationalityId,
    workStatus,
    page,
    pageSize,

    /* setters */
    setName,
    setMobile,
    setVehicleNo,
    setCaptainId,
    setRegionId,
    setAreaId,
    setVehicleTypeId,
    setShiftStatusId,
    setNationalityId,
    setWorkStatus,
    setPage,
    setPageSize,

    /* helpers */
    filters,
    resetFilters,
    isAnyFilterActive,
  };
}
