import {
  ClientSidebarItems,
  ThirdPartySidebarItems,
  generalSidebarItems,
  type NavGroup,
  type NavMainItem,
} from "@/navigation/sidebar/sidebar-items";
import type { User } from "@/stores/user/_schema";

/**
 * Filters sidebar items based on user permissions
 * @param sidebarItems - The complete sidebar navigation structure
 * @param userPermissions - Array of permission strings the user has
 * @returns Filtered sidebar items that the user has permission to view
 */
export function filterSidebarByPermissions(
  sidebarItems: NavGroup[],
  userPermissions: string[],
): NavGroup[] {
  // If user has no permissions, return empty array
  if (userPermissions.length === 0) return [];

  // Create a Set for O(1) permission lookups
  const permissionSet = new Set(userPermissions);

  return sidebarItems
    .map((group) => {
      const filteredItems = group.items
        .map((item) => {
          // Check if user has the required permission for the item itself
          if (item.permission && !permissionSet.has(item.permission)) {
            return null;
          }

          // If item has sub-items, filter them too (independent of whether
          // the parent itself carries a permission)
          if (item.subItems && item.subItems.length > 0) {
            const filteredSubItems = item.subItems.filter((subItem) => {
              // If sub-item has no permission requirement, include it
              if (!subItem.permission) {
                return true;
              }
              // Check if user has the required permission for sub-item
              return permissionSet.has(subItem.permission);
            });

            // Only include the parent item if it has at least one visible sub-item
            if (filteredSubItems.length === 0) {
              return null;
            }

            return {
              ...item,
              subItems: filteredSubItems,
            };
          }

          return item;
        })
        .filter((item): item is NavMainItem => item !== null);

      // Only include groups that have at least one visible item
      if (filteredItems.length === 0) {
        return null;
      }

      return {
        ...group,
        items: filteredItems,
      };
    })
    .filter((group): group is NavGroup => group !== null);
}

/**
 * Check if a user has a specific permission
 * @param userPermissions - Array of permission strings the user has
 * @param permission - The permission to check for
 * @returns boolean indicating if the user has the permission
 */
export function hasPermission(
  userPermissions: string[],
  permission: string,
): boolean {
  return userPermissions.includes(permission);
}

/**
 * Check if a user has any of the specified permissions
 * @param userPermissions - Array of permission strings the user has
 * @param permissions - Array of permissions to check for
 * @returns boolean indicating if the user has at least one of the permissions
 */
export function hasAnyPermission(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Check if a user has all of the specified permissions
 * @param userPermissions - Array of permission strings the user has
 * @param permissions - Array of permissions to check for
 * @returns boolean indicating if the user has all of the permissions
 */
export function hasAllPermissions(
  userPermissions: string[],
  permissions: string[],
): boolean {
  return permissions.every((permission) =>
    userPermissions.includes(permission),
  );
}

/**
 * Return sidebar items adapted for a specific user (role + permissions).
 * - Applies role-specific remapping (e.g. client-specific URLs/titles)
 * - Filters items based on the user's permissions
 */
export function getSidebarForUser(user?: User): NavGroup[] {
  if (!user) return [];

  const role = String(user.role).toLowerCase();
  // If a role has a preset sidebar, use it. These are exported from
  // `src/navigation/sidebar/sidebar-items.ts` so they can be maintained
  // independently from the base admin sidebar.
  if (role === "client") {
    return filterSidebarByPermissions(ClientSidebarItems, user.permissions);
  }

  if (
    role.includes("3pl") ||
    role.includes("third") ||
    role.includes("thirdparty")
  ) {
    return filterSidebarByPermissions(ThirdPartySidebarItems, user.permissions);
  }

  // Default: admin/other roles use the base sidebar
  return filterSidebarByPermissions(generalSidebarItems, user.permissions);
}

export function getSidebarItemsForRole(role?: string): NavGroup[] {
  const r = String(role).toLowerCase();
  if (r === "client") {
    return ClientSidebarItems;
  }
  if (r.includes("3pl") || r.includes("third") || r.includes("thirdparty")) {
    return ThirdPartySidebarItems;
  }
  return generalSidebarItems;
}

/**
 * Look up the permission required to access a given pathname, based on the
 * role-appropriate sidebar tree (top-level items and subItems). Matches the
 * longest sidebar url that is a prefix of the pathname, so nested routes
 * (e.g. `/orders/[id]`) inherit their parent list page's permission.
 * Returns undefined if the path isn't gated by any permission.
 */
export function getRequiredPermissionForPath(
  pathname: string,
  role?: string,
): string | undefined {
  const items = getSidebarItemsForRole(role);

  let best: { url: string; permission?: string } | undefined;

  const allCandidates = items.flatMap((group) =>
    group.items.flatMap((item) => [
      { url: item.url, permission: item.permission },
      ...(item.subItems ?? []).map((sub) => ({
        url: sub.url,
        permission: sub.permission,
      })),
    ]),
  );

  for (const candidate of allCandidates) {
    if (!candidate.url) continue;
    const matches =
      pathname === candidate.url || pathname.startsWith(`${candidate.url}/`);
    if (matches && (!best || candidate.url.length > best.url.length)) {
      best = candidate;
    }
  }

  return best?.permission;
}

/**
 * Return the role-appropriate "home" route for a user (used e.g. for the
 * sidebar logo link), instead of hardcoding a single dashboard route.
 */
export function getHomeUrlForUser(user?: User): string {
  if (!user) return "/dashboard/general/home";

  const role = String(user.role).toLowerCase();

  if (role === "client") {
    return "/dashboard/client/home";
  }

  if (
    role.includes("3pl") ||
    role.includes("third") ||
    role.includes("thirdparty")
  ) {
    return "/dashboard/3pl/home";
  }

  return "/dashboard/general/home";
}
