"use server";

import addPodcastToFavorite from "@/services/podcaster/add-to-favorite";
import getPodcaster from "@/services/podcaster/get-podcaster";
import getPodcasters from "@/services/podcaster/get-podcasters";
import removeFromFavorite from "@/services/podcaster/remove-from-favorite";

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

export const getPodcasterAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const getPodcasterResponse = await getPodcaster({
    id,
    type,
  });
  return getPodcasterResponse;
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

export const addToFavoriteAction = async ({
  categories,
  id,
  type,
}: {
  categories: string[];
  id: string;
  type: string;
}) => {
  return await addPodcastToFavorite({ categories, podcasterId: id, type });
};

export const removeFromFavoriteAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await removeFromFavorite({ podcasterId: id, type });
};
