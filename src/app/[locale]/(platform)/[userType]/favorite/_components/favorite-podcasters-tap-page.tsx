import { getMyFavoritePodcastsAction } from "@/app/actions/podcastActions";
import { getMyFavoritePodcastersAction } from "@/app/actions/podcasterActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { Podcaster, PodcastersResponse } from "@/types/podcaster";
import { getServerSession } from "next-auth";
import React from "react";
import InfiniteScrollFavoritesPodcasts from "./infinite-scroll-favorites-podcasts";
import InfiniteScrollFavoritesPodcasters from "./infinite-scroll-favorites-podcaters";

interface FavoritePodcastersTapPageProps {
  tab: string;
  favoriteCategoryId?: string;
}

const FavoritePodcastersTapPage: React.FC<
  FavoritePodcastersTapPageProps
> = async ({ tab, favoriteCategoryId }) => {
  const session = await getServerSession(authOptions);

  let category_id = favoriteCategoryId === "" ? undefined : favoriteCategoryId;

  const favoritePodcastersResponse = await getMyFavoritePodcastersAction({
    type: session?.user?.type!,
    category_id,
  });
  const favoritePodcastersData = favoritePodcastersResponse.podcasters;

  return (
    <div className="w-full">
      {
        <InfiniteScrollFavoritesPodcasters
          initialData={favoritePodcastersData}
          tab={tab}
          favoriteCategoryId={category_id}
          type={session?.user?.type!}
        />
      }
    </div>
  );
};

export default FavoritePodcastersTapPage;
