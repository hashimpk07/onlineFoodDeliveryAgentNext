export type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  className?: string;
  iconClassName?: string;
};

export interface ChartItem {
  name: string;
  value: number;
  color: string;
}

export interface ChartSource {
  colors: string[];
  labels: string[];
  values: number[];
}

export interface BarChartItem {
  labels: string[];
  values: number[];
  colors: string[];
}

export interface TransformedBarChartData {
  data: Array<{ label: string; value: number }>;
  colors: string[];
}
