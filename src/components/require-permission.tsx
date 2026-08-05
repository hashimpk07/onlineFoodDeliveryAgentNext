"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/use-user";
import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "@/navigation/sidebar/sidebar-filter";

interface RequirePermissionProps {
  children: React.ReactNode;
  permission?: string | string[];
  mode?: "any" | "all";
  fallbackRedirect?: string;
}

/**
 * Client-side permission guard. Use inside Server Components to protect routes
 * where permissions are only available on the client/user store.
 */
export function RequirePermission({
  children,
  permission,
  mode = "any",
  fallbackRedirect = "/unauthorized",
}: RequirePermissionProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  // Helper to centralize permission check logic and reduce complexity
  const isAllowed = (
    userPermissions: string[],
    permissionInput?: string | string[],
    checkMode: "any" | "all" = "any",
  ) => {
    if (!permissionInput) return true;

    if (typeof permissionInput === "string") {
      return hasPermission(userPermissions, permissionInput);
    }

    return checkMode === "any"
      ? hasAnyPermission(userPermissions, permissionInput)
      : hasAllPermissions(userPermissions, permissionInput);
  };

  useEffect(() => {
    if (isLoading) return;

    const userPermissions = user?.permissions ?? [];
    if (!isAllowed(userPermissions, permission, mode)) {
      router.replace(fallbackRedirect);
    }
  }, [permission, user, isLoading, mode, router, fallbackRedirect]);

  // While loading or if user lacks permission, avoid flashing protected content
  if (isLoading) return null;

  const allowed = isAllowed(user?.permissions ?? [], permission, mode);
  if (!allowed) return null;

  return <>{children}</>;
}
