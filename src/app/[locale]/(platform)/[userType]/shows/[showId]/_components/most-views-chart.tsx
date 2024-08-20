"use client";

import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Sun", view: 186 },
  { day: "Mon", view: 305 },
  { day: "Tus", view: 237 },
  { day: "Thu", view: 73 },
  { day: "Fri", view: 209 },
  { day: "Sat", view: 214 },
];

const chartConfig = {
  view: {
    label: "view",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const MostViewsChart = () => {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: -24,
          right: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={7} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="view"
          type="linear"
          stroke="var(--color-view)"
          strokeWidth={5}
          markerWidth={20}
          width={20}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default MostViewsChart;
