import { getServerSession } from "next-auth";
import React from "react";

import { getMyFavoritePodcastersAction } from "@/app/actions/podcasterActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import InfiniteScrollFavoritesPodcasters from "./infinite-scroll-favorites-podcaters";

interface FavoritePodcastersTapPageProps {
  tab: string;
  favoriteCategoryId?: string;
}

/**
 * FavoritePodcastersTapPage Component
 *
 * This component fetches and displays the user's favorite podcasters based on the selected tab and category.
 * It uses server-side session data to determine the user's type and fetch the relevant podcasters.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.tab - The current tab indicating the type of favorites.
 * @param {string} [props.favoriteCategoryId] - Optional ID of the favorite category.
 *
 * @returns {JSX.Element} The rendered component containing the list of favorite podcasters.
 */
const FavoritePodcastersTapPage: React.FC<
  FavoritePodcastersTapPageProps
> = async ({ tab, favoriteCategoryId }) => {
  // Retrieve the session using the auth options
  const session = await getServerSession(authOptions);

  // Set the category_id to undefined if favoriteCategoryId is empty
  const category_id =
    favoriteCategoryId === "" ? undefined : favoriteCategoryId;

  // Fetch the user's favorite podcasters based on the session and category ID
  const favoritePodcastersResponse = await getMyFavoritePodcastersAction({
    type: session?.user?.type!,
    category_id,
  });

  const favoritePodcastersData = favoritePodcastersResponse.podcasters;

  return (
    <div className="w-full">
      {/* Render the InfiniteScrollFavoritesPodcasters component with the fetched data */}
      <InfiniteScrollFavoritesPodcasters
        initialData={favoritePodcastersData}
        tab={tab}
        favoriteCategoryId={category_id}
        type={session?.user?.type!}
      />
    </div>
  );
};

export default FavoritePodcastersTapPage;
