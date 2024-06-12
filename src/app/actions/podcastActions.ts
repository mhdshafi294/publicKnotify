"use server";

import AddPodcastToFavorite from "@/services/podcast/add-to-favorite";
import getMyPodcastFavoriteCategoriesList from "@/services/podcast/get-my-favorite-categoris-list";
import getPodcastDetails from "@/services/podcast/get-podcast-details";
import getTrending from "@/services/podcast/get-trending";
import RemoveFromFavorite from "@/services/podcast/remove-from-favorite";

export const getTrendingAction = async ({
  count = "12",
  search,
  category_id,
  page,
  type,
}: {
  count: string;
  search?: string;
  category_id?: string;
  page: string;
  type: string;
}) => {
  const getTrendingResponse = await getTrending({
    count,
    search,
    category_id,
    page,
    type,
  });
  return getTrendingResponse;
};

export const getMyFavoriteCategoriesListAction = async ({
  type,
}: {
  type: string;
}) => {
  const getMyFavoriteCategoriesListResponse =
    await getMyPodcastFavoriteCategoriesList({
      type,
    });
  return getMyFavoriteCategoriesListResponse;
};

export const getPodcastDataAction = async ({
  id,
  type,
}: {
  type: string;
  id: number;
}) => {
  return await getPodcastDetails(type, id);
};

export const AddToFavoriteAction = async ({
  categories,
  id,
  type,
}: {
  categories: string[];
  id: string;
  type: string;
}) => {
  return await AddPodcastToFavorite({ categories, podcastId: id, type });
};

export const RemoveFromFavoriteAction = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  return await RemoveFromFavorite({ podcastId: id, type });
};
