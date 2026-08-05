# Leajlak Portal — Project Skills Reference

Smart Delivery Management Platform. Multi-role dashboard (Admin, 3PL, Client) built on Next.js 15 App Router with a Laravel backend.

## Skills

Project-specific skills live in `.claude/skills/`. Invoke with `/skill-name`:

| Skill                | Trigger                                                             |
| -------------------- | ------------------------------------------------------------------- |
| `/add-feature`       | Scaffold a new feature page/module for any role                     |
| `/add-crud-pages`    | Full List + Create + Edit + View page set for a resource (routing, nuqs, React Query, server actions, shared form — see reference impl in the skill) |
| `/add-api-hook`      | Add an API fetch function + React Query hook to an existing feature |
| `/add-server-action` | Create a `"use server"` mutation action                             |
| `/add-data-table`    | Add a TanStack DataTable (columns, pagination, search) to a feature |
| `/add-realtime-hook` | Create a Pusher/Echo real-time event hook                           |
| `/commit`            | Generate a conventional commit message from staged changes          |

---

## Tech Stack

| Layer         | Technology                              | Version    |
| ------------- | --------------------------------------- | ---------- |
| Framework     | Next.js (App Router)                    | 15.x       |
| UI            | React                                   | 19.x       |
| Language      | TypeScript                              | 5.9        |
| Styling       | Tailwind CSS v4 + CSS custom properties | 4.x        |
| Components    | shadcn/ui (Radix UI primitives)         | —          |
| Forms         | react-hook-form + Zod                   | 7.x / 3.x  |
| State         | Zustand (vanilla stores)                | 5.x        |
| Data Fetching | TanStack React Query + Axios            | 5.x / 1.x  |
| Tables        | TanStack Table                          | 8.x        |
| Real-time     | Pusher JS + Laravel Echo                | 8.x / 2.x  |
| Maps          | MapLibre GL + react-map-gl              | 5.x / 8.x  |
| Auth          | jose (JWT) + secure HTTP cookies        | 6.x        |
| i18n          | i18next + next-i18n-router              | 25.x / 5.x |
| Animations    | Framer Motion                           | —          |
| Notifications | Sonner                                  | —          |
| Charts        | Recharts                                | 2.x        |
| Drag & Drop   | @dnd-kit                                | —          |

---

## Directory Structure

```
src/
├── app/[locale]/
│   ├── layout.tsx                   # Root layout — ThemeProvider, i18n hydration, theme-boot script
│   ├── (main)/
│   │   ├── layout.tsx               # UserStoreProvider, QueryProvider, PusherProvider
│   │   ├── auth/
│   │   │   ├── _actions/            # login.ts, me.ts, logout.ts  (server actions)
│   │   │   ├── _schema.ts           # Zod LoginSchema
│   │   │   └── login/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx           # AppSidebar, header (theme/lang/account)
│   │   │   ├── _components/
│   │   │   │   ├── user-initializer.tsx
│   │   │   │   └── sidebar/         # AppSidebar, AccountMenu, LayoutControls, SearchDialog, ThemeSwitcher
│   │   │   ├── 3pl/                 # 3PL feature modules
│   │   │   ├── client/              # Client feature modules
│   │   │   └── general/             # Admin feature modules
│   │   ├── streamline-3pl/          # Real-time delivery map (3PL view)
│   │   └── streamline-client/       # Real-time delivery map (Client view)
│   └── api/
│       └── broadcasting/auth/       # Pusher private-channel auth proxy
├── components/
│   ├── ui/                          # 90+ shadcn-style components
│   ├── data-table/                  # TanStack Table wrapper with DnD
│   ├── map/                         # MapLibre wrapper (markers, routes, overlays)
│   └── create-order-modal/          # Multi-row dynamic order creation form
├── lib/
│   ├── api.client.ts                # Thin typed wrappers: api.get/post/put/patch/delete
│   ├── axios.ts                     # Axios instance with auth interceptor
│   ├── session.ts                   # JWT encrypt/decrypt, createSession, getSession
│   ├── cookie-actions.ts            # Server-side next/headers cookie ops
│   ├── react-query.ts               # QueryClient singleton config
│   ├── unwrap-response.ts           # unwrapResponse<T>() — throws on error
│   ├── streamline-cursor-pagination.ts  # useCursorPaginatedQuery hook
│   ├── preferences/                 # Theme & layout preference helpers
│   └── pusher/                      # Echo singleton, hooks, types, utils
├── stores/
│   ├── user/                        # Zustand user store + Zod User schema
│   ├── preferences/                 # Theme/layout preference store
│   └── export/                      # Export modal state
├── providers/
│   ├── user-store-provider.tsx
│   ├── query-provider.tsx           # QueryClientProvider + Nuqs adapter
│   ├── pusher-provider.tsx
│   ├── preferences-store-provider.tsx
│   └── translations-provider.tsx
├── navigation/sidebar/
│   ├── sidebar-items.ts             # Full role-based nav tree
│   └── sidebar-filter.ts           # filterSidebarByPermissions()
├── routes/
│   ├── client.ts                    # CLIENT_ALLOWED_ROUTES, isClientAllowedRoute
│   └── 3pl.ts                       # THIRD_PARTY_ALLOWED_ROUTES, is3plAllowedRoute
├── hooks/                           # Shared hooks (use-user, use-debounce, use-pagination-params…)
├── server/server-actions.ts         # getPreference, setValueToCookie (server-only)
├── styles/presets/                  # CSS files for 6 theme presets
└── i18n-config.ts                   # locales: ["en","ar"], defaultLocale: "en"
```

