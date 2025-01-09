import { getServerSession } from "next-auth";
import React from "react";

import { getMyFavoritePodcastsAction } from "@/app/actions/podcastActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import InfiniteScrollFavoritesPodcasts from "./infinite-scroll-favorites-podcasts";

interface FavoritePodcastsTapPageProps {
  tab: string;
  favoriteCategoryId?: string;
}

/**
 * FavoritePodcastsTapPage Component
 *
 * This component fetches and displays the user's favorite podcasts based on the selected tab and category.
 * It uses server-side session data to determine the user's type and fetch the relevant podcasts.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.tab - The current tab indicating the type of favorites.
 * @param {string} [props.favoriteCategoryId] - Optional ID of the favorite category.
 *
 * @returns {JSX.Element} The rendered component containing the list of favorite podcasts.
 */
const FavoritePodcastsTapPage: React.FC<FavoritePodcastsTapPageProps> = async ({
  tab,
  favoriteCategoryId,
}) => {
  // Retrieve the session using the auth options
  const session = await getServerSession(authOptions);

  // Set the category_id to undefined if favoriteCategoryId is empty
  const category_id =
    favoriteCategoryId === "" ? undefined : favoriteCategoryId;

  // Fetch the user's favorite podcasts based on the session and category ID
  const favoritePodcastsResponse = await getMyFavoritePodcastsAction({
    type: session?.user?.type!,
    category_id,
  });

  const favoritePodcastsData = favoritePodcastsResponse.podcasts;

  return (
    <div className="w-full">
      {/* Render the InfiniteScrollFavoritesPodcasts component with the fetched data */}
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
