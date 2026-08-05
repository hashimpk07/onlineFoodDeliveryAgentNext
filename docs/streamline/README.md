# Map Architecture & Developer Guide (`mapcn`)

This directory contains the project's centralized map system, built on **MapLibre GL JS** with a custom declarative React wrapper (`mapcn`).

## 📁 Directory Structure

```bash
src/app/[locale]/(main)/streamline-[feature]/_components/
├── map/                    # Map markers and specific routes
├── streamline-map.tsx      # Main layout (Modular entry point)
├── orders-list-section.tsx # Extracted list container (Modular)
├── captain-list-section.tsx# Extracted captain container (Modular)
└── captains/               # Cards and Skeletons
```

## 🚀 How to Create a New Map

### 1. Define your data model

Ensure your data implements the base interfaces like `OrderListItem` or `StreamlineCaptain`.

- **Orders**: Should have `location`, `delivery_location`, etc.
- **Captains**: Should have `geometry` (GeoJSON Point).

### 2. Basic Map Implementation

Use `MapcnBase` as the root. To keep file length and complexity low, always extract list panels into separate **Section** components.

```tsx
import { MapcnBase } from "@/components/map/shared/mapcn-base";
import { OrdersListSection } from "./orders-list-section";

export const MyNewMap = () => {
  const { orders, isLoading, isFetching, isRefreshing } = useMyData();

  return (
    <div className="h-screen w-full">
      <MapcnBase showStyleToggle enableSingleTab>
        {/* Your markers and routes go here */}
        <OrdersListSection
          orders={orders}
          isLoading={isLoading ?? false}
          isRefreshing={isRefreshing ?? false}
        />
      </MapcnBase>
    </div>
  );
};
```

### 3. Loading States & UX

To provide a premium feel, the map uses a tiered loading system:

1.  **Skeletons**: Displayed during initial load or manual refreshes.
2.  **Spinners**: Displayed in the panel headers during background refetches (e.g., Pusher events or background polling).

Always pass `(isLoading ?? false) || (isFetching ?? false) || (isRefreshing ?? false)` to the section components to ensure consistency.

## 🛠️ Key Components Reference

### `MapcnBase`

- `ref`: Access standard MapLibre `flyTo`, `easeTo` methods.
- `showStyleToggle`: Small overlay to switch between Light/Dark/Satellite.
- `enableSingleTab`: Optimization for multi-map setups.

### `OrdersListSection` / `CaptainListSection`

These should be collocated with the page. They handle:

- Mapping raw data to the `OrdersList` / `StreamlineCaptainPanel`.
- Managing selection logic (e.g., `setOrder(id)` on click).
- Passing consolidated `loading` and `isFetching` states.

## 📝 Best Practices

1.  **File Length**: Keep `streamline-map.tsx` under 300 lines by extracting sub-components and custom hooks.
2.  **Nullish CoALESCING**: Always use `?? false` for boolean combinations in JSX for strict lint conformity (Pre-commit hooks).
3.  **Selection-only Routes**: Only render routes for the `selectedOrder` to avoid overloading the Mapbox API and cluttering the UI.
4.  **FlyTo Durations**: Use `duration: 2000` for a smooth, premium feel.
5.  **Collocation**: Keep feature-specific data hooks close to the page, but keep the core UI components inside `src/components/map/shared`.