Each feature module follows this sub-structure:

```
dashboard/[role]/[feature]/
├── _api/          # async fetch functions (called inside queryFn)
├── _actions/      # "use server" server actions
├── _hooks/        # React Query hooks + realtime hooks
├── _types/        # TypeScript interfaces/types
├── _components/   # Feature-specific components
└── page.tsx
```

---

## Routing

Routes live under `app/[locale]/` — the locale segment is always present but the `/en` prefix is hidden (`prefixDefault: false`).

### Role-based routes

**3PL (logistics provider)**

- `/dashboard/3pl/home`
- `/dashboard/3pl/dashboard`
- `/dashboard/3pl/captain`
- `/dashboard/3pl/vehicle`
- `/dashboard/3pl/order`
- `/dashboard/3pl/employee`
- `/dashboard/3pl/accounts/(captain-commission|company-earning|reconciliation)`
- `/dashboard/3pl/reports/(performance|working-days)`
- `/streamline-3pl` — live delivery map

**Client (e-commerce vendor)**

- `/dashboard/client/home`
- `/dashboard/client/client-dashboard` — parallel routes (`@orderStats`, `@orderStatusGraph`, `@orderStatusGraphMonthly`)
- `/dashboard/client/orders` + `/orders/[id]`
- `/dashboard/client/transactions`
- `/dashboard/client/access-token`
- `/dashboard/client/order-report`
- `/streamline-client` — live delivery tracking

**Admin / General**

- `/dashboard/general/company-info/*`
- `/dashboard/general/employees/*`
- `/dashboard/general/vehicles/*`
- `/dashboard/general/delivery-rules/*` (price, cancellation, return charges)
- `/dashboard/general/system-settings/*` (vat, shift-rules, dispatch-rules, api-token)
- `/dashboard/general/geo-settings/*` (area, region, zone)
- `/dashboard/general/sales_management/*` (clients, roles, sales-leads, team-management)
- `/dashboard/general/kpi-reports/*`
- `/dashboard/general/logs_expires/*`

**Other**

- `/auth/login`
- `/unauthorized`
- `/(external)` — public-facing pages

**API routes**

- `POST /api/broadcasting/auth` — Proxies Pusher private-channel auth to Laravel backend

---

## Authentication

### Flow

```
LoginForm (client)
  → loginAction("use server")
    → Zod validate, POST /public/login to Laravel
    → extractUserData(), createSession()  [jose JWT stored in "session" cookie]
    → redirect to /dashboard
  → UserInitializer mounts (main layout)
    → meAction("use server")
      → reads session cookie, GET /public/user
      → setUser(user) → Zustand store
```

