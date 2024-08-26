import React from "react";

import DashboardCardContainer from "../../../_components/dashboard-card-container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EpisodesStatistics } from "@/types/statistics";

type LastFiveFirstSevenDaysChartCardProps = {
  params: { userType: string; showId: string };
  chart: React.ReactNode;
  five_latest_episodes: EpisodesStatistics[];
};

const LastFiveFirstSevenDaysChartCard: React.FC<
  LastFiveFirstSevenDaysChartCardProps
> = ({ params, chart, five_latest_episodes }) => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-10 w-full">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold capitalize">
            <span className="opacity-80">{t("5-latest-episodes")}</span>
            <br />
            <span className="text-3xl">{t("first-7-days-since-release")}</span>
          </h2>
        </div>
      </div>
      <div className="w-full h-80 relative">{chart}</div>
      <ScrollArea className="w-full h-20">
        <Table className="flex-1 shrink-0 grow w-full ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ep #</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Release Date</TableHead>
              <TableHead className="text-right">Days Since Release</TableHead>
              <TableHead className="text-right">Views</TableHead>
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
                  {formatDate(new Date(episode.podcast.publishing_date), "PPP")}
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
