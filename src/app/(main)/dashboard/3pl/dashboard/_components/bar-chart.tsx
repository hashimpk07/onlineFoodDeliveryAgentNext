/* eslint-disable */
"use client";

import { Card, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

// Standard chart data format
interface ChartDataPoint {
  label: string;
  value: number;
}

interface ReusableBarChartProps {
  data: ChartDataPoint[];
  colors: string[];
  title: string;
  subtitle?: string;
  height?: string;
  barRadius?: [number, number, number, number];
  maxBarSize?: number;
  emptyStateTitle?: string;
  emptyStateIcon?: React.ReactNode;
  showCartesianGrid?: boolean;
  xAxisAngle?: number;
  xAxisHeight?: number;
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
  yAxisLabel?: string;
}

export default function ReusableBarChart({
  data,
  colors,
  title,
  subtitle,
  height = "h-[320px] sm:h-[360px] lg:h-[320px]",
  barRadius = [6, 6, 0, 0],
  maxBarSize = 60,
  emptyStateTitle = "No data available",
  emptyStateIcon,
  showCartesianGrid = true,
  xAxisAngle = -45,
  xAxisHeight = 60,
  margin = {
    top: 20,
    right: 10,
    left: -10,
    bottom: 0,
  },
  yAxisLabel = "Count",
}: ReusableBarChartProps) {
  const safeData = Array.isArray(data) ? data : [];
  const hasData = safeData.some((item) => item.value > 0);

  const chartConfig = {
    value: {
      label: yAxisLabel,
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full h-full">
      <Card className="@container/card h-auto min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-4 sm:p-6 shadow-sm border-zinc-200/50 dark:border-zinc-800/50">
        <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold tabular-nums">
          {title}
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              {subtitle}
            </p>
          )}
        </CardTitle>

        <div className={`${height} w-full mt-4`}>
          {hasData ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={safeData} margin={margin}>
                {showCartesianGrid && (
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    className="stroke-muted-foreground/10"
                  />
                )}
                <XAxis
                  dataKey="label"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  angle={xAxisAngle}
                  textAnchor="end"
                  height={xAxisHeight}
                  interval={0}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="value"
                  radius={barRadius}
                  animationDuration={1000}
                  maxBarSize={maxBarSize}
                >
                  {safeData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              {emptyStateIcon ?? (
                <div className="h-16 w-16 sm:h-20 sm:w-20 mb-4 rounded-2xl sm:rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 bg-zinc-100 dark:bg-zinc-900 rounded-full animate-pulse" />
                </div>
              )}
              <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {emptyStateTitle}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