### Session

```typescript
// src/lib/session.ts
createSession(payload: SessionPayload): void   // encrypts with HS256, sets HTTP-only cookie
getSession(): SessionPayload | null            // reads + decrypts session cookie
deleteSession(): void
refreshSession(): void                         // extends expiry on each page hit
```

Cookie name: `"session"` — HTTP-only, secure, max-age 1 day.

### Protecting pages

```tsx
// Client component guard
<ProtectedRoute>{children}</ProtectedRoute>

// Permission guard
<RequirePermission permission="orders.view">
  <OrderTable />
</RequirePermission>
```

Route-level guards in `middleware.ts` redirect unauthenticated requests to `/auth/login`.

### User store

```typescript
// src/stores/user/user-store.ts
interface UserState {
  user: User | null; // Zod-validated User
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser(user): void; // also sets isAuthenticated = !!user  (atomic)
  clearUser(): void;
  setLoading(b): void;
}
```

Access in components:

```typescript
const { user, isAuthenticated } = useUser(); // src/hooks/use-user.ts
// or
const user = useUserStore((state) => state.user); // direct selector
```

---

## Component Library

All components are in `src/components/ui/`. They are shadcn-style (Radix UI primitives + Tailwind variants via CVA).

### Core primitives

`Button`, `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `Toggle`, `Badge`, `Avatar`

### Overlays / Dialogs

`Dialog`, `AlertDialog`, `Drawer`, `Sheet`, `Popover`, `Tooltip`

### Navigation

`DropdownMenu`, `ContextMenu`, `NavigationMenu`, `Breadcrumb`, `Tabs`

### Layout

`Card`, `Separator`, `Accordion`, `Collapsible`, `ResizablePanels`, `ScrollArea`

### Feedback

`Alert`, `Progress`, `Skeleton`, `Spinner`, `Toast` (Sonner)

### Forms

`Form`, `FormField`, `FormLabel`, `FormControl`, `FormMessage` (react-hook-form bridge)
`InputOTP`, `FileUpload`, `SearchableSelect`, `MultiSelect`, `MultiSearchableSelect`, `TreeSelect`

### Data Table (`src/components/data-table/`)

TanStack Table v8 wrapper with full feature set:

- Drag-and-drop rows via `@dnd-kit`
- Column sorting (`data-table-column-header.tsx`)
- Filter box + search (`data-table-filter-box.tsx`, `data-table-search.tsx`)
- Pagination (`data-table-pagination.tsx`)
- View options, reset filters
- `DataTableBDR` variant for BDR-specific layouts
- Dynamic header table for flexible column configs

Usage pattern:

```typescript
const table = useDataTableInstance({
  data,
  columns,
  pagination: { pageIndex, pageSize },
  onPaginationChange,
});
return <DataTable table={table} />;
```

### Map (`src/components/map/`)

MapLibre GL wrapper:

- Captain markers, Delivery markers, Shop markers
- Order info banner overlay
- Status bar overlay
- Route polyline visualization
- Captain/order list panels with cursor pagination
- Timer badges on markers

---

## API Integration

### Base URL

`NEXT_PUBLIC_BACKEND_SERVER` env var (default: `https://sandbox.4ulogistic.com/api`)

### API client (`src/lib/api.client.ts`)

Thin typed wrapper over the Axios instance:

```typescript
const api = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?): Promise<T>
  put<T>(url: string, data?: unknown, config?): Promise<T>
  patch<T>(url: string, data?: unknown, config?): Promise<T>
  delete<T>(url: string, config?): Promise<T>
}
```

### Axios instance (`src/lib/axios.ts`)

- Injects `Authorization: Bearer <token>` from session cookie on every request
- Handles 401 responses (clears session, redirects to login)

### Response shape

All backend responses follow:

```typescript
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T;
}
```

### Unwrap utility

```typescript
// src/lib/unwrap-response.ts
unwrapResponse<T>(res: ApiResponse<T>): T
// Returns data on success; throws with res.message on error
```

