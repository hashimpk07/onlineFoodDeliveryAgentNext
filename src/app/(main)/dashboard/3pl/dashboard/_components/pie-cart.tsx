/* eslint-disable */
"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";

const RADIAN = Math.PI / 180;

function renderOutsideLabel({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
  fill,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  name: string;
  value: number;
  fill: string;
}) {
  if (!value) return null;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const ex = cx + (outerRadius + 22) * cos;
  const ey = cy + (outerRadius + 22) * sin;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={fill} strokeWidth={1.5} />
      <text
        x={ex + (cos >= 0 ? 4 : -4)}
        y={ey}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fontSize={11}
        className="fill-foreground"
      >
        {name} ({value})
      </text>
    </g>
  );
}

export interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
}

interface ReusablePieChartProps {
  data: PieChartDataItem[];
  title?: string;
  description?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  innerRadius?: string | number;
  outerRadius?: string | number;
  height?: number;
  emptyMessage?: string;
  className?: string;
}

export default function ReusablePieChart({
  data,
  title,
  description,
  showLegend = true,
  showTooltip = true,
  innerRadius = 0,
  outerRadius = "65%",
  padingAngle,
  minAngle,
  height,
  emptyMessage = "No data available",
  className = "",
}: ReusablePieChartProps) {
  const [hiddenNames, setHiddenNames] = useState<Set<string>>(new Set());

  const handleToggle = (name: string) => {
    setHiddenNames((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    data.forEach((item) => {
      config[item.name] = { label: item.name, color: item.color };
    });
    return config;
  }, [data]);

  const chartData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      value: hiddenNames.has(item.name) ? 0 : item.value,
    }));
  }, [data, hiddenNames]);

  const isEmpty = data.length === 0;

  return (
    <div className="w-full h-full">
      <Card
        className={`@container/card h-auto min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] p-4 sm:p-6 shadow-sm border-zinc-200/50 dark:border-zinc-800/50 ${className}`}
      >
        {title && (
          <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">
            {title}
            {description && (
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
                {description}
              </p>
            )}
          </CardTitle>
        )}

        <CardContent className="p-0 mt-4">
          <div
            className="w-full"
            style={{ height: height ?? undefined }}
            // fallback height when no explicit height is given
            {...(!height && {
              className: "w-full h-[360px] sm:h-[360px] lg:h-[320px]",
            })}
          >
            {isEmpty ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {emptyMessage}
                </p>
              </div>
            ) : (
              <ChartContainer
                config={chartConfig}
                className="h-full w-full [&_.recharts-pie-label-text]:fill-foreground"
              >
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={padingAngle}
                    minAngle={minAngle}
                    animationBegin={0}
                    animationDuration={800}
                    label={renderOutsideLabel}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        strokeWidth={0}
                        className="outline-none stroke-background hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>

                  {showTooltip && (
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent nameKey="name" />}
                    />
                  )}

                  {showLegend && (
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      onClick={(entry: any) => handleToggle(entry.value)}
                      wrapperStyle={{
                        fontSize: "11px",
                        cursor: "pointer",
                        paddingTop: "16px",
                      }}
                      iconSize={10}
                      formatter={(value: string, entry: any) => {
                        const isHidden = hiddenNames.has(value);
                        const original = data.find((d) => d.name === value);
                        return (
                          <span
                            className={
                              isHidden
                                ? "text-zinc-400 line-through opacity-50"
                                : "hover:opacity-70 transition-opacity"
                            }
                            style={{
                              color: isHidden ? undefined : entry.color,
                            }}
                          >
                            {value} ({original?.value})
                          </span>
                        );
                      }}
                      payload={
                        data.map((item) => ({
                          value: item.name,
                          id: item.name,
                          type: "circle",
                          color: item.color,
                          payload: item,
                        })) as any
                      }
                    />
                  )}
                </PieChart>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
