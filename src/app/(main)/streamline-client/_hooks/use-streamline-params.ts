/* eslint-disable */

"use client";

import { useCallback, useMemo } from "react";

import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

export function useOrdersStreamlineParams() {
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("new_orders"),
  );
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [hasClientChat, setHasClientChat] = useQueryState(
    "has_client_chat",
    parseAsInteger.withDefault(0),
  );
  const [scheduled, setScheduled] = useQueryState(
    "scheduled",
    parseAsInteger.withDefault(0),
  );
  const [show, setShow] = useQueryState(
    "cat",
    parseAsString.withDefault("busy"),
  );

  const [region, setRegion] = useQueryState(
    "region",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const [client, setClient] = useQueryState(
    "client_id",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );
  const [shop, setShop] = useQueryState(
    "shop_id",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const [area, setArea] = useQueryState(
    "area",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const [order, setOrder] = useQueryState(
    "order",
    parseAsString.withDefault(""),
  );

  const filters = useMemo(
    () => ({
      ...(search && { search: search }),
      ...(status && { status: status }),
      ...(hasClientChat && { has_client_chat: hasClientChat }),
      ...(scheduled && { scheduled: scheduled }),
      ...(show && { show: show }),
      ...(region && region.length > 0 && { region: region }),
      ...(client && client.length > 0 && { client_id: client }),
      ...(shop && shop.length > 0 && { shop_id: shop }),
      ...(area && area.length > 0 && { area: area }),
      ...(order && { order: order }),
    }),
    [
      search,
      status,
      hasClientChat,
      scheduled,
      show,
      region,
      client,
      shop,
      area,
      order,
    ],
  );

  const resetFilters = useCallback(() => {
    setSearch("");
    setStatus("new_orders");
    setHasClientChat(0);
    setScheduled(0);
    setShow("busy");
    setRegion([]);
    setClient([]);
    setShop([]);
    setArea([]);
    setOrder("");
  }, [
    setSearch,
    setStatus,
    setHasClientChat,
    setScheduled,
    setShow,
    setRegion,
    setClient,
    setShop,
    setArea,
    setOrder,
  ]);

  const isAnyFilterActive = useMemo(
    () => Object.keys(filters).length > 0,
    [filters],
  );

  return {
    search,
    status,
    hasClientChat,
    scheduled,
    show,
    region,
    client,
    shop,
    filters,
    area,
    order,
    setArea,
    setSearch,
    setStatus,
    setHasClientChat,
    setScheduled,
    setShow,
    setRegion,
    setClient,
    setShop,
    resetFilters,
    isAnyFilterActive,
    setOrder,
  };
}

export function useCaptainsStreamlineParams() {
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [show, setShow] = useQueryState(
    "c_show",
    parseAsString.withDefault("busy"),
  );
  const [region, setRegion] = useQueryState(
    "c_region",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );
  const [company, setCompany] = useQueryState(
    "c_company",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );
  const [employmentType, setEmploymentType] = useQueryState(
    "c_employment_type",
    parseAsArrayOf(parseAsInteger).withDefault([]),
  );

  const filters = useMemo(
    () => ({
      ...(search && { search: search }),
      ...(show && { show: show }),
      ...(region && region.length > 0 && { region: region }),
      ...(company && company.length > 0 && { company: company }),
      ...(employmentType &&
        employmentType.length > 0 && { employment_type: employmentType }),
    }),
    [search, show, region, company, employmentType],
  );

  const resetFilters = useCallback(() => {
    setSearch("");
    setShow("busy");
    setRegion([]);
    setCompany([]);
    setEmploymentType([]);
  }, [setSearch, setShow, setRegion, setCompany, setEmploymentType]);

  const isAnyFilterActive = useMemo(
    () => Object.keys(filters).length > 0,
    [filters],
  );
  return {
    search,
    show,
    region,
    company,
    employmentType,
    filters,
    setSearch,
    setShow,
    setRegion,
    setCompany,
    setEmploymentType,
    resetFilters,
    isAnyFilterActive,
  };
}
