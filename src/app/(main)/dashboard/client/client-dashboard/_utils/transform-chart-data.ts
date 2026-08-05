import {
  COLORS,
  OrderStatusGraphItem,
  STATUS_COLORS,
} from "../_types/client-dashboard";

export function transformChartData(items: OrderStatusGraphItem[]) {
  return items
    .filter((item) => item.value > 0)
    .map((item, index) => {
      const label = item.label;
      // Create a CSS-safe key by replacing spaces and special characters
      const key = label.toLowerCase().replace(/[^a-z0-9]/g, "_");

      return {
        name: label,
        key: key,
        value: item.value,
        // eslint-disable-next-line security/detect-object-injection
        color: STATUS_COLORS[label] ?? COLORS[index % COLORS.length],
      };
    });
}
