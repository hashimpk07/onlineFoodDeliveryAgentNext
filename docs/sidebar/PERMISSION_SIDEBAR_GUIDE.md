# Permission-Based Sidebar Implementation

This document explains how the permission-based sidebar filtering has been implemented in the application.

## Overview

The sidebar now filters navigation items based on the user's permissions retrieved from the API. Only menu items that the user has permission to access will be displayed.

## Components

### 1. User Schema Update (`src/stores/user/_schema.ts`)

- Added `permissions` array field to the `UserSchema`
- Permissions are stored as an array of strings (e.g., `["view-dashboard", "view-clients"]`)

### 2. Me Action Update (`src/app/(main)/auth/_actions/me.ts`)

- Updated to extract permissions from the API response
- Permissions are now passed to the user store when user data is fetched
- The API returns permissions at the root level of the response

### 3. Sidebar Items (`src/navigation/sidebar/sidebar-items.ts`)

- Added `permission` field to both `NavMainItem` and `NavSubItem` interfaces
- Each sidebar item now has an optional `permission` property that maps to API permission names
- Permission mappings follow the API permission structure (e.g., `"view-dispatcher"`, `"view-clients"`)

### 4. Sidebar Filter Utility (`src/lib/sidebar-filter.ts`)

- Main filtering function: `filterSidebarByPermissions(sidebarItems, userPermissions)`
- Filters both parent items and sub-items based on permissions
- Groups without visible items are excluded
- Helper functions for permission checking:
  - `hasPermission(userPermissions, permission)` - Check single permission
  - `hasAnyPermission(userPermissions, permissions)` - Check if user has any of the permissions
  - `hasAllPermissions(userPermissions, permissions)` - Check if user has all permissions

### 5. AppSidebar Component (`src/app/(main)/dashboard/_components/sidebar/app-sidebar.tsx`)

- Updated to use the `useUser` hook to get user permissions
- Uses `useMemo` to filter sidebar items based on user permissions
- Automatically re-filters when user permissions change

## Permission Mappings

Here are some example permission mappings:

| Menu Item         | Permission               |
| ----------------- | ------------------------ |
| Home              | `view-dashboard`         |
| Dashboard Overall | `view-dashboard-overall` |
| Dispatcher        | `view-dispatcher`        |
| Dispatcher Live   | `view-live-dispatcher`   |
| Scheduled Orders  | `view-scheduled-orders`  |
| Tickets           | `view-tickets`           |
| Captains          | `view-captains`          |
| Clients           | `view-clients`           |
| Sales Report      | `view-salesreport`       |

For a complete list of permission mappings, see `src/navigation/sidebar/sidebar-items.ts`.

## Usage

### In Components

If you need to check permissions in components:

```typescript
import { useUser } from "@/hooks/use-user";
import { hasPermission } from "@/lib/sidebar-filter";

function MyComponent() {
  const { user } = useUser();

  // Check single permission
  const canViewClients = hasPermission(user?.permissions ?? [], "view-clients");

  // Check any permission
  const canViewReports = hasAnyPermission(
    user?.permissions ?? [],
    ["view-salesreport", "view-expensereport"]
  );

  // Check all permissions
  const canManageAll = hasAllPermissions(
    user?.permissions ?? [],
    ["view-clients", "add-clients", "edit-clients"]
  );

  return (
    <div>
      {canViewClients && <ClientsList />}
      {canViewReports && <ReportsSection />}
    </div>
  );
}
```

### Adding New Menu Items

When adding new menu items to the sidebar:

1. Add the item to `src/navigation/sidebar/sidebar-items.ts`
2. Add the `permission` field with the corresponding API permission name
3. The item will automatically be filtered based on user permissions

Example:

```typescript
{
  title: "New Feature",
  url: "/dashboard/new-feature",
  icon: NewIcon,
  permission: "view-new-feature", // Permission from API
}
```

## API Response Structure

The API returns user data with permissions in this format:

```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "user": {
      "id": 101,
      "name": "user@example.com",
      "email": "user@example.com",
      "role_id": 1,
      "role": {
        "id": 1,
        "name": "admin",
        "display_name": "Admin"
      }
    }
  },
  "permissions": [
    "view-dispatcher",
    "view-dashboard",
    "view-clients"
    // ... more permissions
  ]
}
```

## How It Works

1. **User Login**: When a user logs in, the `meAction` is called
2. **Permission Extraction**: Permissions are extracted from the API response
3. **User Store Update**: User data with permissions is stored in the user store
4. **Sidebar Rendering**: The `AppSidebar` component reads user permissions
5. **Filtering**: The `filterSidebarByPermissions` function filters the sidebar items
6. **Display**: Only permitted items are displayed to the user

## Notes

- Items without a `permission` field are always visible (useful for public sections)
- If a parent item has subitems, it's only shown if at least one subitem is visible
- Empty groups (groups with no visible items) are automatically hidden
- The filtering is memoized for performance optimization
