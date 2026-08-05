import {
  BarChartItem,
  ChartItem,
  ChartSource,
} from "@/app/[locale]/(main)/dashboard/3pl/dashboard/_types/page";

export function transformChartData(source: ChartSource): ChartItem[] {
  const length = Math.min(
    source.labels.length,
    source.values.length,
    source.colors.length,
  );

  return Array.from({ length }, (_, index) => ({
    // eslint-disable-next-line security/detect-object-injection
    name: source.labels[index],
    // eslint-disable-next-line security/detect-object-injection
    value: source.values[index],
    // eslint-disable-next-line security/detect-object-injection
    color: source.colors[index],
  }));
}

export function transBarChartData(chartData: BarChartItem) {
  return {
    data: chartData.labels.map((label, index) => ({
      label: label,
      // eslint-disable-next-line security/detect-object-injection
      value: chartData.values[index] ?? 0,
    })),
    colors: chartData.colors,
  };
}
