import { getMyFavoritePodcastsAction } from "@/app/actions/podcastActions";
import { getMyFavoritePodcastersAction } from "@/app/actions/podcasterActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Podcast, PodcastsResponse } from "@/types/podcast";
import { Podcaster, PodcastersResponse } from "@/types/podcaster";
import { getServerSession } from "next-auth";
import React from "react";
import InfiniteScrollFavoritesPodcasts from "./infinite-scroll-favorites-podcasts";
import InfiniteScrollFavoritesPodcasters from "./infinite-scroll-favorites-podcaters";

interface FavoritePodcastsTapPageProps {
  tab: string;
  favoriteCategoryId?: string;
}

const FavoritePodcastsTapPage: React.FC<FavoritePodcastsTapPageProps> = async ({
  tab,
  favoriteCategoryId,
}) => {
  const session = await getServerSession(authOptions);

  let category_id = favoriteCategoryId === "" ? undefined : favoriteCategoryId;

  const favoritePodcastsResponse = await getMyFavoritePodcastsAction({
    type: session?.user?.type!,
    category_id,
  });
  const favoritePodcastsData = favoritePodcastsResponse.podcasts;

  return (
    <div className="w-full">
      <InfiniteScrollFavoritesPodcasts
        initialData={favoritePodcastsData}
        tab={tab}
        favoriteCategoryId={category_id}
        type={session?.user?.type!}
      />
    </div>
  );
};

export default FavoritePodcastsTapPage;
