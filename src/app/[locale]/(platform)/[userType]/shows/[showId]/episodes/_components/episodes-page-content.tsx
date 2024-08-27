"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import DashboardCardContainer from "../../../_components/dashboard-card-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfiniteScrollDrafts from "./infinite-scroll-episodes";

/**
 * The EpisodesPageContent component renders the main content of the episodes page, including tabs
 * for navigating between published episodes and drafts.
 *
 * It includes a header, a brief description, and a tabbed interface to switch between different
 * categories of episodes.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters containing user and show information.
 * @param {Object} props.searchParams - Query string parameters for filtering or additional actions.
 *
 * @returns {JSX.Element} The rendered EpisodesPageContent component.
 */
const EpisodesPageContent = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element => {
  const t = useTranslations("Index");

  return (
    <div className="flex-1">
      {/* Header with page title and button */}
      <div className="flex w-full justify-between items-center px-4 sm:px-6 md:px-8 py-3 border-b border-b-secondary">
        <h2>{t("episodes")}</h2>
        <Button variant="outline">{t("add-episode")}</Button>
      </div>

      {/* Description section */}
      <div className="w-full flex flex-col gap-4 px-4 sm:px-6 md:px-8 py-8">
        <h2 className="font-bold text-2xl">{t("episodes")}</h2>
        <DashboardCardContainer className="max-w-[600px]">
          <p className="text-sm leading-6 text-card-foreground/70">
            {t("episodes-page-description")}
          </p>
        </DashboardCardContainer>
      </div>

      {/* Tabs for navigating between episodes and drafts */}
      <div className="px-4 sm:px-6 md:px-8 w-full">
        <Tabs defaultValue="episodes" className="w-full">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="episodes"
              className="data-[state=active]:max-md:text-primary data-[state=active]:max-md:!bg-transparent data-[state=active]:!text-xl data-[state=active]:!font-normal transition-all relative data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:h-0.5 data-[state=active]:before:start-0 before:start-[100%] before:end-0 before:!z-[100000] before:transition-all before:duration-300 data-[state=active]:before:bg-primary"
            >
              {t("episodes")}
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="data-[state=active]:max-md:text-primary data-[state=active]:max-md:!bg-transparent data-[state=active]:!text-xl data-[state=active]:!font-normal transition-all relative data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:h-0.5 data-[state=active]:before:end-0 before:end-[100%] before:start-0 before:!z-50 before:transition-all before:duration-300 data-[state=active]:before:bg-primary"
            >
              {t("drafts")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="episodes">
            <InfiniteScrollDrafts is_published={1} showId={params.showId} />
          </TabsContent>
          <TabsContent value="drafts">
            <InfiniteScrollDrafts is_published={0} showId={params.showId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EpisodesPageContent;
