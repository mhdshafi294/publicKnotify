"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import React from "react";
import DashboardCardContainer from "../../../_components/dashboard-card-container";

type TopEpisodesTableProps = {
  params: { userType: string; showId: string };
  top_episodes: { id: number; name: string; views_count: number }[];
};

const TopEpisodesTable: React.FC<TopEpisodesTableProps> = ({
  params,
  top_episodes,
}) => {
  const t = useTranslations("Index");

  return (
    <DashboardCardContainer className="flex-1 h-full flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase opacity-70">
            {t("all-times")}
          </h2>
          <p className="font-bold text-3xl">{t("top-episodes")}</p>
        </div>
      </div>
      {/* Table Section */}
      <ScrollArea className="w-full h-96 lg:h-48 2xl:h-96 flex-1">
        <Table className="flex-1 shrink-0 grow w-full text-lg">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead className="w-[100px] uppercase">
                {t("episode-number")}
              </TableHead>
              <TableHead>{t("title")}</TableHead>
              <TableHead className="text-right">{t("views")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {top_episodes.map((episode, index) => (
              <TableRow key={episode.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{episode.id}</TableCell>
                <TableCell className="capitalize">{episode.name}</TableCell>
                <TableCell className="text-right font-bold">
                  {episode.views_count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </DashboardCardContainer>
  );
};

export default TopEpisodesTable;
