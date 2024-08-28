"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EpisodesStatistics } from "@/types/statistics";

type LastFiveFirstSevenDaysChartProps = {
  five_latest_episodes: EpisodesStatistics[];
};

/**
 * The LastFiveFirstSevenDaysChart component renders an area chart showing the daily views
 * for the last five episodes during the first seven days since their release.
 *
 * @param {LastFiveFirstSevenDaysChartProps} props - The props for the component.
 * @param {EpisodesStatistics[]} props.five_latest_episodes - An array of statistics for the last five episodes.
 *
 * @returns {JSX.Element} The rendered LastFiveFirstSevenDaysChart component.
 */
const LastFiveFirstSevenDaysChart: React.FC<
  LastFiveFirstSevenDaysChartProps
> = ({ five_latest_episodes }) => {
  const chartData = Array.from({ length: 7 }, (_, index) => ({
    day: (index + 1).toString(),
    episode1: five_latest_episodes[0]?.daily_views[index] || 0,
    episode2: five_latest_episodes[1]?.daily_views[index] || 0,
    episode3: five_latest_episodes[2]?.daily_views[index] || 0,
    episode4: five_latest_episodes[3]?.daily_views[index] || 0,
    episode5: five_latest_episodes[4]?.daily_views[index] || 0,
  }));

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
          tickFormatter={(value) => `Day ${value}`}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {["episode5", "episode4", "episode3", "episode2", "episode1"].map(
          (episodeKey, index) => (
            <Area
              key={episodeKey}
              dataKey={episodeKey}
              type="natural"
              fill={`var(--color-${episodeKey})`}
              fillOpacity={0.4}
              stroke={`var(--color-${episodeKey})`}
              stackId="a"
            />
          )
        )}
      </AreaChart>
    </ChartContainer>
  );
};

export default LastFiveFirstSevenDaysChart;
