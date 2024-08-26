"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EpisodesStatistics } from "@/types/statistics";

const LastFiveFirstSevenDaysChart = ({
  five_latest_episodes,
}: {
  five_latest_episodes: EpisodesStatistics[];
}) => {
  const chartData = [
    {
      day: "1",
      episode1:
        five_latest_episodes[0]?.daily_views[
          Object.keys(five_latest_episodes[0]?.daily_views)[0]
        ] || 0,
      episode2:
        five_latest_episodes[1]?.daily_views[
          Object.keys(five_latest_episodes[1]?.daily_views)[0]
        ] || 0,
      episode3:
        five_latest_episodes[2]?.daily_views[
          Object.keys(five_latest_episodes[2]?.daily_views)[0]
        ] || 0,
      episode4:
        five_latest_episodes[3]?.daily_views[
          Object.keys(five_latest_episodes[3]?.daily_views)[0]
        ] || 0,
      episode5:
        five_latest_episodes[4]?.daily_views[
          Object.keys(five_latest_episodes[4]?.daily_views)[0]
        ] || 0,
    },
    {
      day: "2",
      episode1:
        five_latest_episodes[0]?.daily_views[
          Object.keys(five_latest_episodes[0]?.daily_views)[1]
        ] || 0,
      episode2:
        five_latest_episodes[1]?.daily_views[
          Object.keys(five_latest_episodes[1]?.daily_views)[1]
        ] || 0,
      episode3:
        five_latest_episodes[2]?.daily_views[
          Object.keys(five_latest_episodes[2]?.daily_views)[1]
        ] || 0,
      episode4:
        five_latest_episodes[3]?.daily_views[
          Object.keys(five_latest_episodes[3]?.daily_views)[1]
        ] || 0,
      episode5:
        five_latest_episodes[4]?.daily_views[
          Object.keys(five_latest_episodes[4]?.daily_views)[1]
        ] || 0,
    },
    {
      day: "3",
      episode1:
        five_latest_episodes[0]?.daily_views[
          Object.keys(five_latest_episodes[0]?.daily_views)[2]
        ] || 0,
      episode2:
        five_latest_episodes[1]?.daily_views[
          Object.keys(five_latest_episodes[1]?.daily_views)[2]
        ] || 0,
      episode3:
        five_latest_episodes[2]?.daily_views[
          Object.keys(five_latest_episodes[2]?.daily_views)[2]
        ] || 0,
      episode4:
        five_latest_episodes[3]?.daily_views[
          Object.keys(five_latest_episodes[3]?.daily_views)[2]
        ] || 0,
      episode5:
        five_latest_episodes[4]?.daily_views[
          Object.keys(five_latest_episodes[4]?.daily_views)[2]
        ] || 0,
    },
    {
      day: "4",
      episode1:
        five_latest_episodes[0]?.daily_views[
          Object.keys(five_latest_episodes[0]?.daily_views)[3]
        ] || 0,
      episode2:
        five_latest_episodes[1]?.daily_views[
          Object.keys(five_latest_episodes[1]?.daily_views)[3]
        ] || 0,
      episode3:
        five_latest_episodes[2]?.daily_views[
          Object.keys(five_latest_episodes[2]?.daily_views)[3]
        ] || 0,
      episode4:
        five_latest_episodes[3]?.daily_views[
          Object.keys(five_latest_episodes[3]?.daily_views)[3]
        ] || 0,
      episode5:
        five_latest_episodes[4]?.daily_views[
          Object.keys(five_latest_episodes[4]?.daily_views)[3]
        ] || 0,
    },
    {
      day: "5",
      episode1:
        five_latest_episodes[0]?.daily_views[
          Object.keys(five_latest_episodes[0]?.daily_views)[4]
        ] || 0,
      episode2:
        five_latest_episodes[1]?.daily_views[
          Object.keys(five_latest_episodes[1]?.daily_views)[4]
        ] || 0,
      episode3:
        five_latest_episodes[2]?.daily_views[
          Object.keys(five_latest_episodes[2]?.daily_views)[4]
        ] || 0,
      episode4:
        five_latest_episodes[3]?.daily_views[
          Object.keys(five_latest_episodes[3]?.daily_views)[4]
        ] || 0,
      episode5:
        five_latest_episodes[4]?.daily_views[
          Object.keys(five_latest_episodes[4]?.daily_views)[4]
        ] || 0,
    },
    {
      day: "6",
      episode1:
        five_latest_episodes[0]?.daily_views[
          Object.keys(five_latest_episodes[0]?.daily_views)[5]
        ] || 0,
      episode2:
        five_latest_episodes[1]?.daily_views[
          Object.keys(five_latest_episodes[1]?.daily_views)[5]
        ] || 0,
      episode3:
        five_latest_episodes[2]?.daily_views[
          Object.keys(five_latest_episodes[2]?.daily_views)[5]
        ] || 0,
      episode4:
        five_latest_episodes[3]?.daily_views[
          Object.keys(five_latest_episodes[3]?.daily_views)[5]
        ] || 0,
      episode5:
        five_latest_episodes[4]?.daily_views[
          Object.keys(five_latest_episodes[4]?.daily_views)[5]
        ] || 0,
    },
    {
      day: "7",
      episode1:
        five_latest_episodes[0]?.daily_views[
          Object.keys(five_latest_episodes[0]?.daily_views)[6]
        ] || 0,
      episode2:
        five_latest_episodes[1]?.daily_views[
          Object.keys(five_latest_episodes[1]?.daily_views)[6]
        ] || 0,
      episode3:
        five_latest_episodes[2]?.daily_views[
          Object.keys(five_latest_episodes[2]?.daily_views)[6]
        ] || 0,
      episode4:
        five_latest_episodes[3]?.daily_views[
          Object.keys(five_latest_episodes[3]?.daily_views)[6]
        ] || 0,
      episode5:
        five_latest_episodes[4]?.daily_views[
          Object.keys(five_latest_episodes[4]?.daily_views)[6]
        ] || 0,
    },
  ];

  const chartConfig = {
    episode1: {
      label: five_latest_episodes[0]?.podcast.name,
      color: "hsl(var(--chart-1))",
    },
    episode2: {
      label: five_latest_episodes[1]?.podcast.name,
      color: "hsl(var(--chart-2))",
    },
    episode3: {
      label: five_latest_episodes[2]?.podcast.name,
      color: "hsl(var(--chart-3))",
    },
    episode4: {
      label: five_latest_episodes[3]?.podcast.name,
      color: "hsl(var(--chart-4))",
    },
    episode5: {
      label: five_latest_episodes[4]?.podcast.name,
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

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
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area
          dataKey="episode5"
          type="natural"
          fill="var(--color-episode5)"
          fillOpacity={0.4}
          stroke="var(--color-episode5)"
          stackId="a"
        />
        <Area
          dataKey="episode4"
          type="natural"
          fill="var(--color-episode4)"
          fillOpacity={0.4}
          stroke="var(--color-episode4)"
          stackId="a"
        />
        <Area
          dataKey="episode3"
          type="natural"
          fill="var(--color-episode3)"
          fillOpacity={0.4}
          stroke="var(--color-episode3)"
          stackId="a"
        />
        <Area
          dataKey="episode2"
          type="natural"
          fill="var(--color-episode2)"
          fillOpacity={0.4}
          stroke="var(--color-episode2)"
          stackId="a"
        />
        <Area
          dataKey="episode1"
          type="natural"
          fill="var(--color-episode1)"
          fillOpacity={0.4}
          stroke="var(--color-episode1)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default LastFiveFirstSevenDaysChart;
