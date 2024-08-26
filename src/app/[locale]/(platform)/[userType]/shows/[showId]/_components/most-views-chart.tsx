"use client";

import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ShowViewsStatistics } from "@/types/statistics";
import { format, parseISO } from "date-fns";

// const chartData = [
//   { day: "Sun", view: 186 },
//   { day: "Mon", view: 305 },
//   { day: "Tus", view: 237 },
//   { day: "Thu", view: 73 },
//   { day: "Fri", view: 209 },
//   { day: "Sat", view: 214 },
// ];

const chartConfig = {
  view: {
    label: "view",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const MostViewsChart = ({ showViews }: { showViews: ShowViewsStatistics }) => {
  console.log(showViews);
  const chartData = [
    {
      day: format(
        parseISO(
          showViews?.views_over_time[0]?.date
            ? showViews?.views_over_time[0]?.date
            : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        ),
        "EEE"
      ),
      view: showViews?.views_over_time[0]?.views_count
        ? showViews?.views_over_time[0]?.views_count
        : 0,
    },
    {
      day: format(
        parseISO(
          showViews?.views_over_time[1]?.date
            ? showViews?.views_over_time[1]?.date
            : new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
        ),
        "EEE"
      ),
      view: showViews?.views_over_time[1]?.views_count
        ? showViews?.views_over_time[1]?.views_count
        : 0,
    },
    {
      day: format(
        parseISO(
          showViews?.views_over_time[2]?.date
            ? showViews?.views_over_time[2]?.date
            : new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        ),
        "EEE"
      ),
      view: showViews?.views_over_time[2]?.views_count
        ? showViews?.views_over_time[2]?.views_count
        : 0,
    },
    {
      day: format(
        parseISO(
          showViews?.views_over_time[3]?.date
            ? showViews?.views_over_time[3]?.date
            : new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        ),
        "EEE"
      ),
      view: showViews?.views_over_time[3]?.views_count
        ? showViews?.views_over_time[3]?.views_count
        : 0,
    },
    {
      day: format(
        parseISO(
          showViews?.views_over_time[4]?.date
            ? showViews?.views_over_time[4]?.date
            : new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        ),
        "EEE"
      ),
      view: showViews?.views_over_time[4]?.views_count
        ? showViews?.views_over_time[4]?.views_count
        : 0,
    },
    {
      day: format(
        parseISO(
          showViews?.views_over_time[5]?.date
            ? showViews?.views_over_time[5]?.date
            : new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        ),
        "EEE"
      ),
      view: showViews?.views_over_time[5]?.views_count
        ? showViews?.views_over_time[5]?.views_count
        : 0,
    },
    {
      day: format(
        parseISO(
          showViews?.views_over_time[6]?.date
            ? showViews?.views_over_time[6]?.date
            : new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        ),
        "EEE"
      ),
      view: showViews?.views_over_time[6]?.views_count
        ? showViews?.views_over_time[6]?.views_count
        : 0,
    },
  ];

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
