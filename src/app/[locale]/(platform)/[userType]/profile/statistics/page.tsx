// External dependencies
import { getTranslations } from "next-intl/server"; // Next.js i18n import
import Image from "next/image"; // Next.js image component import
import { cache } from "react"; // React cache utility import

// Internal dependencies
import { getStatisticsAction } from "@/app/actions/statisticsActions"; // Internal statistics action import
import { buttonVariants } from "@/components/ui/button"; // Internal button variants import
import MaxWidthContainer from "@/components/ui/MaxWidthContainer"; // Internal UI component import
import { Progress } from "@/components/ui/progress"; // Internal progress component import
import axiosInstance from "@/lib/axios.config"; // Internal axios configuration import
import { cn } from "@/lib/utils"; // Internal utility function import
import { Link } from "@/navigation"; // Internal navigation import
import { ApiResponse } from "@/types"; // Internal API response type import

// Function to fetch podcasts, cached to optimize performance
const getPodcasts = cache(async (type: string) => {
  const { data } = await axiosInstance.get<
    ApiResponse & { podcasts: { id: number; name: string }[] }
  >(`/${type}/podcast/get-all`);
  return data.podcasts;
});

// Revalidation time for static generation
export const revalidate = 10 * 60;

const socialMedia = [
  { icon: "/icons/ivoox.svg", name: "ivoox" },
  { icon: "/icons/Youtube.svg", name: "Youtube" },
  { icon: "/icons/Apple-Podcasts.svg", name: "Apple Podcasts" },
  { icon: "/icons/Google-Podcasts.svg", name: "Google Podcasts" },
  { icon: "/icons/Spotify.svg", name: "Spotify" },
  { icon: "/icons/Instagram.svg", name: "Instagram" },
];

/**
 * StatisticsPage Component
 *
 * This component displays statistics for podcasts, including a list of podcasts, various statistics,
 * and a visual representation of data. It fetches podcast data and statistics based on user type and
 * selected podcast, and displays the data in a structured layout.
 *
 * @param {Object} params - URL parameters.
 * @param {string} params.userType - The type of the user (e.g., podcaster, listener).
 * @param {Object} searchParams - Query parameters for filtering the data.
 * @returns {JSX.Element} The rendered component showing podcast statistics and information.
 */
const StatisticsPage = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // Fetch list of podcasts
  const selfPodcastsList = await getPodcasts(params.userType);
  // Fetch translations
  const t = await getTranslations("Index");

  // Determine the selected podcast ID
  const podcastId = searchParams.podcastId
    ? (searchParams.podcastId as string)
    : selfPodcastsList[0]?.id.toString();

  // Fetch statistics data
  const statisticsData = await getStatisticsAction({
    type: params.userType,
    podcat_id: podcastId,
  });

  return (
    <main className="flex flex-1 lg:min-h-[calc(100vh-72px)] flex-col items-center justify-between py-12">
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
              {selfPodcastsList.map((podcast) => (
                <Link
                  href={{ search: `?podcastId=${podcast?.id}` }}
                  scroll={false}
                  key={podcast?.id}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "text-lg px-0 capitalize"
                  )}
                >
                  {podcast.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics section */}
        <div className="w-full relative lg:w-9/12">
          <div className="w-full p-5 flex justify-end sticky bg-secondary px-4 rounded-lg top-20 min-h-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 [&_>_div]:p-8 [&_>_div]:rounded-md">
              {/* Time and average listens */}
              <div className="bg-greeny flex justify-center flex-col items-center text-primary">
                <h3 className="text-5xl font-bold">9 min</h3>
                <p className="text-2xl capitalize">{t("totalTime")}</p>
              </div>
              <div className="bg-primary flex justify-center flex-col items-center">
                <h3 className="text-5xl font-bold">
                  {statisticsData.average_listens}
                </h3>
                <p className="text-2xl capitalize">{t("averageListens")}</p>
              </div>
              {/* Revenue statistics */}
              <div className="bg-[#1A1A1AA6] flex justify-start flex-col items-center gap-2 !p-4">
                <div className="w-full flex justify-start items-center gap-2">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG paths for icon */}
                  </svg>
                  <h3 className="text-2xl capitalize font-bold">
                    {t("revenueStatistics")}
                  </h3>
                </div>
                <div className="w-full bg-black/20 border border-border/5 p-2 rounded-md">
                  {statisticsData.average_listens}
                </div>
              </div>
              {/* Social media statistics */}
              <div className="bg-[#1A1A1AA6] flex justify-start flex-col items-center gap-2 !p-4">
                <div className="w-full flex justify-start items-center gap-2">
                  <h3 className="text-xl font-bold md:max-w-[75%] capitalize">
                    {t("averageListens")}
                  </h3>
                </div>
                <div className="space-y-4 mt-2 w-full">
                  {socialMedia.map((media, index) => (
                    <div className="space-y-2" key={index}>
                      <div className="flex justify-between items-center text-greeny">
                        <div className="flex justify-start items-center text-base gap-2">
                          <Image
                            src={media.icon}
                            alt={media.name}
                            width={24}
                            height={24}
                          />
                          <span className="text-foreground">{media.name}</span>
                        </div>
                        <span>{statisticsData.youtube_video}</span>
                      </div>
                      <Progress
                        value={statisticsData.average_listens}
                        className="h-1.5 overflow-hidden bg-white [&_>_div]:bg-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthContainer>
    </main>
  );
};

export default StatisticsPage;
