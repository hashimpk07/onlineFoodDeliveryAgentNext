export const THIRD_PARTY_ALLOWED_ROUTES = [
  "/dashboard/3pl/home",
  "/dashboard/3pl/dashboard",
  "/dashboard/3pl/order",
  "/dashboard/3pl/employee",
  "/dashboard/3pl/captain",
  "/dashboard/3pl/vehicle",
  "/dashboard/3pl/accounts/captain-commission",
  "/dashboard/3pl/accounts/company-earning",
  "/dashboard/3pl/accounts/reconciliation",
  "/dashboard/3pl/reports/performance",
  "/dashboard/3pl/reports/working-days",
  "/streamline-3pl",
] as const;

export const THIRD_PARTY_HOME = "/dashboard/3pl/home" as const;

export const is3plAllowedRoute = (path: string) =>
  THIRD_PARTY_ALLOWED_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
