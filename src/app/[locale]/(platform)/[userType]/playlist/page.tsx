import { getServerSession } from "next-auth";

import { Link, redirect } from "@/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getTranslations } from "next-intl/server";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import Search from "@/components/search";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  getPlayListsAction,
  getTrendingAction,
} from "@/app/actions/podcastActions";
import InfiniteScrollPodcastsCarousel from "@/components/infinite-scroll-podcasts-carousel";
import InfiniteScrollPodcasts from "@/components/infinite-scroll-podcasts";
import InfiniteScrollPlaylist from "@/components/infinite-scroll-playlist";

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

  // console.log(search);

  const firstPageTrendingResponse = await getPlayListsAction({
    type: session?.user?.type!,
    search,
  });
  // console.log(podcastsResponse);
  // console.log(podcastsData);

  return (
    <>
      <main className="py-10">
        <MaxWidthContainer className="flex flex-col gap-7">
          <div className="w-full flex justify-between items-center gap-2">
            <h2 className="lg:text-5xl font-bold">Trending</h2>
            <Search searchText={search} searchFor="playlist" />
          </div>
          <InfiniteScrollPlaylist
            initialData={firstPageTrendingResponse.playlists}
            search={search}
            type={session?.user?.type!}
          />
        </MaxWidthContainer>
      </main>
    </>
  );
}