### Server actions

All data mutations and protected fetches are `"use server"` actions. They call `api.*` and return plain objects (no throwing):

```typescript
// Pattern used across _actions/ files
export async function loginAction(email: string, password: string) {
  try {
    const res = await api.post<ApiResponse<LoginResponse>>("/public/login", {
      email,
      password,
    });
    const data = unwrapResponse(res);
    // ... create session
    return { success: true };
  } catch (err) {
    return { error: getErrorMessage(err) };
  }
}
```

### React Query setup

Config (`src/lib/react-query.ts`):

- `staleTime`: 60 000 ms
- `retry`: 1
- `refetchOnWindowFocus`: false

Standard query hook pattern:

```typescript
// _api/get-orders.ts
export async function getOrders(
  filters: OrderFilters,
): Promise<OrdersResponse> {
  return api
    .get<
      ApiResponse<OrdersResponse>
    >("/client/orders_list", { params: filters })
    .then(unwrapResponse);
}

// _hooks/use-orders-list.ts
const { data, isLoading } = useQuery({
  queryKey: ["orders", filters],
  queryFn: () => getOrders(filters),
  enabled: !!companyId,
});
```

### Cursor pagination (Streamline)

```typescript
// src/lib/streamline-cursor-pagination.ts
const { items, hasNext, hasPrev, goNext, goPrev, refetchFromStart } =
  useCursorPaginatedQuery({
    queryKey: ["orders", filters],
    queryFn: StreamLineOrdersCard,
    filters,
    enabled,
  });
```

---

## URL State (nuqs)

Any state that drives a data fetch and should survive a refresh or be shareable via URL — pagination, search, filters, tab selection — belongs in the URL via `nuqs`, not `useState`. Reserve `useState`/`useForm` for state that genuinely can't live in a URL (form field values before submit, selected `File` objects, transient UI toggles).

Each feature (or sub-view within a feature, e.g. a filterable card) gets its own `_hooks/use-[thing]-params.ts` hook. Reference implementation: `src/app/[locale]/(main)/dashboard/general/sales-dashboard/_hooks/use-sales-params.ts`.

Pattern:

- One `useQueryStates({...})` call combining all related params (not multiple separate `useQueryState` calls)
- Individual setters wrapped in `useCallback`, exposed as `setX` functions — never return the raw nuqs tuple
- Return a plain object (`{ page, name, setPage, setName }`), not a `[params, setParams] as const` tuple
- A setter that changes a filter should also reset pagination back to page 1 in the same `setParams` call

```typescript
// _hooks/use-[feature]-params.ts
"use client";

import { useCallback } from "react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function use[Feature]Params() {
  const [{ page, name }, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    name: parseAsString.withDefault(""),
  });

  const setPage = useCallback(
    (value: number) => setParams({ page: value }),
    [setParams],
  );

  const setName = useCallback(
    (value: string) => setParams({ name: value, page: 1 }), // reset page on filter change
    [setParams],
  );

  return { page, name, setPage, setName };
}
```

For plain page/pageSize pagination with no other params, prefer the shared `src/hooks/use-pagination-params.ts` (supports a `prefix` option for multiple tables on one page) over hand-rolling one.

---

## Real-time (Pusher + Laravel Echo)

### Required env vars

```
NEXT_PUBLIC_PUSHER_APP_KEY=...
NEXT_PUBLIC_PUSHER_APP_CLUSTER=...
```

Without these vars all `getEchoInstance()` calls return gracefully (no crash — the instance check throws and all hooks catch it silently).

### Singleton (`src/lib/pusher/echo-instance.ts`)

```typescript
getEchoInstance(): Echo   // creates once, reuses
disconnectEcho(): void
```

### Channels & events (`src/lib/pusher/pusher-config.ts`)

