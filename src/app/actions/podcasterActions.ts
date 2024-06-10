"use server";

import AddPodcastToFavorite from "@/services/podcaster/add-to-favorite";
import getMyPodcasterFavoriteCategoriesList from "@/services/podcaster/get-my-favorite-categoris-list";
import getPodcasters from "@/services/podcaster/get-podcasters";
import RemoveFromFavorite from "@/services/podcaster/remove-from-favorite";

export const getPodcastersAction = async ({
  count = "12",
  search,
  page,
  type,
}: {
  count: string;
  search?: string;
  page: string;
  type: string;
}) => {
  const getPodcastersResponse = await getPodcasters({
    count,
    search,
    page,
    type,
  });
  return getPodcastersResponse;
};

// export const getMyFavoriteCategoriesListAction = async ({
//   type,
// }: {
//   type: string;
// }) => {
//   const getMyFavoriteCategoriesListResponse =
//     await getMyPodcasterFavoriteCategoriesList({
//       type,
//     });
//   return getMyFavoriteCategoriesListResponse;
// };

export const AddToFavoriteAction = async ({
  categories,
  podcasterId,
  type,
}: {
  categories: string[];
  podcasterId: string;
  type: string;
}) => {
  return await AddPodcastToFavorite({ categories, podcasterId, type });
};

export const RemoveFromFavoriteAction = async ({
  podcasterId,
  type,
}: {
  podcasterId: string;
  type: string;
}) => {
  return await RemoveFromFavorite({ podcasterId, type });
};
