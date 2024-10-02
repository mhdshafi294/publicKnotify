"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EpisodesStatistics } from "@/types/statistics";

/**
 * The LastFiveFirstSevenDaysChart component renders an area chart showing the daily views
 * for the last five episodes during the first seven days since their release.
 *
 * @param {LastFiveFirstSevenDaysChartProps} props - The props for the component.
 * @param {EpisodesStatistics[]} props.five_latest_episodes - An array of statistics for the last five episodes.
 *
 * @returns {JSX.Element} The rendered LastFiveFirstSevenDaysChart component.
 */
const LastFiveFirstSevenDaysChart = ({
  five_latest_episodes,
}: {
  five_latest_episodes: EpisodesStatistics[];
}) => {
  interface ChartData {
    day: string;
    episode1: number;
    episode2: number;
    episode3: number;
    episode4: number;
    episode5: number;
  }

  const chartData: ChartData[] = Array.from({ length: 7 }, (_, dayIndex) => {
    const day = (dayIndex + 1).toString();

    const dailyViews = five_latest_episodes.reduce(
      (views, episode, episodeIndex) => {
        return {
          ...views,
          [`episode${episodeIndex + 1}`]:
            episode?.daily_views[Object.keys(episode?.daily_views)[dayIndex]] ||
            0,
        };
      },
      {} as Omit<ChartData, "day">
    );

    return { day, ...dailyViews };
  });

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
      <LineChart
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
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={7} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="episode5"
          type="linear"
          stroke="var(--color-episode5)"
          strokeWidth={5}
          markerWidth={20}
          width={20}
          dot={true}
        />
        <Line
          dataKey="episode4"
          type="linear"
          stroke="var(--color-episode4)"
          strokeWidth={5}
          markerWidth={20}
          width={20}
          dot={true}
        />
        <Line
          dataKey="episode3"
          type="linear"
          stroke="var(--color-episode3)"
          strokeWidth={5}
          markerWidth={20}
          width={20}
          dot={true}
        />
        <Line
          dataKey="episode2"
          type="linear"
          stroke="var(--color-episode2)"
          strokeWidth={5}
          markerWidth={20}
          width={20}
          dot={true}
        />
        <Line
          dataKey="episode1"
          type="linear"
          stroke="var(--color-episode1)"
          strokeWidth={5}
          markerWidth={20}
          width={20}
          dot={true}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default LastFiveFirstSevenDaysChart;
