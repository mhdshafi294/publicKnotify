// Global imports
import { getServerSession } from "next-auth"; // External dependency for session management
import { getTranslations } from "next-intl/server"; // External dependency for internationalization

// Local imports
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // Internal authentication options
import MaxWidthContainer from "@/components/ui/MaxWidthContainer"; // Internal component import
import Search from "@/components/search"; // Internal component import
import { getTrendingAction } from "@/app/actions/podcastActions"; // Internal action import
import InfiniteScrollPodcasts from "@/components/infinite-scroll-podcasts"; // Internal component import

/**
 * PodcastsPage Component
 *
 * This component renders a page with trending podcasts and a search bar.
 * It fetches the initial list of trending podcasts based on the search query
 * and user type. The `InfiniteScrollPodcasts` component handles the display
 * of podcasts with infinite scrolling.
 *
 * @param {Object} searchParams - Query parameters from the URL.
 * @param {string | string[] | undefined} searchParams.search - The search query for filtering podcasts.
 * @returns {JSX.Element} The rendered page with a list of trending podcasts and a search bar.
 */
export default async function PodcastsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract search query from searchParams
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  // Fetch session and translations
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Index");

  // Fetch initial trending podcasts data
  const firstPageTrendingResponse = await getTrendingAction({
    type: session?.user?.type!,
    search,
  });

  return (
    <>
      <main className="py-10 flex-1">
        <MaxWidthContainer className="flex flex-col gap-7">
          <div className="w-full flex justify-between items-center gap-2">
            <h2 className="lg:text-5xl font-bold">{t("trending")}</h2>
            <Search searchText={search} searchFor="podcast" />
          </div>
          <InfiniteScrollPodcasts
            initialData={firstPageTrendingResponse.podcasts}
            search={search}
            type={session?.user?.type!}
          />
        </MaxWidthContainer>
      </main>
    </>
  );
}
