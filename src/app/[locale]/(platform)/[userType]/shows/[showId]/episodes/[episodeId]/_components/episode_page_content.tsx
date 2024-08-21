"use client";

import { getSelfPodcastAction } from "@/app/actions/podcastActions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardCardContainer from "../../../../_components/dashboard-card-container";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const EpisodePageContent = ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch podcast draft data
  const {
    data: podcastResponse,
    isPending: isPodcastPending,
    isError: isPodcastError,
  } = useQuery({
    queryKey: ["podcast_draft", params.episodeId],
    queryFn: () =>
      getSelfPodcastAction({ id: params.episodeId!, type: "podcaster" }),
    enabled: !!params.episodeId && isMounted,
  });
  const t = useTranslations("Index");
  return (
    <div className="flex max-md:flex-col w-full flex-1 lg:min-h-[calc(100vh-72px)] relative h-full justify-between p-4 sm:p-6 md:p-8 gap-4">
      <DashboardCardContainer className="flex flex-col col-span-1 gap-6 h-full justify-center p-4 w-full md:w-1/3">
        <div className="w-full">
          {podcastResponse?.podcast?.background ? (
            <img
              src={podcastResponse?.podcast?.background}
              alt=""
              className="w-full max-h-[400px] object-cover"
            />
          ) : (
            <video
              src={podcastResponse?.podcast?.background}
              controls
              className="w-full max-h-[400px] object-cover"
            />
          )}
          <div className="flex items-center gap-4">
            <img
              className="size-12"
              src={podcastResponse?.podcast?.thumbnail}
              alt=""
            />
            <div>
              <p className="mt-4 capitalize">
                {podcastResponse?.podcast?.type}
              </p>
              <h3 className="text-lg font-bold mb-4">
                {podcastResponse?.podcast.name}
              </h3>
            </div>
          </div>
          {podcastResponse?.podcast?.podcast && (
            <div className="w-full">
              <audio
                className="w-full rounded-none"
                src={podcastResponse?.podcast?.podcast}
                controls
              />
            </div>
          )}
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <p>{t("Full Episode")}</p>
          <div>
            <h4 className="text-md font-bold">{t("Episode Summary")}</h4>
            <p className="opacity-70">{podcastResponse?.podcast?.summary}</p>
          </div>
          <div>
            <h4 className="text-md font-bold">{t("Episode Notes")}</h4>
            <p className="opacity-70">{podcastResponse?.podcast?.note}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <Separator className="mb-1" />
            <p className="font-light text-sm">{t("Contributors")}</p>
            <p className="opacity-70">
              {podcastResponse?.podcast?.contributors ? "yes" : "no"}
            </p>
          </div>
          <div className="w-1/2">
            <Separator className="mb-1" />
            <p className="font-light text-sm">{t("Tags")}</p>
            <p className="opacity-70">
              {podcastResponse?.podcast?.tags ? t("yes") : t("no")}
            </p>
          </div>
        </div>
      </DashboardCardContainer>
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <DashboardCardContainer className="p-4 flex flex-col gap-8">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">{t("Publishing")}</h1>
            <p className="font-semibold">
              {t("Order")} : {podcastResponse?.podcast?.order}
            </p>
          </div>
          <div className="flex gap-4 flex-col">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <p>{t("Main Feed")}</p>
                {podcastResponse?.podcast?.is_published ? (
                  <div className="border border-greeny p-1">
                    <p className="text-xs flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-greeny"></span>{" "}
                      {t("published")}
                    </p>
                  </div>
                ) : (
                  <div className="border border-destructive p-1">
                    <p className="text-xs flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-destructive"></span>{" "}
                      {t("unpublished")}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <p>
                  {podcastResponse?.podcast?.publishing_date}{" "}
                  {podcastResponse?.podcast?.publishing_time}
                </p>
              </div>
            </div>
          </div>
        </DashboardCardContainer>
        <DashboardCardContainer className="p-4 flex flex-col gap-8">
          <h1 className="text-xl font-bold">{t("categories")}</h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {podcastResponse?.podcast?.categories.map((category, index) => (
              <div key={index} className="flex gap-4 items-center w-full">
                <img
                  src={category.image}
                  className="size-10 rounded-full"
                  alt={category.name}
                />
                <p className="opacity-70">{category.name}</p>
              </div>
            ))}
          </div>
        </DashboardCardContainer>
        <DashboardCardContainer className="p-4 flex flex-col gap-8">
          <h1 className="text-xl font-bold">{t("hashtags")}</h1>
          <div className="flex items-center gap-4">
            {podcastResponse?.podcast?.hashTags.map((hashtag, index) => (
              <div key={index} className="border p-1 border-primary">
                <p className="opacity-70">{hashtag.name}</p>
              </div>
            ))}
          </div>
        </DashboardCardContainer>
        <DashboardCardContainer className="p-4 flex flex-col gap-8">
          <h1 className="text-xl font-bold">{t("episode")}</h1>
          <div className="flex gap-4 justify-between items-start w-full">
            <p className="text-light text-sm">
              {podcastResponse?.podcast?.episode_type}
            </p>
            <Link className={buttonVariants({ variant: "outline" })} href={"/"}>
              {t("Alternate Episode")}
            </Link>
          </div>
        </DashboardCardContainer>
      </div>
    </div>
  );
};

export default EpisodePageContent;
