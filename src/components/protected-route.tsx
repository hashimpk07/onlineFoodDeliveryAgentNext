"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/use-user";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * Component to protect routes based on authentication status
 *
 * @example
 * // Require authentication
 * <ProtectedRoute>
 *   <DashboardContent />
 * </ProtectedRoute>
 *
 * @example
 * // Redirect authenticated users (e.g., login page)
 * <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
 *   <LoginForm />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  redirectTo = "/auth/login",
  requireAuth = true,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;

    // If auth is required but user is not authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }

    // If auth is NOT required but user IS authenticated, redirect away
    if (!requireAuth && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !isAuthenticated) return null;
  if (!requireAuth && isAuthenticated) return null;

  return <>{children}</>;
}
