"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ShowViewsStatistics } from "@/types/statistics";
import { addDays, differenceInDays, format, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";

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

const MostViewsChart = ({
  showViews,
  date,
}: {
  showViews: ShowViewsStatistics;
  date: DateRange | undefined;
}) => {
  const getDayData = (targetDate: Date) => {
    // Find the corresponding view data for the targetDate
    const matchedViewData = showViews?.views_over_time.find(
      (view) => format(parseISO(view.date), "PP") === format(targetDate, "PP")
    );

    return {
      day: format(targetDate, "PP").split(",")[0], // Format the target date
      view: matchedViewData ? matchedViewData.views_count : 0,
    };
  };

  // Generate chart data based on the provided date range
  let chartData: {
    day: string;
    view: number;
  }[] = [];

  if (date) {
    const totalDays = differenceInDays(date.to!, date.from!);

    // Create an array based on the number of days in the date range
    chartData = Array.from({ length: totalDays + 1 }, (_, index) => {
      const targetDate = addDays(date.from!, index); // Increment date by index days
      return getDayData(targetDate); // Call getDayData with targetDate
    });
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-96 lg:h-48 2xl:h-96 flex-1"
    >
      <AreaChart
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
          minTickGap={20}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 6)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={7} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Area
          dataKey="view"
          type="linear"
          stroke="var(--color-view)"
          strokeWidth={5}
          markerWidth={20}
          width={20}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default MostViewsChart;
