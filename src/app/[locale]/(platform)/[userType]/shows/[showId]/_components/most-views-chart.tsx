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

/**
 * The MostViewsChart component renders a line chart showing the daily views
 * for a show over the last seven days.
 *
 * @param {MostViewsChartProps} props - The props for the component.
 * @param {ShowViewsStatistics} props.showViews - The statistics data for the show views.
 *
 * @returns {JSX.Element} The rendered MostViewsChart component.
 */

const MostViewsChart = ({ showViews }: { showViews: ShowViewsStatistics }) => {
  // console.log(showViews);
  const getDayData = (index: number, offsetDays: number) => ({
    day: format(
      parseISO(
        showViews?.views_over_time[index]?.date
          ? showViews?.views_over_time[index]?.date
          : new Date(
              Date.now() - offsetDays * 24 * 60 * 60 * 1000
            ).toISOString()
      ),
      "EEE"
    ),
    view: showViews?.views_over_time[index]?.views_count
      ? showViews?.views_over_time[index]?.views_count
      : 0,
  });

  const chartData = Array.from({ length: 7 }, (_, index) =>
    getDayData(index, 6 - index)
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-96 lg:h-48 2xl:h-96 flex-1"
    >
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
