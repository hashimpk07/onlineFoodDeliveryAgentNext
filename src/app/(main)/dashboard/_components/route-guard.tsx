"use client";

import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useUser } from "@/hooks/use-user";
import {
  getRequiredPermissionForPath,
  hasPermission,
} from "@/navigation/sidebar/sidebar-filter";

/**
 * Blocks access to any dashboard route whose sidebar entry declares a
 * `permission`, not just the nav link that points to it — so a hidden
 * sidebar item can't still be reached by typing/bookmarking its URL.
 */
export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useUser();

  const requiredPermission =
    user && pathname !== "/unauthorized"
      ? getRequiredPermissionForPath(pathname, String(user.role))
      : undefined;
  const allowed =
    !requiredPermission ||
    hasPermission(user?.permissions ?? [], requiredPermission);

  useEffect(() => {
    if (isLoading || !user) return;
    if (!allowed) router.replace("/unauthorized");
  }, [isLoading, user, allowed, router]);

  if (isLoading) return null;
  if (user && !allowed) return null;

  return <>{children}</>;
}
