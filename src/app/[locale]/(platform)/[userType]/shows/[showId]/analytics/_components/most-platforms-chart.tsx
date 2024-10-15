"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PlatformCounter } from "@/types/statistics";
import { DateRange } from "react-day-picker";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  view: {
    label: "downloads",
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

const PlatformChart = ({
  platformsDownloads,
  totalCount,
}: {
  platformsDownloads: PlatformCounter[];
  totalCount: number;
}) => {
  // Generate chart data based on the provided date range
  let chartData: {
    platform: string;
    view: number;
    percentage: string;
  }[] = platformsDownloads.map((platform) => ({
    platform: platform.platform,
    view: platform.count,
    percentage: `${Math.round((platform.count / totalCount) * 100)}%`,
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-96 lg:h-48 2xl:h-96 flex-1"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="platform"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
          width={80}
          className="font-bold text-lg"
        />
        <XAxis dataKey="view" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="view"
          layout="vertical"
          fill="var(--color-view)"
          radius={4}
          maxBarSize={40}
        >
          <LabelList
            dataKey="view"
            position="insideLeft"
            offset={8}
            className="fill-white font-bold"
            fontSize={18}
          />
          <LabelList
            dataKey="percentage"
            position="right"
            offset={8}
            className="fill-white font-bold"
            fontSize={18}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default PlatformChart;
