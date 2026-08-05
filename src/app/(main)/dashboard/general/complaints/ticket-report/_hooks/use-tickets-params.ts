import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useTicketsParams() {
  return useQueryStates({
    page: parseAsInteger.withDefault(1),
    per_page: parseAsInteger.withDefault(20),
    from_date: parseAsString.withDefault(""),
    to_date: parseAsString.withDefault(""),
  });
}
