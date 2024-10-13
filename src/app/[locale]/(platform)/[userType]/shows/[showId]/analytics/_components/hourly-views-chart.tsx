"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format, parse } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type HourlyViewData = {
  hour: number;
  count: number;
};

/**
 * Represents a chart component that displays hourly views data.
 * @param {Object} props - The properties passed to the component.
 * @param {HourlyViewData[]} props.data - An array of hourly view data objects.
 * @returns {JSX.Element} A chart component displaying hourly views data.
 */
const HourlyViewsChart = ({ data }: { data: HourlyViewData[] }) => {
  // Fill in missing hours with count 0
  const filledData = Array.from({ length: 24 }, (_, i) => {
    const hour = 23 - i; // Count down from 23 to 0
    const existingData = data.find((item) => item.hour === hour);
    return existingData || { hour, count: 0 };
  }).reverse();

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full h-96 lg:h-48 2xl:h-96 flex-1"
    >
      <BarChart
        accessibilityLayer
        data={filledData}
        margin={{
          top: 20,
          right: 30,
          left: -32,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="hour"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            format(parse(`${value}:00`, "HH:mm", new Date()), "ha")
          }
          className="font-black "
        />
        <YAxis tickLine={false} tickMargin={10} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-views)" radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="count"
            position="insideTop"
            offset={5}
            className="fill-white font-bold text-sm"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default HourlyViewsChart;
