import { parseAsInteger, useQueryState } from "nuqs";

export function useAccessTokenParams() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [per_page, setPerPage] = useQueryState(
    "per_page",
    parseAsInteger.withDefault(10),
  );

  const params = { page, per_page };

  const setParams = (newParams: Partial<typeof params>) => {
    if (newParams.page !== undefined) void setPage(newParams.page);
    if (newParams.per_page !== undefined) void setPerPage(newParams.per_page);
  };

  return [params, setParams] as const;
}
