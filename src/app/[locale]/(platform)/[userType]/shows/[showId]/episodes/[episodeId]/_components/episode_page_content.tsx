import React from "react";
import Image from "next/image";
import { format } from "date-fns";

import { getSelfPodcastAction } from "@/app/actions/podcastActions";
import { getTranslations } from "next-intl/server";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DashboardCardContainer from "../../../../_components/dashboard-card-container";
import { Link } from "@/navigation";
import { getDistanceToNow } from "@/lib/utils";

/**
 * The EpisodePageContent component renders detailed information about a specific podcast episode.
 *
 * It includes episode metadata, publishing information, categories, hashtags, and more.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters containing user, show, and episode information.
 * @param {Object} props.searchParams - Query string parameters for filtering or additional actions.
 *
 * @returns {Promise<JSX.Element>} The rendered EpisodePageContent component.
 */
const EpisodePageContent = async ({
  params,
  searchParams,
}: {
  params: { userType: string; showId: string; episodeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element> => {
  const podcastResponse = await getSelfPodcastAction({
    id: params.episodeId!,
    type: "podcaster",
  });

  const t = await getTranslations("Index");

  return (
    <div className="flex max-md:flex-col w-full flex-1 lg:min-h-[calc(100vh-72px)] relative h-full justify-between p-4 sm:p-6 md:p-8 gap-4">
      {/* Left Column: Podcast Details */}
      <DashboardCardContainer className="flex flex-col col-span-1 gap-6 h-full justify-center p-4 w-full md:w-1/3">
        <div className="w-full">
          {podcastResponse?.podcast?.background ? (
            <div className="w-full h-[200px] relative">
              <Image
                src={podcastResponse?.podcast?.background}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <video
              src={podcastResponse?.podcast?.background}
              controls
              className="w-full max-h-[400px] object-cover"
            />
          )}
          <div className="flex items-center gap-4">
            <Image
              className="size-12 object-cover"
              width={48}
              height={48}
              src={podcastResponse?.podcast?.thumbnail as string}
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
                className="w-full bg-transparent opacity-75"
                src={podcastResponse?.podcast?.podcast}
                controls
              />
            </div>
          )}
        </div>
        <Separator className="bg-border-secondary border-border-secondary " />
        <div className="flex flex-col gap-4">
          <p>{t("Full Episode")}</p>
          <div>
            <h4 className="text-md font-bold">{t("Episode Summary")}</h4>
            <p className="opacity-70">{podcastResponse?.podcast?.summary}</p>
          </div>
          <div>
            <h4 className="text-md font-bold">{t("Episode Notes")}</h4>
            {podcastResponse?.podcast?.note ? (
              <article
                dangerouslySetInnerHTML={{
                  __html: podcastResponse?.podcast?.note,
                }}
              />
            ) : null}
          </div>
        </div>
        <Separator className="bg-border-secondary mb-1" />
        <div className="flex gap-4">
          <div className="w-fulle">
            <p className="opacity-60 font-bold text-sm">{t("Contributors")}</p>
            <p>
              {podcastResponse?.podcast?.contributors instanceof Array
                ? podcastResponse?.podcast?.contributors
                    .map((contributor) => contributor)
                    .join(", ")
                : "none"}
            </p>
          </div>
        </div>
      </DashboardCardContainer>

      {/* Right Column: Episode Metadata and Additional Info */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <DashboardCardContainer className="p-4 flex flex-col gap-8">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">{t("Publishing")}</h1>
            <p className="font-semibold">
              {t("Order")}: {podcastResponse?.podcast?.order}
            </p>
          </div>
          <div className="flex gap-4 flex-col">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <p className="opacity-70">{t("Main Feed")}</p>
                {podcastResponse?.podcast?.is_published ? (
                  <div className="border-spacing-2 border-2 border-greeny/20 rounded-3xl py-1 px-2">
                    <p className="text-xs flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-greeny"></span>{" "}
                      {t("published")}
                    </p>
                  </div>
                ) : (
                  <div className="border-spacing-2 border-2 border-destructive/20 rounded-3xl py-1 px-2">
                    <p className="text-xs flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-destructive"></span>{" "}
                      {t("unpublished")}
                    </p>
                  </div>
                )}
              </div>
              {podcastResponse?.podcast?.publishing_date &&
              podcastResponse?.podcast?.publishing_time ? (
                <div className="flex items-center gap-2">
                  <p className="opacity-70 dark:opacity-50 text-xs">
                    {getDistanceToNow(
                      podcastResponse?.podcast?.publishing_date!,
                      podcastResponse?.podcast?.publishing_time!
                    )}
                    <span className="mx-3 opacity-70 ">at</span>
                    <span className="opacity-70 text-sm">
                      {format(
                        new Date(
                          `${podcastResponse?.podcast
                            ?.publishing_date!} ${podcastResponse?.podcast
                            ?.publishing_time!}`
                        ),
                        "MMM do, yyyy HH:mm bbb"
                      )}
                    </span>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </DashboardCardContainer>

        <DashboardCardContainer className="p-4 flex flex-col gap-8">
          <h1 className="text-xl font-bold">{t("categories")}</h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {podcastResponse?.podcast?.categories.map((category) => (
              <Link
                href={`podcaster/category/${category.id}`}
                className="bg-background hover:bg-background/60 flex justify-start items-center border rounded-xl gap-2 px-2.5 py-2 w-fit"
                key={category.id}
              >
                <div className="size-4 relative">
                  <Image
                    fill
                    className="rounded object-contain"
                    src={
                      category.image ? category.image : "/podcast-filler.webp"
                    }
                    alt={category.name}
                  />
                </div>
                <div>
                  <p className="text-sm font-bold capitalize">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </DashboardCardContainer>

        <DashboardCardContainer className="p-4 flex flex-col gap-8">
          <h1 className="text-xl font-bold">{t("hashtags")}</h1>
          <div className="flex items-center gap-4">
            {podcastResponse?.podcast?.hashTags.map((hashtag) => (
              <div
                key={hashtag.id}
                className="shrink-0 text-sm bg-greeny_lighter/30 text-greeny px-3 py-1 font-semibold rounded-lg cursor-default"
              >
                #{hashtag.name}
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
