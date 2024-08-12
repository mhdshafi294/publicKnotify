import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

/**
 * StatisticsContainer Component
 *
 * This component renders the statistics section for the user's podcasts. It includes
 * a sidebar with a list of the user's podcasts and a main section for displaying statistics.
 *
 * @param {React.ReactNode} children - The content to be displayed in the statistics section.
 * @param {Array<{ id: number, name: string }>} selfPodcastsList - List of the user's podcasts.
 * @returns JSX.Element
 */
const StatisticsContainer = ({
  children,
  selfPodcastsList,
}: {
  children: React.ReactNode;
  selfPodcastsList: {
    id: number;
    name: string;
  }[];
}) => {
  const t = useTranslations("Index");

  return (
    <main className="flex lg:min-h-[calc(100vh-72px)] flex-col items-center justify-between py-12">
      <MaxWidthContainer className="w-full lg:min-h-[calc(100vh-168px)] flex flex-col gap-2 lg:flex-row lg:gap-10">
        {/* Sidebar with podcast list */}
        <div className="w-full lg:w-3/12 rounded-lg lg:bg-card lg:py-14 px-4 flex flex-col items-center lg:gap-12 gap-6">
          <div className="w-full flex justify-center items-center gap-3">
            <Image
              src="/statistics.png"
              alt="Statistics"
              width={800}
              height={124}
              className="size-full z-10 rounded-lg object-contain"
            />
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-10">
            <div className="size-full flex flex-col justify-start items-start">
              <h2 className="text-2xl font-bold capitalize">
                {t("podcastNames")}
              </h2>

              {/* List of podcasts or a message if none are published */}
              {selfPodcastsList.length > 0 ? (
                selfPodcastsList.map((podcast) => (
                  <Link
                    href={{ search: `?podcastId=${podcast.id}` }}
                    scroll={false}
                    key={podcast.id}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-lg px-0 capitalize"
                    )}
                  >
                    {podcast.name}
                  </Link>
                ))
              ) : (
                <p className="text-lg italic opacity-50">
                  {t("NoPublishedPodcastsYet")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main statistics section */}
        <div className="w-full relative lg:w-9/12">
          <div className="w-full p-5 flex justify-end sticky bg-secondary px-4 rounded-lg top-20 min-h-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 [&_>_div]:p-8 [&_>_div]:rounded-md">
              {children}
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </main>
  );
};

export default StatisticsContainer;