```typescript
PUSHER_CHANNELS = {
  ORDERS: "private-orders",
  TICKET: "private-tickets",
  CLIENT_ORDERS: "private-client-orders",
};

PUSHER_EVENTS = {
  NEW_ORDER,
  ORDER_STATUS_CHANGED,
  CLIENT_DECLINED_RETURN,
  NEW_TICKET,
  TICKET_UPDATED,
  TICKET_CLOSED,
  ORDER_ACCEPTING_TIME_OUTED,
  ORDER_REJECTED,
};
```

### Available hooks

| Hook                                        | File                                                    | When used                          |
| ------------------------------------------- | ------------------------------------------------------- | ---------------------------------- |
| `useOrderEvents({ enabled })`               | `src/lib/pusher/hooks/use-order-events.ts`              | Global order events (admin/staff)  |
| `useTicketEvents({ enabled })`              | `src/lib/pusher/hooks/use-ticket-events.ts`             | Global ticket events (admin/staff) |
| `useUserEvents({ userChannel })`            | `src/lib/pusher/hooks/use-user-events.ts`               | Per-user events                    |
| `use3plOrderEvents(companyId, opts)`        | `src/app/…/streamline-3pl/_hooks/use-events.ts`         | 3PL map view                       |
| `useClientOrderEvents(clientId, opts)`      | `src/app/…/streamline-client/_hooks/use-events.ts`      | Client map view                    |
| `use3plRealtimeOrders(queryKey, companyId)` | `src/app/…/3pl/order/_hooks/use-realtime-orders.ts`     | 3PL order list                     |
| `useRealtimeOrders(queryKey)`               | `src/app/…/client/orders/_hooks/use-realtime-orders.ts` | Client order list                  |

### Provider logic (`src/providers/pusher-provider.tsx`)

- Admin / staff roles: `useOrderEvents` + `useTicketEvents` with `enabled: true`
- `client` and `3pl` roles: both disabled (`enabled: false`) — those roles use feature-level channel hooks instead

### Broadcasting auth

`POST /api/broadcasting/auth` (Next.js route) proxies to Laravel `/broadcasting/auth` with the user's Bearer token. This authenticates private Pusher channels.

---

## State Management

Three Zustand vanilla stores, each with a matching React context provider.

### User store (`src/stores/user/`)

```typescript
{
  (user, isAuthenticated, isLoading);
}
setUser(user); // sets user + isAuthenticated atomically
clearUser();
setLoading(b);
```

Provider: `UserStoreProvider` — wraps `(main)/layout.tsx`.
Initialized by `UserInitializer` component which calls `meAction()` on mount.

### Preferences store (`src/stores/preferences/`)

```typescript
{
  (themeMode,
    themePreset,
    contentLayout,
    navbarStyle,
    sidebarVariant,
    sidebarCollapsible);
}
```

Provider: `PreferencesStoreProvider` — hydrates from server cookies.
Changes written back to cookies via `setValueToCookie` server action.

### Export store (`src/stores/export/`)

```typescript
{
  (isOpen, method, reportType, exportUrl, payload);
}
(openModal(config), closeModal());
```

Used by `ExportModal` component + `useExportReport` hook.

---

## Forms

Pattern: react-hook-form + Zod + shadcn Form components.

