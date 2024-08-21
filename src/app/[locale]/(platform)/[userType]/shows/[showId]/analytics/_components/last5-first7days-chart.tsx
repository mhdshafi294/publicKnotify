"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", likes: 186, views: 80 },
  { month: "February", likes: 305, views: 200 },
  { month: "March", likes: 237, views: 120 },
  { month: "April", likes: 73, views: 190 },
  { month: "May", likes: 209, views: 130 },
  { month: "June", likes: 214, views: 140 },
];
const chartConfig = {
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-1))",
  },
  views: {
    label: "Views",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const LastFiveFirstSevenDaysChart = () => {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: -20,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="views"
          type="natural"
          fill="var(--color-views)"
          fillOpacity={0.4}
          stroke="var(--color-views)"
          stackId="a"
        />
        <Area
          dataKey="likes"
          type="natural"
          fill="var(--color-likes)"
          fillOpacity={0.4}
          stroke="var(--color-likes)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default LastFiveFirstSevenDaysChart;
