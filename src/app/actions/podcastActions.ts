"use server";

import getMyFavoriteCategoriesList from "@/services/podcast/get-my-favorite-categoris-list";
import getTrending from "@/services/podcast/get-trending";

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
  const getMyFavoriteCategoriesListResponse = await getMyFavoriteCategoriesList(
    {
      type,
    }
  );
  return getMyFavoriteCategoriesListResponse;
};