```typescript
// 1. Zod schema
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

// 2. Hook setup
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { name: "", email: "" },
});

// 3. Submit (server action)
const onSubmit = form.handleSubmit(async (data) => {
  const result = await createAction(data);
  if ("error" in result) toast.error(result.error);
  else toast.success("Done");
});

// 4. JSX
<Form {...form}>
  <form onSubmit={onSubmit}>
    <FormField control={form.control} name="name" render={({ field }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl><Input {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

Dynamic arrays (e.g. create-order modal): use `useFieldArray` from react-hook-form.
Cross-field validation: Zod `.superRefine()` for duplicate-ID checks.

---

## Internationalization

```typescript
// src/i18n-config.ts
locales: ["en", "ar"];
defaultLocale: "en";
prefixDefault: false; // /en not shown in URL
```

- Translation files: `public/locales/[locale]/[namespace].json`
- RTL: `<html dir={locale === "ar" ? "rtl" : "ltr"}>`
- Server-side load: `initTranslations(locale, namespaces)` — called in server components
- Client-side: `useTranslation(namespace)` hook from react-i18next
- Language switcher: `src/components/language-switcher.tsx` (in dashboard header)

---

## Theme & Styling

### Approach

Tailwind CSS v4 utility classes + CSS custom property presets. Theme values live in CSS variables; the active preset is applied via a `data-theme-preset` attribute on `<html>`.

### Presets (6)

`default` · `bloom` · `brutalist` · `retro` · `soft-pop` · `tangerine`

Files: `src/styles/presets/*.css`

### Modes

Light / Dark — toggled via `data-theme-mode` on `<html>`.

### Layout preferences

Applied as data attributes on `<html>`:
| Attribute | Values |
|---|---|
| `data-content-layout` | `centered`, `full-width` |
| `data-navbar-style` | `sticky`, `scroll` |
| (sidebar state handled by SidebarProvider) | |

### Theme boot

`src/scripts/theme-boot.ts` — inline `<script>` injected in `<head>` to read cookies and set data attributes before first paint (prevents theme flash).

### Class merging

```typescript
import { cn } from "@/lib/utils"; // clsx + tailwind-merge
cn("base-class", conditional && "extra-class", variant);
```

---

## Permissions & RBAC

User permissions are fetched from the backend in `meAction()` and stored in the `User` object.

### Sidebar filtering

```typescript
// src/navigation/sidebar/sidebar-filter.ts
filterSidebarByPermissions(items, user)  // returns items the user can see
hasPermission(user, permission)
hasAnyPermission(user, permissions[])
hasAllPermissions(user, permissions[])
```

### Route guards

```typescript
// src/routes/client.ts
isClientAllowedRoute(pathname): boolean

// src/routes/3pl.ts
is3plAllowedRoute(pathname): boolean
```

Middleware uses these to redirect users who navigate to routes outside their role.

### Component-level

```tsx
<RequirePermission permission="vehicles.create">
  <CreateVehicleButton />
</RequirePermission>
```

---

## Key Environment Variables

```
# Backend
NEXT_PUBLIC_BACKEND_SERVER=https://sandbox.4ulogistic.com/api

# Real-time
NEXT_PUBLIC_PUSHER_APP_KEY=...
NEXT_PUBLIC_PUSHER_APP_CLUSTER=...

# Session
SESSION_SECRET=...     # used by jose to sign JWTs

# Maps
NEXT_PUBLIC_MAPTILER_API_KEY=...   # MapLibre tile source
```

---

## Patterns & Conventions

### Adding a new page

1. Create route folder under `src/app/[locale]/(main)/dashboard/[role]/[feature]/`
2. Add `_api/`, `_hooks/`, `_types/`, `_components/` as needed
3. Export an async server component as `page.tsx`
4. Add entry to `src/navigation/sidebar/sidebar-items.ts`
5. Add to the route allow-list in `src/routes/[role].ts`

### Adding a new API call

```typescript
// _api/get-something.ts
export async function getSomething(params: Params): Promise<SomethingResponse> {
  return api
    .get<ApiResponse<SomethingResponse>>("/endpoint", { params })
    .then(unwrapResponse);
}
```

### Adding a new server action (mutation)

```typescript
// _actions/create-something.ts
"use server";
import { api } from "@/lib/api.client";

export async function createSomething(payload: Payload) {
  try {
    const res = await api.post<ApiResponse<Result>>("/endpoint", payload);
    return { success: true, data: unwrapResponse(res) };
  } catch (err) {
    return { error: getErrorMessage(err) };
  }
}
```

### Error handling

- Server actions return `{ success: true, data }` or `{ error: string }` — never throw
- Client components check the return shape and toast accordingly
- Utilities: `src/lib/server-action-error-handler.ts`, `src/lib/server-validation-error-handler.ts`

### Proxy (`src/proxy.ts`)

Next.js rewrites forward `/api/v1/*` to the Laravel backend so client-side requests don't expose the backend URL.

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output CLAUDE.md|01-app:{04-glossary.mdx}|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-cache-components.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mcp.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,public-static-pages.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,proxy.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-params.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-END -->
