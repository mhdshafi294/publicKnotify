"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfiniteScrollDrafts from "./infinite-scroll-episodes";
import { useTranslations } from "next-intl";

const EpisodesPageContent = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const t = useTranslations("Index");

  return (
    <div className="flex-1">
      <div className="flex w-full justify-between items-center px-4 sm:px-6 md:px-8 py-3 border-b border-b-secondary">
        <h2>{t("episodes")}</h2>
        <Button variant="outline">{t("add-episode")}</Button>
      </div>
      <div className="w-full flex flex-col gap-4 px-4 sm:px-6 md:px-8 py-8">
        <h2 className="font-bold text-2xl">{t("episodes")}</h2>
        <DashboardCardContainer className="max-w-[600px]">
          <p className="text-sm leading-6 text-card-foreground/70">
            {t("episodes-page-description")}
          </p>
        </DashboardCardContainer>
      </div>
      <div className="px-4 sm:px-6 md:px-8 w-full">
        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="episodes"
              className="data-[state=active]:max-md:text-primary data-[state=active]:max-md:!bg-transparent data-[state=active]:!text-xl data-[state=active]:!font-normal transition-all relative data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:h-0.5 data-[state=active]:before:start-0 before:start-[100%] before:end-0 before:!z-[100000] before:transition-all before:duration-300  data-[state=active]:before:bg-primary"
            >
              {t("episodes")}
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="data-[state=active]:max-md:text-primary data-[state=active]:max-md:!bg-transparent data-[state=active]:!text-xl data-[state=active]:!font-normal transition-all relative data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:h-0.5 data-[state=active]:before:end-0 before:end-[100%] before:start-0 before:!z-50 before:transition-all before:duration-300  data-[state=active]:before:bg-primary"
            >
              {t("drafts")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="episodes">
            <InfiniteScrollDrafts is_published={1} />
          </TabsContent>
          <TabsContent value="drafts">
            <InfiniteScrollDrafts is_published={0} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EpisodesPageContent;
