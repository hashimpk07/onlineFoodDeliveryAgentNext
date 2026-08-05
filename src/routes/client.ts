export const CLIENT_ALLOWED_ROUTES = [
  "/dashboard/client/home",
  "/dashboard/client/client-dashboard",
  "/dashboard/client/orders",
  "/dashboard/client/transactions",
  "/dashboard/client/access-token",
  "/dashboard/client/order-report",
  "/dashboard/client/profile",
  "/dashboard/client/settings",
  "/streamline-client",
  "/streamline-client-mapcn",
] as const;

export const CLIENT_HOME = "/dashboard/client/home" as const;

export const isClientAllowedRoute = (path: string) =>
  CLIENT_ALLOWED_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
