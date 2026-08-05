"use client";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import { COLORS } from "@/app/[locale]/(main)/dashboard/client/orders/_types/orders";
import { Card, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { MonthlyData } from "../_types/client-dashboard";

const chartConfig = {
  value: {
    label: "Delivered",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function OrderStatusBarChart({
  data,
}: {
  data?: MonthlyData[];
}) {
  const safeData = Array.isArray(data) ? data : [];
  const hasData = safeData.some((item) => item.value > 0);

  return (
    <div className="w-full h-full">
      <Card className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold tabular-nums flex flex-col items-center">
          Delivered Status Graph Monthly
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Orders delivered statuses per month
          </p>
        </CardTitle>

        {/* Body */}
        <div className="h-[320px] sm:h-[360px] lg:h-[320px] w-full mt-4">
          {hasData ? (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={safeData}
                margin={{
                  top: 20,
                  right: 60,
                  left: -10,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-muted-foreground/10"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
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
                  radius={[6, 6, 0, 0]}
                  animationDuration={1000}
                  maxBarSize={60}
                >
                  {safeData.map((item) => (
                    <Cell
                      key={`cell-${item.month}`}
                      fill={COLORS[safeData.indexOf(item) % COLORS.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          ) : (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 mb-4 rounded-2xl sm:rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-zinc-100 dark:bg-zinc-900 rounded-full animate-pulse" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
                No delivered orders yet
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
