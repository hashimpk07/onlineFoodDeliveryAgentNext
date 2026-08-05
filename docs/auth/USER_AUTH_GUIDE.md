# User Authentication & State Management

This implementation follows Next.js colocation pattern with Zustand for global state management and Zod for validation.

## Structure

```
src/
├── stores/
│   └── user/
│       ├── _schema.ts          # Zod schemas for user data validation
│       ├── user-store.ts       # Zustand store definition
│       ├── user-provider.tsx   # React context provider
│       └── index.ts            # Public exports
├── hooks/
│   └── use-user.ts             # Custom hook for user operations
├── app/(main)/
│   ├── auth/
│   │   └── _actions/
│   │       ├── login.ts        # Server action for login
│   │       ├── logout.ts       # Server action for logout
│   │       └── me.ts           # Server action to fetch user data
│   └── dashboard/
│       ├── layout.tsx          # Wraps with UserStoreProvider
│       └── _components/
│           ├── user-initializer.tsx  # Client component to fetch /me
│           └── sidebar/
│               └── nav-user.tsx      # User menu with logout
```

## Features

### 1. User Store (`src/stores/user/`)

Following the colocation pattern, all user store related files are grouped together:

- **`_schema.ts`**: Zod schema for user data validation
- **`user-store.ts`**: Vanilla Zustand store with user state
- **`user-provider.tsx`**: React context provider for client components
- **`index.ts`**: Clean public API

**State:**

```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  setUser: (user: User | null) => void,
  clearUser: () => void,
  setLoading: (loading: boolean) => void
}
```

### 2. Server Actions

#### `/me` - Fetch Current User

```typescript
// src/app/(main)/auth/_actions/me.ts
const result = await meAction();
// Returns: { success: true, user: User } | { error: string }
```

#### `/logout` - Logout User

```typescript
// src/app/(main)/auth/_actions/logout.ts
await logoutAction();
// Clears session and redirects to /auth/login
```

### 3. Custom Hook (`use-user`)

Provides easy access to user operations:

```typescript
const { user, isAuthenticated, isLoading, fetchUser, logout } = useUser();
```

**Methods:**

- `fetchUser()` - Manually fetch user data from `/me` endpoint
- `logout()` - Clear user state and logout

### 4. User Initialization

The `UserInitializer` component automatically fetches user data when the dashboard loads:

```tsx
// src/app/(main)/dashboard/_components/user-initializer.tsx
<UserInitializer />
```

## Usage

### 1. Access User in Components

```tsx
"use client";

import { useUser } from "@/hooks/use-user";

export function MyComponent() {
  const { user, isAuthenticated, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return <div>Hello, {user.name}!</div>;
}
```

### 2. Logout

```tsx
"use client";

import { useUser } from "@/hooks/use-user";

export function LogoutButton() {
  const { logout } = useUser();

  return <button onClick={() => logout()}>Logout</button>;
}
```

### 3. Manual User Fetch

```tsx
"use client";

import { useUser } from "@/hooks/use-user";

export function RefreshButton() {
  const { fetchUser } = useUser();

  return <button onClick={() => fetchUser()}>Refresh User Data</button>;
}
```

### 4. Direct Store Access (Advanced)

```tsx
"use client";

import { useUserStore } from "@/stores/user";

export function UserEmail() {
  // Only re-renders when email changes
  const email = useUserStore((state) => state.user?.email);

  return <span>{email}</span>;
}
```

## Integration Points

### Dashboard Layout

The dashboard layout wraps everything with `UserStoreProvider` and initializes the user:

```tsx
// src/app/(main)/dashboard/layout.tsx
export default function Layout({ children }) {
  return (
    <UserStoreProvider>
      <UserInitializer />
      <SidebarProvider>{/* rest of layout */}</SidebarProvider>
    </UserStoreProvider>
  );
}
```

### Navigation User Component

The `NavUser` component uses the user store and provides logout functionality:

```tsx
// src/app/(main)/dashboard/_components/sidebar/nav-user.tsx
export function NavUser() {
  const { user, logout } = useUser();
  // ... renders user info with logout button
}
```

## API Requirements

Your backend should provide these endpoints:

1. **GET `/me`** - Returns current authenticated user

   ```json
   {
     "status": "success",
     "data": {
       "user": {
         "id": 1,
         "name": "John Doe",
         "email": "john@example.com",
         "role": {
           "id": 1,
           "name": "admin",
           "display_name": "Administrator"
         }
       }
     }
   }
   ```

2. **POST `/login`** - Login user and return token
3. **POST `/logout`** - Logout user (optional, we clear session client-side)

## Benefits

✅ **Type-safe** - Full TypeScript support with Zod validation  
✅ **Performant** - Only re-renders components that use changed state  
✅ **Organized** - Colocation pattern keeps related code together  
✅ **Server-first** - Uses Next.js server actions  
✅ **Auto-sync** - User data automatically fetched on dashboard load  
✅ **Clean API** - Simple hooks for common operations

## Notes

- User data is fetched once on dashboard load via `UserInitializer`
- Logout clears the session cookie and redirects to login
- All user state is client-side only (not persisted to localStorage)
- Session management is handled via HTTP-only cookies on the server
