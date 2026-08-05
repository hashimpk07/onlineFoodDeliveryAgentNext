"use client";

import { useMemo } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { useOrderStatusGraph } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_hooks/use-orde-status-graph";
import { transformChartData } from "@/app/[locale]/(main)/dashboard/client/client-dashboard/_utils/transform-chart-data";
import { Card, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const ROW_HEIGHT_PX = 28;

// Recharts' auto ticks can land on awkward steps (0/150/300/450). Build our
// own ticks on a 1-2-5 ladder (…, 50, 100, 200, 500, …) so steps stay round.
function buildRoundTicks(maxValue: number, targetTickCount = 6): number[] {
  if (maxValue <= 0) return [0];
  const rough = maxValue / (targetTickCount - 1);
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 5, 10].find((m) => m * magnitude >= rough) * magnitude;
  const top = Math.ceil(maxValue / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= top; v += step) ticks.push(v);
  return ticks;
}

const chartConfig = {
  value: { label: "Orders", color: "var(--primary)" },
} satisfies ChartConfig;

export default function OrderStatusDonut() {
  const { data } = useOrderStatusGraph();

  const chartData = useMemo(() => {
    const items = transformChartData(data ?? []);
    return [...items].sort((a, b) => b.value - a.value);
  }, [data]);

  const isEmpty = chartData.length === 0;
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const ticks = buildRoundTicks(chartData[0]?.value ?? 0);

  return (
    <div className="w-full h-full">
      <Card className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold flex flex-col items-center">
          Orders Status Graph
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 text-center">
            Total Orders delivered statuses
          </p>
        </CardTitle>

        <div
          className="w-full mt-4"
          style={{
            height: isEmpty
              ? 320
              : Math.max(280, chartData.length * ROW_HEIGHT_PX),
          }}
        >
          {isEmpty ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No order status data available
              </p>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 48, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  horizontal={false}
                  className="stroke-muted-foreground/10"
                />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  ticks={ticks}
                  domain={[0, ticks[ticks.length - 1]]}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={140}
                  interval={0}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent nameKey="name" hideLabel />}
                />
                <Bar
                  dataKey="value"
                  fill="var(--color-value)"
                  radius={[0, 4, 4, 0]}
                  animationDuration={800}
                  maxBarSize={18}
                >
                  <LabelList
                    dataKey="value"
                    position="right"
                    className="fill-foreground text-[11px] font-semibold"
                    formatter={(value: number) =>
                      total > 0
                        ? `${value} (${((value / total) * 100).toFixed(1)}%)`
                        : value
                    }
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
