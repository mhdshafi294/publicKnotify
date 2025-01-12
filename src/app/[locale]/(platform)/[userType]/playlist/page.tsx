import { getServerSession } from "next-auth"; // External dependency for session management

import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"; // Internal authentication options
import { getTranslations } from "next-intl/server"; // External dependency for translations

import { getPlayListsAction } from "@/app/actions/podcastActions"; // Internal function for fetching playlists
import InfiniteScrollPlaylist from "@/components/infinite-scroll-playlist"; // Internal component for infinite scroll
import Search from "@/components/search"; // Internal component for search functionality
import MaxWidthContainer from "@/components/ui/MaxWidthContainer"; // Internal component for container styling

/**
 * PodcastsPage Component
 *
 * This component displays a list of trending playlists with infinite scrolling functionality.
 * It includes a search component to filter playlists based on user input.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.searchParams - The query parameters from the URL.
 * @param {string | string[] | undefined} props.searchParams.search - The search query for playlists.
 * @returns {JSX.Element} The rendered component with a list of trending playlists and a search bar.
 */
export default async function PodcastsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const session = await getServerSession(authOptions);

  // if (session?.user?.type === "podcaster") {
  //   redirect(`/podcaster`);
  // }

  const t = await getTranslations("Index");

  const firstPageTrendingResponse = await getPlayListsAction({
    type: session?.user?.type!,
    search,
  });

  return (
    <main className="py-10 flex-1">
      <MaxWidthContainer className="flex flex-col gap-7">
        <div className="w-full flex justify-between items-center gap-2">
          <h2 className="lg:text-5xl font-bold">{t("trending")}</h2>
          <Search searchText={search} searchFor="playlist" />
        </div>
        <InfiniteScrollPlaylist
          initialData={firstPageTrendingResponse.playlists}
          search={search}
          type={session?.user?.type!}
        />
      </MaxWidthContainer>
    </main>
  );
}
