import { format } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EpisodesStatistics } from "@/types/statistics";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import LastFiveFirstSevenDaysChart from "./last5-first7days-chart";

type LastFiveFirstSevenDaysChartCardProps = {
  five_latest_episodes: EpisodesStatistics[];
};

/**
 * The LastFiveFirstSevenDaysChartCard component displays a chart and table summarizing the performance
 * of the last five episodes over the first seven days since release.
 *
 * @param {LastFiveFirstSevenDaysChartCardProps} props - The props for the component.
 * @param {Object} props.params - Route parameters, including user type and show ID.
 * @param {React.ReactNode} props.chart - The chart component to render within the card.
 * @param {EpisodesStatistics[]} props.five_latest_episodes - An array of statistics for the last five episodes.
 *
 * @returns {JSX.Element} The rendered LastFiveFirstSevenDaysChartCard component.
 */
const LastFiveFirstSevenDaysChartCard: React.FC<
  LastFiveFirstSevenDaysChartCardProps
> = ({ five_latest_episodes }) => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-10 w-full">
      {/* Header Section */}
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold capitalize">
            <span className="opacity-80">{t("5-latest-episodes")}</span>
            <br />
            <span className="text-3xl">{t("first-7-days-since-release")}</span>
          </h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full pt-5 h-96 relative">
        <LastFiveFirstSevenDaysChart
          five_latest_episodes={five_latest_episodes}
        />
      </div>

      {/* Table Section */}
      <ScrollArea className="w-full h-48">
        <Table className="flex-1 shrink-0 grow w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t("episode-number")}</TableHead>
              <TableHead>{t("title")}</TableHead>
              <TableHead className="text-right">{t("release-date")}</TableHead>
              <TableHead className="text-right">
                {t("days-since-release")}
              </TableHead>
              <TableHead className="text-right">{t("views")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {five_latest_episodes.map((episode) => (
              <TableRow key={episode.podcast.id}>
                <TableCell className="font-medium">
                  {episode.podcast.id}
                </TableCell>
                <TableCell>{episode.podcast.name}</TableCell>
                <TableCell className="text-right">
                  {format(new Date(episode.podcast.publishing_date), "PPP")}
                </TableCell>
                <TableCell className="text-right">
                  {episode.days_since_release}
                </TableCell>
                <TableCell className="text-right">
                  {episode.total_views}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </DashboardCardContainer>
  );
};

export default LastFiveFirstSevenDaysChartCard;
